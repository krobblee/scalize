import asyncio
from playwright.async_api import async_playwright
from PIL import Image
import io, os

BASE_URL = "https://5173-ixztx4hlkse2ep02dwnmm-b8533311.us2.manus.computer"

PAGES = [
    ("Home", "/"),
    ("Services", "/services"),
    ("How I Work", "/how-i-work"),
    ("Case Studies", "/case-studies"),
    ("Writing", "/writing"),
    ("About", "/about"),
    ("Contact", "/contact"),
]

OUTPUT_DIR = "/home/ubuntu/site_screenshots"
os.makedirs(OUTPUT_DIR, exist_ok=True)

async def capture():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={"width": 1280, "height": 900},
            device_scale_factor=1.5,
        )
        page = await context.new_page()

        image_paths = []
        for name, path in PAGES:
            url = BASE_URL + path
            screenshot_path = os.path.join(OUTPUT_DIR, f"{name.replace(' ', '_')}.png")
            if os.path.exists(screenshot_path):
                print(f"Skipping {name} (already captured)")
                image_paths.append(screenshot_path)
                continue
            print(f"Capturing {name} ({url})...")
            await page.goto(url, wait_until="domcontentloaded", timeout=30000)
            await page.wait_for_timeout(2500)  # let fonts/images settle

            # Full-page screenshot
            screenshot_path = os.path.join(OUTPUT_DIR, f"{name.replace(' ', '_')}.png")
            await page.screenshot(path=screenshot_path, full_page=True)
            print(f"  Saved: {screenshot_path}")
            image_paths.append(screenshot_path)

        await browser.close()
        return image_paths

def images_to_pdf(image_paths, output_path):
    """Convert list of PNG screenshots to a single PDF."""
    images = []
    for p in image_paths:
        img = Image.open(p).convert("RGB")
        images.append(img)

    if not images:
        print("No images to combine.")
        return

    first = images[0]
    rest = images[1:]
    first.save(
        output_path,
        format="PDF",
        save_all=True,
        append_images=rest,
        resolution=150,
    )
    print(f"\nPDF saved to: {output_path}")

if __name__ == "__main__":
    paths = asyncio.run(capture())
    images_to_pdf(paths, "/home/ubuntu/Scalize_Systems_Website_Preview.pdf")
