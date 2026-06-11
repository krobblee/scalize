import asyncio
from playwright.async_api import async_playwright
from PIL import Image
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas as rl_canvas
import io, os

BASE_URL = "https://5173-ixztx4hlkse2ep02dwnmm-b8533311.us2.manus.computer"
PAGES = [
    ("home",         "/"),
    ("services",     "/services"),
    ("how-i-work",   "/how-i-work"),
    ("case-studies", "/case-studies"),
    ("writing",      "/writing"),
    ("about",        "/about"),
    ("contact",      "/contact"),
]

DISABLE_ANIM_CSS = """
*, *::before, *::after {
  animation-duration: 0s !important;
  animation-delay: 0s !important;
  transition-duration: 0s !important;
  transition-delay: 0s !important;
}
.fade-in-up {
  opacity: 1 !important;
  transform: none !important;
}
"""

OUT_DIR = "/home/ubuntu/screenshots4"
os.makedirs(OUT_DIR, exist_ok=True)

async def capture():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for name, path in PAGES:
            print(f"Capturing {name}...")
            page = await browser.new_page(viewport={"width": 1280, "height": 900})
            await page.goto(BASE_URL + path, wait_until="domcontentloaded", timeout=30000)
            # Inject CSS to disable all animations and make all fade-in elements visible
            await page.add_style_tag(content=DISABLE_ANIM_CSS)
            # Scroll to bottom to trigger any lazy content
            await page.evaluate("""
                async () => {
                    await new Promise(resolve => {
                        let total = 0;
                        const step = 400;
                        const interval = setInterval(() => {
                            window.scrollBy(0, step);
                            total += step;
                            if (total >= document.body.scrollHeight) {
                                clearInterval(interval);
                                window.scrollTo(0, 0);
                                resolve();
                            }
                        }, 80);
                    });
                }
            """)
            await page.wait_for_timeout(800)
            # Re-inject CSS after scroll (some elements may have been added)
            await page.add_style_tag(content=DISABLE_ANIM_CSS)
            await page.wait_for_timeout(400)
            screenshot = await page.screenshot(full_page=True)
            with open(f"{OUT_DIR}/{name}.png", "wb") as f:
                f.write(screenshot)
            await page.close()
        await browser.close()

    # Build PDF
    print("Building PDF...")
    pdf_path = "/home/ubuntu/Scalize_Systems_Website_Preview_v4.pdf"
    c = rl_canvas.Canvas(pdf_path)

    for name, _ in PAGES:
        img_path = f"{OUT_DIR}/{name}.png"
        img = Image.open(img_path)
        img_w, img_h = img.size
        # Scale to letter width (612 pts), maintain aspect ratio
        page_w = 612
        scale = page_w / img_w
        page_h = img_h * scale
        c.setPageSize((page_w, page_h))
        c.drawImage(img_path, 0, 0, width=page_w, height=page_h)
        c.showPage()

    c.save()
    print(f"PDF saved to {pdf_path}")

asyncio.run(capture())
