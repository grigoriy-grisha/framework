
import { Component } from "../../core/Components/Component";


export class Header extends Component<{}> {
  public static  className = "header";
  constructor(protected options: any) {
    super({
      listeners: [],
      subscribe: ["title"],
      ...options,
    });
  }

  toHTML() {
    return `  
      <nav> 
        <div class="nav-wrapper green darken-1">
          <div class="container"> 
              <ul id="nav-mobile" class="right hide-on-med-and-down">
                  <li><a href="#"><i class="material-icons">home</i>Home</a></li>
              </ul>
          </div>    
        </div>
      </nav>

    
  `;
  }
  storeChanged(change: any) {}
  init() {
    super.init();
    
  }
  destroy() {
    super.destroy();
  }
}
