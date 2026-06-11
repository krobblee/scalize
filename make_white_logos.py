"""
Create white-text, transparent-background versions of the Scalize logos.
The originals have dark navy/blue text on a transparent background.
We replace all non-transparent pixels with white.
"""
from PIL import Image
import numpy as np
import os

assets_dir = '/home/ubuntu/scalize-systems/client/src/assets/images'

files_to_process = [
    ('logo-with-tag-transp.png', 'logo-with-tag-white-transp.png'),
    ('logo-no-tag-transp.png',   'logo-no-tag-white-transp.png'),
]

for src_name, dst_name in files_to_process:
    src_path = os.path.join(assets_dir, src_name)
    dst_path = os.path.join(assets_dir, dst_name)

    img = Image.open(src_path).convert('RGBA')
    data = np.array(img, dtype=np.uint8)

    # Where alpha > 10 (i.e. visible pixels), set RGB to white (255,255,255)
    mask = data[:, :, 3] > 10
    data[mask, 0] = 255
    data[mask, 1] = 255
    data[mask, 2] = 255

    result = Image.fromarray(data, 'RGBA')
    result.save(dst_path)
    print(f"Saved: {dst_name}  ({img.size[0]}x{img.size[1]})")

print("Done.")
