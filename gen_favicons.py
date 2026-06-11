from PIL import Image
import os

src = "/home/ubuntu/upload/ScalizeSystem_Logo_transparent.png"
public_dir = "/home/ubuntu/scalize-systems/client/public"

img = Image.open(src).convert("RGBA")

# favicon.ico — multi-size (16, 32, 48)
sizes = [(16, 16), (32, 32), (48, 48)]
icons = [img.resize(s, Image.LANCZOS) for s in sizes]
icons[0].save(
    os.path.join(public_dir, "favicon.ico"),
    format="ICO",
    sizes=[(s[0], s[1]) for s in sizes],
    append_images=icons[1:]
)
print("favicon.ico written")

# apple-touch-icon.png — 180x180
apple = img.resize((180, 180), Image.LANCZOS)
apple.save(os.path.join(public_dir, "apple-touch-icon.png"), format="PNG")
print("apple-touch-icon.png written")

# favicon-32x32.png and favicon-16x16.png
for size in [32, 16]:
    resized = img.resize((size, size), Image.LANCZOS)
    resized.save(os.path.join(public_dir, f"favicon-{size}x{size}.png"), format="PNG")
    print(f"favicon-{size}x{size}.png written")

print("All favicons generated.")
