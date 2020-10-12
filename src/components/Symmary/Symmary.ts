import { initialStateType } from './../../redux/initialState';

import { Component } from "../../core/Components/Component";
import { percent } from "../../core/Utils/utils";

import { renderNutrients, symmaryGraph } from "./symmary.functions";



export class Symmary extends Component<initialStateType>  {
  public static  className = "symmary";

  constructor(protected options: any) {
    super({
      listeners: [],
      subscribe: ["total"],
      ...options,
    });
    this.initState(this.$getState())
  }

 

  toHTML() {
    const total = percent( this.state.total.left,  this.state.total.consumed)
    return `
        <div class="symmary__wrapper">
            <div class="symmary__info">
                <div class="symmary__block">
                    <div class="symmary__row">
                        <span class="symmary__info--item">Left</span>
                        <span class="symmary__info--item ${this.state.total.left > 0 ? 'green-color' : 'red-color'}">${
                          this.state.total.left
                        }</span>
                    </div>
                    <div class="symmary__row">
                        <span class="symmary__info--item">Consumed</span>
                        <span class="symmary__info--item green-color ">${
                          this.state.total.consumed
                        }</span>
                    </div>

                      <div class="symmary__row">
                          <span><span class="symmary__info--item ${total < 0 ? 'red-color' : ''}">${total}% </span> from  RDC</span> 
                      </div>

                </div>
                <div class="symmary__micronutrients">
                    ${renderNutrients(this.state.total.totalNutrients)}
                </div>         
            </div>
            
            <div class="symmary__detailed-info">
                <div class="symmary__macronutrients">
                  ${symmaryGraph(this.state.total)}  
                  </div>
            </div>
        </div>

  `;
  }
  storeChanged(change: any) {
    console.log(change);
    
    this.setState(change)
  }
  init() {
    super.init();
  }
  destroy() {
    super.destroy();
  }
}
