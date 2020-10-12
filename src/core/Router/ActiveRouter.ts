export class ActiveRouter {
  constructor() {}

  static get path() {
    return window.location.hash.slice(1);
  }

  static get param() {
    return ActiveRouter.path.split("/")[1];
  }

  static navigate(path: string) {
    window.location.hash = path;
  }

  static get href() {
    return window.location.href;
  }

  static goBack() {
    history.back();
  }
}
