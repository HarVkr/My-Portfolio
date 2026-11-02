import struct

filepath = "frontend/public/Introduction-Video-Export-5.mp4"

with open(filepath, "rb") as f:
    f.seek(42122669)
    moov_data = f.read(26330)

print(f"Read {len(moov_data)} bytes of moov")
has_stco = b"stco" in moov_data
has_co64 = b"co64" in moov_data
print("Has 'stco' (32-bit offsets)?", has_stco)
print("Has 'co64' (64-bit offsets)?", has_co64)

