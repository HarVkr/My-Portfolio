with open("frontend/src/components/ynw/YourNextWatch.js", "rb") as f:
    ynw_js = f.read().decode("utf-8")

ynw_js_norm = ynw_js.replace("\r\n", "\n")

old_header = """        <header className="ynw-header">
          <p className="ynw-eyebrow">Interactive Portfolio Cinema</p>
          <h2>YOUR NEXT WATCH</h2>
          <p className="ynw-subtitle">
            Two reels. Six projects. Drag, scroll or use arrow keys to rotate
            the cylinders. Click any frame to inspect the deep-dive.
          </p>"""

new_header = """        <header className="ynw-header">
          <h2>
            YOUR NEXT WATCH<span className="ynw-accent">.</span>
          </h2>
          <p className="ynw-subtitle">
            Drag, scroll or use arrow keys to rotate the cylinders. Click any frame to deep-dive.
          </p>"""

assert old_header in ynw_js_norm, "old_header not found in YourNextWatch.js"
ynw_js_norm = ynw_js_norm.replace(old_header, new_header, 1)

with open("frontend/src/components/ynw/YourNextWatch.js", "wb") as f:
    f.write(ynw_js_norm.replace("\n", "\r\n").encode("utf-8"))

print("Updated YourNextWatch.js!")

