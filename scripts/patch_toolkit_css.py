with open("frontend/src/components/toolkit/toolkit.css", "rb") as f:
    css = f.read().decode("utf-8")

css_norm = css.replace("\r\n", "\n")

# 1. Remove filter brightness from dimmed cards
old_dimmed = """.tk-card.is-dimmed {
  opacity: 0.18 !important;
  filter: brightness(0.4) !important;
  pointer-events: none;
  transform: none;
}"""

new_dimmed = """.tk-card.is-dimmed {
  opacity: 0.18 !important;
  pointer-events: none;
  transform: none;
  transition: opacity 0.35s ease;
}"""

assert old_dimmed in css_norm, "old_dimmed not found"
css_norm = css_norm.replace(old_dimmed, new_dimmed, 1)

# 2. Smooth, snappy accordion expansion
old_details = """.tk-card-details {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.75s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.tk-card.is-expanded .tk-card-details {
  grid-template-rows: 1fr;
}

.tk-card-details-inner {
  min-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.55s ease 0.1s;
  padding: 0 22px;
}"""

new_details = """.tk-card-details {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  contain: layout style;
}

.tk-card.is-expanded .tk-card-details {
  grid-template-rows: 1fr;
}

.tk-card-details-inner {
  min-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1) 0.08s;
  padding: 0 22px;
}"""

assert old_details in css_norm, "old_details not found"
css_norm = css_norm.replace(old_details, new_details, 1)

# 3. Marquee delay
old_strip = """.tk-card.is-expanded .tk-filmstrip-track {
  animation: tk-strip-run 26s linear infinite;
}"""

new_strip = """.tk-card.is-expanded .tk-filmstrip-track {
  animation: tk-strip-run 26s linear infinite 0.45s;
}"""

assert old_strip in css_norm, "old_strip not found"
css_norm = css_norm.replace(old_strip, new_strip, 1)

with open("frontend/src/components/toolkit/toolkit.css", "wb") as f:
    f.write(css_norm.replace("\n", "\r\n").encode("utf-8"))

print("Updated toolkit.css successfully!")

