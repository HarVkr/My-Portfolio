with open("frontend/src/components/toolkit/Toolkit.js", "rb") as f:
    content = f.read().decode("utf-8")

old_block = """    update();
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    if (sheetRef.current) ro.observe(sheetRef.current);
    return () => {
      window.removeEventListener("resize", update);
      ro.disconnect();
    };"""

new_block = """    update();

    let rafId = null;
    const scheduleUpdate = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("resize", scheduleUpdate);

    // Update light fan cleanly after card expand / collapse completes without mid-animation thrashing
    const timer = setTimeout(update, 460);

    return () => {
      window.removeEventListener("resize", scheduleUpdate);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(timer);
    };"""

old_article = """              return (
                <motion.article
                  layout={reduce ? false : "position"}
                  key={section.order}"""

new_article = """              return (
                <article
                  key={section.order}"""

old_article_close = """                  <Perfs bottom />
                </motion.article>"""

new_article_close = """                  <Perfs bottom />
                </article>"""

# normalize CRLF
content_norm = content.replace("\r\n", "\n")
assert old_block in content_norm, "old_block not found"
assert old_article in content_norm, "old_article not found"
assert old_article_close in content_norm, "old_article_close not found"

content_norm = content_norm.replace(old_block, new_block, 1)
content_norm = content_norm.replace(old_article, new_article, 1)
content_norm = content_norm.replace(old_article_close, new_article_close, 1)

with open("frontend/src/components/toolkit/Toolkit.js", "wb") as f:
    f.write(content_norm.replace("\n", "\r\n").encode("utf-8"))

print("Updated Toolkit.js successfully!")

