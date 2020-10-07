export function isEqual(prevState: any, state: any) {
  return JSON.stringify(prevState) === JSON.stringify(state);
}

export function getPage(pages: any, path: string) {
  return pages[path];
}

export function hashCode(str: string) {
  return str + str.split('').reduce((prevHash, currVal) =>
    (((prevHash << Math.random() * 15) - prevHash) + currVal.charCodeAt(0))|0, 0);
}

export function isAttr(received: string , expected: string) {
  return received === expected
}