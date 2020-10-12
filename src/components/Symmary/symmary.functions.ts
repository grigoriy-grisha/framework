import { percent } from "../../core/Utils/utils";

export function renderNutrients(totalNutrients: any) {
  return `
          ${totalNutrients
            .map((item: any) => {
              return `
                  <div class="symmary__row">
                      <span class="symmary__info--item">${item.name}</span>
                      <span class="symmary__info--item">${+item.amount.toFixed(2)} ${item.unitName}</span>
                  </div>`;
            })
            .join("")}`;
}

export function symmaryGraph(total: any) {

  const all = total.totalNutrientsMass;
  const protein = find("Protein", total.totalNutrients, "name").amount
  const lipid = find("Total lipid (fat)", total.totalNutrients, "name").amount
  const carbohydrate = find("Carbohydrate, by difference", total.totalNutrients, "name").amount
  
  return `
  <div class="symmary__macronutrients-info">
                          <div class="symmary__macronutrients--item">
                              <span>Total lipid (fat)</span>
                              <span>${percent(all, lipid)}%</span>
                              <span class="color deep-orange accent-4"></span>
                          </div>
                          <div class="symmary__macronutrients--item">
                              <span>Protein</span>
                              <span>${percent(all, protein)}%</span>
                              <span class="color blue-grey lighten-2"></span>
                          </div>
                          <div class="symmary__macronutrients--item">
                              <span>Carbohydrate</span>
                              <span>${percent(all, carbohydrate)}%</span>
                              <span class="color grey darken-1"></span>
                          </div>
                    </div>
                    <div class="symmary__graph">
                    ${
                      total.totalNutrientsMass
                        ? `<span class="symmary__graph--item symmary__graph--fat deep-orange accent-4" style="width: ${percent(all, lipid)}%"></span>
                           <span class="symmary__graph--item symmary__graph--protein blue-grey lighten-2" style="width: ${percent(all, protein)}%"></span>
                           <span class="symmary__graph--item symmary__graph--carbohydrates grey darken-1" style="width: ${percent(all, carbohydrate)}%"></span>`
                        : ""
                    }
                    </div> 
   
    `;
}

function find(some: string | number, array: any, field: any) {
    return array.filter((item: any) => {
        return item[field] === some
    })[0]
}

