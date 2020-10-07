import { Component } from "../../core/Components/Component";
import { TheDatepicker } from "../../lib/datepicker/the-datepicker";
export class Symmary extends Component {
  static className = "symmary";
  a: any;
  constructor(protected $root: any, options: any) {
    super($root, {
      listeners: ["input"],
      subscribe: ["title"],
      ...options,
    });
    this.initState({ title: "a" });
  }

  toHTML() {
    return `

        <div class="symmary__wrapper">
            <div class="symmary__info">
                <div class="symmary__block">
                    <div class="symmary__row">
                        <span class="symmary__info--item">Осталось каллорий</span>
                        <span class="symmary__info--item">2600</span>
                    </div>
                    <div class="symmary__row">
                        <span class="symmary__info--item">Употреблено</span>
                        <span class="symmary__info--item">300</span>
                    </div>

                      <div class="symmary__row">
                          <span class="symmary__info--item">14% от РСК</span>
                          <span class="symmary__info--item">2900</span>
                      </div>

                </div>
                <div class="symmary__micronutrients">
                    <div class="symmary__micronutrients--item symmary__row">
                        <span>Всего жиров:</span>
                        <span>2600</span>
                    </div>
                    <div class="symmary__micronutrients--item symmary__row">
                        <span>Натрий:</span>
                        <span>0.2</span>
                    </div> 
                    <div class="symmary__micronutrients--item symmary__row">
                      <span>Натрий:</span>
                      <span>0.2</span>
                    </div>
                    <div class="symmary__micronutrients--item symmary__row">
                      <span>Натрий:</span>
                      <span>0.2</span>
                    </div>
                    <div class="symmary__micronutrients--item symmary__row">
                      <span>Натрий:</span>
                      <span>0.2</span>
                    </div>
                    <div class="symmary__micronutrients--item symmary__row" >
                      <span>Натрий:</span>
                      <span>0.2</span>
                    </div>
                </div>         
            </div>
            
            <div class="symmary__detailed-info">
                <div class="symmary__macronutrients">
                    <div class="symmary__macronutrients-info">
                          <div class="symmary__macronutrients--item">
                              <span>Жиры</span>
                              <span>52%</span>
                              <span class="color deep-orange accent-4"></span>
                          </div>
                          <div class="symmary__macronutrients--item">
                              <span>Белки</span>
                              <span>52%</span>
                              <span class="color blue-grey lighten-2"></span>
                          </div>
                          <div class="symmary__macronutrients--item">
                              <span>Углеводы</span>
                              <span>52%</span>
                              <span class="color grey darken-1"></span>
                          </div>
                    </div>
                    <div class="symmary__graph">
                        <span class="symmary__graph--item symmary__graph--fat deep-orange accent-4"></span>
                        <span class="symmary__graph--item symmary__graph--protein blue-grey lighten-2"></span>
                        <span class="symmary__graph--item symmary__graph--carbohydrates grey darken-1"></span>
                    </div>  
                  </div>
            </div>
        </div>

  `;
  }
  // onClick(e: any) {
  //   this.setState({ title: "b" });
  //   console.log(this.state.title);
  // }

  storeChanged(change: any) {
    this.a = change;
  }
  init() {
    super.init();
  }
  onInput(e: any) {
    this.$dispatch({ payload: e.target.value, type: "a" });
  }

  destroy() {
    super.destroy();
  }
}
