export function renderMacronutrients(currentProduct: any) {
  const filterProduct = currentProduct.filter((item: any) => {
    return !item.name.match(/\d:\d/)
  });
  return `
        
        ${filterProduct
          .map((item: any) => {
            return `
                <div class="symmary__row">
                    <span class="symmary__info--item">${item.name}</span>
                    <span class="symmary__info--item">${item.amount} ${item.unitName}</span>
                </div>`;
          })
          .join("")}`;
}
