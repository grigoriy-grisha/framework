export function renderProductItems(array: any) {
    if (array.length) {
        return array.map( (item: any) => {
            console.log(item);
            
            return `
                <div class="search-product--item">
                    <div>
                        <div class="search-product__name">Name: <span>${item.description}</span></div>
                        <div class="search-product__description">Brand: <span>${item.brandOwner}</span></div>
                    </div>
                    <div>Ccal: <span class="green-color"> ${findField(item, 'Energy').amount}</span></div>
                </div>

            `
        }).join('')
    }
    return ''
}

function findField(item: any, field: string) {
    return item.foodNutrients.find((item: any) => item.name === field)
} 