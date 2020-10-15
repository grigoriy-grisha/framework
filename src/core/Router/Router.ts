import { PageComponent } from './../Components/PageComponent';

import { ActiveRouter } from "./ActiveRouter";
import { $ } from "../Utils/dom";
import { getPage } from "../Utils/utils";


type OptionsRouteType = {
  [key: string]: PageComponent
}

export class Router {
  pages: OptionsRouteType;
  prevPage: PageComponent | null;
  selector: string;
  constructor(selector: string, pages: OptionsRouteType) {
    this.pages = pages;
    this.selector = selector;
    this.init();
    this.prevPage = null;
    this.handlerhash = this.handlerhash.bind(this);
  }

  init() {
    addEventListener("hashchange", () => this.handlerhash());
    this.handlerhash();
  }

  handlerhash() {
    const path = ActiveRouter.path;
    const param = ActiveRouter.param
    const $mainSelector = $(document.body).find(this.selector);
    
    if (!!getPage(this.pages, path, param) && $mainSelector) {
      if (this.prevPage) {
        this.prevPage.destroy();
      }
      $mainSelector.clear();
         
      const page = getPage(this.pages, path, param).getRoot();
      $mainSelector.append(page);
      getPage(this.pages, path, param).init();

      this.prevPage = getPage(this.pages, path, param)
    
    } else if ($mainSelector){
      if (this.prevPage) {
        this.prevPage.destroy();
      }
      $mainSelector.clear();
      const keyPage = Object.keys(this.pages)[0]
      const page = this.pages[keyPage].getRoot();
      $mainSelector.append(page);
      this.pages[keyPage].init();
    }
  }

  destroy() {
    removeEventListener("hashchange", () => this.handlerhash());
  }
}
