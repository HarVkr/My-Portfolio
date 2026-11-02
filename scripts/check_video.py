import os

file_path = "frontend/public/Introduction-Video-Export-5.mp4"
size_mb = os.path.getsize(file_path) / (1024 * 1024)
print(f"File size: {size_mb:.2f} MB")

