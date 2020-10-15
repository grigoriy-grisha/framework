import { Component } from "../../core/Components/Component";

export class Mock extends Component<{ count: number }> {
  public static className = "mock";

  constructor(protected options: any) {
    super({
      listeners: [],
      subscribe: ['count'],
      ...options,
    });
    this.initState({
      count: 0,
    });
  }

  toHTML() {
    return `<div class="mock">mock!!!${this.state.count}</div>`;
  }
  storeChanged(change: any) {
    this.setState(change);
  }

  init() {
    super.init();
  }

  destroy() {
    super.destroy();
  }
}
