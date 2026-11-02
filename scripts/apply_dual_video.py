with open("frontend/src/components/PortraitStage.js", "rb") as f:
    code = f.read().decode("utf-8")

code_norm = code.replace("\r\n", "\n")

old_def = """const VIDEO_SRC = "/Introduction-Video-Export-5.mp4";
const PREVIEW_LENGTH = 15; // seconds of the video that loop in the preview"""

new_def = """const PREVIEW_VIDEO_SRC = "/Introduction-Video-12-secs.mp4";
const TRAILER_VIDEO_SRC = "/Introduction-Video-Export-5.mp4";
const PREVIEW_LENGTH = 12; // seconds of the video that loop in the preview"""

assert old_def in code_norm, "old_def not found"
code_norm = code_norm.replace(old_def, new_def, 1)

# In trailer modal: src={VIDEO_SRC} -> src={TRAILER_VIDEO_SRC}
old_trailer = """            <video
              ref={trailerRef}
              className="h-full w-full cursor-pointer bg-black object-contain"
              src={VIDEO_SRC}"""

new_trailer = """            <video
              ref={trailerRef}
              className="h-full w-full cursor-pointer bg-black object-contain"
              src={TRAILER_VIDEO_SRC}"""

assert old_trailer in code_norm, "old_trailer not found"
code_norm = code_norm.replace(old_trailer, new_trailer, 1)

# In hero preview: src={VIDEO_SRC} -> src={PREVIEW_VIDEO_SRC}
old_preview = """            <video
              ref={previewRef}
              className="h-full w-full object-cover object-center"
              src={VIDEO_SRC}"""

new_preview = """            <video
              ref={previewRef}
              className="h-full w-full object-cover object-center"
              src={PREVIEW_VIDEO_SRC}"""

assert old_preview in code_norm, "old_preview not found"
code_norm = code_norm.replace(old_preview, new_preview, 1)

with open("frontend/src/components/PortraitStage.js", "wb") as f:
    f.write(code_norm.replace("\n", "\r\n").encode("utf-8"))

print("Updated PortraitStage.js successfully!")
