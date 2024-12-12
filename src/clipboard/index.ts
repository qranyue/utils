let input: HTMLTextAreaElement;

const init = () => {
  if (input) return;
  input = document.createElement("textarea");
  input.style.position = "fixed";
  input.style.left = "-9999px";
  input.style.top = "-9999px";
  document.body.appendChild(input);
};

export const copy = (text: string) => {
  if (navigator.clipboard) return navigator.clipboard.writeText(text);
  init();
  input.value = text;
  input.select();
  document.execCommand("copy");
};

export const paste = () => {
  if (navigator.clipboard) return navigator.clipboard.readText();
  init();
  input.focus();
  document.execCommand("paste");
  return input.value;
};
