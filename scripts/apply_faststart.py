import os
import shutil

src_fast = "frontend/public/Introduction-Video-Export-5-faststart.mp4"
target_public = "frontend/public/Introduction-Video-Export-5.mp4"
target_public_bak = "frontend/public/Introduction-Video-Export-5.mp4.bak"
target_build = "frontend/build/Introduction-Video-Export-5.mp4"

if not os.path.exists(target_public_bak):
    shutil.copy2(target_public, target_public_bak)
    print("Backed up original to .bak")

shutil.move(src_fast, target_public)
print(f"Replaced {target_public} with FastStart version")

if os.path.exists("frontend/build"):
    shutil.copy2(target_public, target_build)
    print(f"Updated {target_build}")

