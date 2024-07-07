import { parse } from "yaml";

const defaults = {
  delimiter: "---",
};

export function matter(str: string) {
  const file = {
    content: str,
    data: {},
  };
  const open = defaults.delimiter;
  const close = `\n${defaults.delimiter}`;

  const openLength = open.length;
  const isStrStartsWithDelimiter = str.slice(0, openLength) === open;
  if (!isStrStartsWithDelimiter) return file;

  // strip opening delimiter
  str = str.slice(openLength);
  const len = str.length;

  // next character after the delimiter is a character from delimiter
  if (str.charAt(openLength) === open.slice(-1)) return file;

  const closeIndex = str.indexOf(close);
  // if there is no closing delimiter return file
  if (closeIndex === -1) return file;

  const matter = str.slice(0, closeIndex);
  const block = matter.replace(/^\s*#[^\n]+/gm, "").trim();

  file.data = parse(block);

  if (closeIndex === len) {
    file.content = "";
  } else {
    file.content = str.slice(closeIndex + close.length);

    if (["\n", "\r"].includes(file.content[0] as string)) {
      file.content = file.content.slice(1);
    }
  }

  return file;
}
