with open("frontend/src/components/toolkit/Toolkit.js", "rb") as f:
    tk_js = f.read().decode("utf-8")

tk_js_norm = tk_js.replace("\r\n", "\n")

old_tk_title = "        <h2>THE TOOLKIT</h2>"
new_tk_title = '        <h2>THE TOOLKIT<span className="tk-accent">.</span></h2>'

assert old_tk_title in tk_js_norm, "old_tk_title not found in Toolkit.js"
tk_js_norm = tk_js_norm.replace(old_tk_title, new_tk_title, 1)

with open("frontend/src/components/toolkit/Toolkit.js", "wb") as f:
    f.write(tk_js_norm.replace("\n", "\r\n").encode("utf-8"))

print("Updated Toolkit.js!")

with open("frontend/src/components/toolkit/toolkit.css", "rb") as f:
    tk_css = f.read().decode("utf-8")

tk_css_norm = tk_css.replace("\r\n", "\n")

old_tk_h2 = """.tk-header h2 {
  font-family: 'Clash Display', sans-serif;
  font-size: clamp(38px, 4.6vw, 60px);
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--text-primary, #e7e2df);
  text-transform: uppercase;
  line-height: 1.1;
  margin-bottom: 8px;
}"""

new_tk_h2 = """.tk-header h2 {
  font-family: 'Clash Display', sans-serif;
  font-size: clamp(38px, 4.6vw, 60px);
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--text-primary, #e7e2df);
  text-transform: uppercase;
  line-height: 1.1;
  margin-bottom: 8px;
}

.tk-accent {
  color: var(--accent-primary, #b51f32);
}"""

assert old_tk_h2 in tk_css_norm, "old_tk_h2 not found in toolkit.css"
tk_css_norm = tk_css_norm.replace(old_tk_h2, new_tk_h2, 1)

with open("frontend/src/components/toolkit/toolkit.css", "wb") as f:
    f.write(tk_css_norm.replace("\n", "\r\n").encode("utf-8"))

print("Updated toolkit.css!")

