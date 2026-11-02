with open("frontend/src/components/ynw/ynw.css", "rb") as f:
    ynw_css = f.read().decode("utf-8")

ynw_css_norm = ynw_css.replace("\r\n", "\n")

old_subtitle = """.ynw-header .ynw-subtitle {
  color: var(--text-secondary);
  font-size: 15px;
  letter-spacing: 1.2px;
  font-weight: 400;
}"""

new_subtitle = """.ynw-header .ynw-subtitle {
  margin-top: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  color: var(--text-secondary, #a7a2a0);
  max-width: 640px;
  line-height: 1.6;
  letter-spacing: normal;
  font-weight: 400;
}"""

assert old_subtitle in ynw_css_norm, "old_subtitle not found in ynw.css"
ynw_css_norm = ynw_css_norm.replace(old_subtitle, new_subtitle, 1)

with open("frontend/src/components/ynw/ynw.css", "wb") as f:
    f.write(ynw_css_norm.replace("\n", "\r\n").encode("utf-8"))

print("Updated ynw.css!")

