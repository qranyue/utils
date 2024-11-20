/**
 * 获取元素样式
 */
const copycss = (el: Element) => {
  const css = [] as string[];
  for (const r of document.styleSheets) {
    for (const rule of r.cssRules) {
      if (css.indexOf(rule.cssText) >= 0) continue;
      const q = rule.cssText.split(" {")[0];
      if (el.querySelector(q) || el.matches(q)) css.push(rule.cssText);
      if (/^@media print/.test(rule.cssText)) css.push(rule.cssText);
    }
  }
  return css.join("");
};

/**
 * 图片处理
 */
const imgsed = async (imgs: NodeListOf<HTMLImageElement>) => {
  const ps = [] as Promise<void>[];
  for (const img of imgs) {
    ps.push(new Promise<void>((resolve) => img.addEventListener("load", () => resolve(void 0))));
  }
  return await Promise.all(ps);
};

/**
 * 打印
 */
export const print = async (el: string | Element) => {
  if (typeof el === "string") el = document.querySelector(el)!;
  const i = document.createElement("iframe");
  document.body.appendChild(i);
  i.src = "about:blank";
  i.style.position = "fixed";
  i.style.top = "-10000px";
  i.style.left = "-10000px";
  i.style.visibility = "hidden";
  const win = i.contentWindow;
  const doc = win!.document;
  const css = doc.createElement("style");
  css.textContent = copycss(el);
  doc.head.appendChild(css);
  doc.body.appendChild(el.cloneNode(true));
  await imgsed(doc.querySelectorAll("img"));
  win!.print();
  i.remove();
};
