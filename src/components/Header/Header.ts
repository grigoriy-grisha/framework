import { Component } from "../../core/Components/Component";
import { TheDatepicker } from "../../lib/datepicker/the-datepicker";
export class Header extends Component {
  static className = "header";

  constructor(protected $root: any, options: any) {
    super($root, {
      listeners: ["input"],
      subscribe: ["title"],
      ...options,
    });

    this.initState({ a: "a" });
  }

  toHTML() {
    return `  
      <nav> 
        <div class="nav-wrapper green darken-1">
          <div class="container">
              <input type="text" id="datepicker" readonly placeholder="Выберите Дату" >
              <ul id="nav-mobile" class="right hide-on-med-and-down ">
                  <li><a href="#"><i class="material-icons">home</i>Главная</a></li>
                  <li><a href="#"><i class="material-icons">assessment</i>Отчеты</a></li>
              </ul>
          </div>    
        </div>
      </nav>

    
  `;
  }
  // onClick(e: any) {
  //   this.$dispatch({ payload: "asdasd", type: "a" });

  //   this.setState({ a: "b" });
  // }

  storeChanged(change: any) {}
  init() {
    super.init();
    const input = document.getElementById("datepicker");
    const datepicker = new TheDatepicker.Datepicker(input);
    datepicker.render();
  }
  onInput(e: any) {
    this.$dispatch({ payload: e.target.value, type: "a" });
  }

  destroy() {
    console.log(this);

    super.destroy();
  }
}
