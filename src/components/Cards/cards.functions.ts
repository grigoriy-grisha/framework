import { cardName } from "../../constants";

export const cardRender = (card: string, state: any) => {


  return `
          <div class="card blue-grey darken-1">
          <div class="card-content cursor-pointer white-text border-bottom " data-type="${card}">
            <i class="material-icons" style="color: #43A047" data-type="${card}">control_point</i>
            <span class="card-title" data-type="${card}">${card}</span>
            <span data-type="${card}">${state[card].symmary}</span>
            
          </div>
            
           ${
             state[card].products.length
               ? state[card].products
                   .map((item: any) => {
                     return `
                     <div class="card-content  white-text border-bottom">
                        <span class="card-title">${item.name}</span>
                        <span class="value">${item.value}</span>
                        <div data-type="delete" class="delete">
                            <i data-type="delete" class="material-icons cursor-pointer" data-id="${item.id}" data-eating="${card}">delete</i> 
                        </div>
                        
                      </div>`;
                   })
                   .join("")
               : `<div class="card-action">
                No products have been added yet
            </div>`
           }
            
         
      </div>`;
};
