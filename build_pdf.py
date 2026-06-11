"""
Build a PDF from full-page screenshots using reportlab canvas directly.
Each screenshot becomes its own page sized to fit the image exactly.
"""
from reportlab.pdfgen import canvas
from PIL import Image
import os

PDF_OUT = "/home/ubuntu/Scalize_Systems_Website_Preview.pdf"
OUT_DIR = "/home/ubuntu/screenshots/scalize_pages"

page_order = ["Home", "Services", "How_I_Work", "Case_Studies", "Writing", "About", "Contact"]
shot_paths = [os.path.join(OUT_DIR, f"{name}.png") for name in page_order]

# Target width in points (8.5 inches = 612 pt)
TARGET_WIDTH_PT = 612.0

c = canvas.Canvas(PDF_OUT)

for path in shot_paths:
    img = Image.open(path)
    img_w, img_h = img.size
    # Scale proportionally to target width
    scale = TARGET_WIDTH_PT / img_w
    page_w = TARGET_WIDTH_PT
    page_h = img_h * scale

    c.setPageSize((page_w, page_h))
    c.drawImage(path, 0, 0, width=page_w, height=page_h)
    c.showPage()
    print(f"Added: {os.path.basename(path)}  ({img_w}x{img_h} → {page_w:.0f}x{page_h:.0f} pt)")

c.save()
size_mb = os.path.getsize(PDF_OUT) / 1024 / 1024
print(f"\nPDF saved: {PDF_OUT}  ({size_mb:.1f} MB, {len(shot_paths)} pages)")
