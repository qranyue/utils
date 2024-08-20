/**
 * 获取元素样式
 * @param {HTMLElement} el
 */
const copycss = (el) => {
  const css = [];
  for (const r of document.styleSheets) {
    for (const rule of r.cssRules) {
      if (css.indexOf(rule.cssText) >= 0) continue;
      if (el.querySelector(rule.selectorText) || el.matches(rule.selectorText)) css.push(rule.cssText);
      if (/^@media print/.test(rule.cssText)) css.push(rule.cssText);
    }
  }
  return css.join("");
};

/**
 * 图片处理
 * @param {NodeListOf<HTMLImageElement>} imgs 图片查询
 */
const imgsed = async (imgs) => {
  const ps = [];
  for (const img of imgs) {
    ps.push(new Promise((resolve) => img.addEventListener("load", resolve)));
  }
  return await Promise.all(ps);
};

/**
 * 打印
 * @param {string|HTMLElement} el
 * @returns {Promise<void>}
 */
export const print = async (el) => {
  if (typeof el === "string") el = document.querySelector(el);
  const i = document.createElement("iframe");
  document.body.appendChild(i);
  i.src = "about:blank";
  i.style.position = "fixed";
  i.style.top = "-10000px";
  i.style.left = "-10000px";
  i.style.visibility = "hidden";
  const win = i.contentWindow;
  const doc = win.document;
  const css = doc.createElement("style");
  css.textContent = copycss(el);
  doc.head.appendChild(css);
  doc.body.appendChild(el.cloneNode(true));
  await imgsed(doc.querySelectorAll("img"));
  win.print();
  i.remove();
};
