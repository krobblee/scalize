import asyncio
from playwright.async_api import async_playwright
from PIL import Image
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas as rl_canvas
import os

BASE_URL = "https://5173-ixztx4hlkse2ep02dwnmm-b8533311.us2.manus.computer"

PAGES = [
    ("home", "/"),
    ("services", "/services"),
    ("how-i-work", "/how-i-work"),
    ("case-studies", "/case-studies"),
    ("writing", "/writing"),
    ("about", "/about"),
    ("contact", "/contact"),
]

OUT_DIR = "/home/ubuntu/screenshots3"
os.makedirs(OUT_DIR, exist_ok=True)

DISABLE_ANIMATIONS_CSS = """
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

async def capture():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        for name, path in PAGES:
            out_path = f"{OUT_DIR}/{name}.png"
            print(f"Capturing {name}...")
            page = await browser.new_page(viewport={"width": 1280, "height": 900})
            
            # Inject CSS to disable all animations before navigation
            await page.add_style_tag(content=DISABLE_ANIMATIONS_CSS)
            
            await page.goto(BASE_URL + path, wait_until="domcontentloaded", timeout=30000)
            
            # Inject again after load to catch dynamically added elements
            await page.add_style_tag(content=DISABLE_ANIMATIONS_CSS)
            
            # Get full page height and scroll through it to trigger intersection observers
            total_height = await page.evaluate("document.body.scrollHeight")
            scroll_step = 600
            current = 0
            while current < total_height:
                await page.evaluate(f"window.scrollTo(0, {current})")
                await page.wait_for_timeout(150)
                current += scroll_step
            
            # Scroll back to top
            await page.evaluate("window.scrollTo(0, 0)")
            await page.wait_for_timeout(500)
            
            # Inject one more time to ensure all fade-in-up elements are visible
            await page.add_style_tag(content=DISABLE_ANIMATIONS_CSS)
            await page.wait_for_timeout(300)
            
            await page.screenshot(path=out_path, full_page=True)
            await page.close()
            print(f"  Saved: {out_path}")
        await browser.close()

asyncio.run(capture())

# Build PDF
pdf_path = "/home/ubuntu/Scalize_Systems_Website_Preview_v3.pdf"
c = rl_canvas.Canvas(pdf_path)

for name, _ in PAGES:
    img_path = f"{OUT_DIR}/{name}.png"
    if not os.path.exists(img_path):
        print(f"Missing: {img_path}")
        continue
    img = Image.open(img_path)
    img_w, img_h = img.size
    # Scale to 8.5in wide at 96dpi
    page_w = 8.5 * 96
    scale = page_w / img_w
    page_h = img_h * scale
    c.setPageSize((page_w, page_h))
    c.drawImage(img_path, 0, 0, width=page_w, height=page_h)
    c.showPage()
    print(f"Added {name} to PDF ({img_w}x{img_h})")

c.save()
print(f"PDF saved: {pdf_path}")
