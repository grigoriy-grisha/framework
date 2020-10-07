class Dom {
  $el: Element;
  constructor(protected selector: string | Element) {
    this.$el =
      typeof selector === "string"
        ? document.createElement(selector)
        : selector;
  }

  find(selector: string) {
    const elem = this.$el.querySelector(selector);
    if (elem) {
      return $(elem);
    }
  }

  html(html: string) {
    if (html) {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.$el.innerHTML = ''
    return this
  }

  toStringHtml() {
    return this.$el.innerHTML
  }

  closest(selector: string) {
      return this.$el.closest(selector)
  }

  data(attr: string) {
    return this.$el.getAttribute(attr)
  }

  append(node: Dom | Element) {
    if (node instanceof Dom) {
      this.$el.append(node.$el);
    } else {
      this.$el.append(node);
    }
    return this;
  }

  on(event: string, fn: (...args: any[]) => any) {
    this.$el.addEventListener(event, fn);
  }

  off(event: string, fn: (...args: any[]) => any) {
    this.$el.removeEventListener(event, fn);
  }
}

export function $(selector: string | Element): Dom {
  return new Dom(selector);
}

$.create = (tagName: string, clases = "") => {
  const $el = document.createElement(tagName);
  if (clases) {
    $el.classList.add(clases);
  }
  return $($el);
};
