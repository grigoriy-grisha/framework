import { ActiveRouter } from "./ActiveRouter";
import { $ } from "../Utils/dom";
import { getPage } from "../Utils/utils";

export class Router {
  pages: any;
  prevPage: any;
  selector: string;
  constructor(selector: string, pages: any) {
    this.pages = pages;
    this.selector = selector;
    this.init();
    console.log(this.pages);
    this.prevPage = null;
    this.handlerhash = this.handlerhash.bind(this);
  }

  init() {
    addEventListener("hashchange", () => this.handlerhash());
    this.handlerhash();
  }

  handlerhash() {
    const path = ActiveRouter.path;
    const $mainSelector = $(document.body).find(this.selector);
    if (!!getPage(this.pages, path) && $mainSelector) {
      if (this.prevPage) {
        this.prevPage.destroy();
      }
      
      $mainSelector.clear();

      const page = getPage(this.pages, path).getRoot();
      $mainSelector.append(page);
      getPage(this.pages, path).init();

      this.prevPage = getPage(this.pages, path);
    }
  }

  destroy() {
    addEventListener("hashchange", () => this.handlerhash());
  }
}
