"""
Capture all 7 pages of the Scalize Systems site as full-page screenshots
and compile them into a single PDF.
"""
import asyncio
from playwright.async_api import async_playwright
from PIL import Image
import os

BASE_URL = "https://5173-ixztx4hlkse2ep02dwnmm-b8533311.us2.manus.computer"

PAGES = [
    ("Home",         "/"),
    ("Services",     "/services"),
    ("How I Work",   "/how-i-work"),
    ("Case Studies", "/case-studies"),
    ("Writing",      "/writing"),
    ("About",        "/about"),
    ("Contact",      "/contact"),
]

OUT_DIR = "/home/ubuntu/screenshots/scalize_pages"
PDF_OUT = "/home/ubuntu/Scalize_Systems_Website_Preview.pdf"

os.makedirs(OUT_DIR, exist_ok=True)

async def capture():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 900})

        shot_paths = []
        for name, path in PAGES:
            url = BASE_URL + path
            print(f"Capturing {name} ({url})...")
            await page.goto(url, wait_until="domcontentloaded", timeout=30000)
            await page.wait_for_timeout(2500)  # let fonts/images settle

            shot_path = os.path.join(OUT_DIR, f"{name.replace(' ', '_')}.png")
            await page.screenshot(path=shot_path, full_page=True)
            print(f"  Saved: {shot_path}")
            shot_paths.append(shot_path)

        await browser.close()
        return shot_paths

def build_pdf(shot_paths):
    from reportlab.lib.pagesizes import letter
    from reportlab.platypus import SimpleDocTemplate, Image as RLImage, Spacer
    from reportlab.lib.units import inch

    if not shot_paths:
        print("No images captured.")
        return

    doc = SimpleDocTemplate(
        PDF_OUT,
        pagesize=letter,
        leftMargin=0,
        rightMargin=0,
        topMargin=0,
        bottomMargin=0,
    )
    page_w, page_h = letter
    story = []

    for i, path in enumerate(shot_paths):
        img = Image.open(path)
        img_w, img_h = img.size
        # Scale to fit page width
        scale = page_w / img_w
        draw_w = page_w
        draw_h = img_h * scale
        rl_img = RLImage(path, width=draw_w, height=draw_h)
        story.append(rl_img)
        if i < len(shot_paths) - 1:
            story.append(Spacer(1, 0.01 * inch))

    doc.build(story)
    size_mb = os.path.getsize(PDF_OUT) / 1024 / 1024
    print(f"\nPDF saved: {PDF_OUT}  ({size_mb:.1f} MB, {len(shot_paths)} pages)")

if __name__ == "__main__":
    paths = asyncio.run(capture())
    build_pdf(paths)
