

export function renderProductItems(array: any, page: number, range: number) {
  const end = range * page;
  const start = end - range;

  
  let markup = "";
  if (array.length) {
    for (let i = start; i < end; i++) {
      const item = array[i];
      
      markup += `
          <a href="#search/${item.fdcId}" class="black-color" >
            <div class="search-product--item background-hover" data-type="product" data-object='${JSON.stringify(
              item
            )}'>
                <div>
                    <div class="search-product__name">Name: <span>${
                      item.description
                    }</span></div>
                    <div class="search-product__description">Brand: <span>${
                      item.brandOwner
                    }</span></div>
                </div>
                <div>Ccal: <span class="green-color"> ${
                  findField(item, "Energy").amount
                }</span></div>
            </div>
          </a>
      `;
    }
  }
  return markup;
}

function findField(item: any, field: string) {
  return item.foodNutrients.find((item: any) => item.name === field);
}


