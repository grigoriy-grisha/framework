export function isEqual(prevState: any, state: any) {
  return JSON.stringify(prevState) === JSON.stringify(state);
}

export function getPage(pages: any, path: any, param: string) {
  let page = null;
  if (path.includes(param)) {
    page = path.replace(param, ":id");
    return pages[page];
  }
  page = pages[path];
  return page;
}

export function hashCode(str: string) {
  return str + "-" + new Date().valueOf();
}
export function getString(num: number) {
  return num + "";
}
export function hash() {
  return "" + new Date().valueOf();
}
export function isAttr(received: string | null, expected: string) {
  return received === expected;
}

export function storage(name: string, obj: any) {
  localStorage.setItem(name, JSON.stringify(obj));
}
export function validation(name: string, reg: RegExp): string | undefined {
  const match = name.match(reg);
  if (match) {
    return match[0];
  }
}
export function initState(name: string, obj: any) {
  const storage = localStorage.getItem(name);
  if (storage) {
    return JSON.parse(storage);
  }
  return obj;
}

export function maxPage(length: number, range: number) {
  return Math.ceil(length / range);
}

export function validationMass(str: string = "") {
  let coincidence = str.replace(/\D/, "");

  if (coincidence) {
    return coincidence;
  }
}

export function percent(all: number, number: number) {
  return number && all ? ((number / all) * 100).toFixed(2) : 0;
}

export function classes(className: string) {
  return "." + className;
}

export function find(array: Array<any>, field: string, anotherField: any) {
  return array.find((elem: any) => {
    return elem[field] === anotherField;
  });
}

export function incdec(left: number, right: number, operator: "+" | "-") {
  return eval(`+(${left} ${operator} ${right}).toFixed(2)`);
}

export function fixed(expresion: number, fixed: number = 2) {
  return +expresion.toFixed(fixed);
}

