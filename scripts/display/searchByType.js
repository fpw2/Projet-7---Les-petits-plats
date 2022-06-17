// DOM
const $ingredientsResult = document.querySelector("#list-ingredients-result")
const $apparatusResult = document.querySelector("#list-apparatus-result")
const $utensilsResult = document.querySelector("#list-utensils-result")

export const displayIngredients = (recipes, tagIngredients) => {  // tagIngredients : tous les tags que j'ai cliqué
    $ingredientsResult.innerHTML = ""
    let ingredientsArray = []

    recipes.forEach(recipe => {
        const ingredients = recipe.ingredients
        const itemsIngredients = ingredients.map(ings => ings.ingredient) // ["",""]["",""]["","",""] etc...
        itemsIngredients.forEach(item => ingredientsArray.push(item))
    })

    let ingredientsList = [...new Set(ingredientsArray)].sort() // j'enlève les doublons et je trie par ordre alpha
    
    const inputIngredients = document.querySelector("#search-ingredients").value
    // je filtre en enlevant ceux que j'ai dans mes tags et ce que je tappe
    ingredientsList = ingredientsList.filter(ingredient => !tagIngredients.includes(ingredient) && ingredient.toLowerCase().includes(inputIngredients.toLowerCase()))
    
    ingredientsList.forEach(ingredient => {
        $ingredientsResult.insertAdjacentHTML("beforeend",
            `<p class="item-list item-ingredients">${ingredient}</p>`)
    })
}

export const displayApparatus = (recipes, tagApparatus) => {
    $apparatusResult.innerHTML = ""
    let apparatusArray = []

    recipes.filter(recipe => {
        const apparatus = recipe.appliance
        apparatusArray.push(apparatus) // j'envoie tous les résultats dans mon tableau pour pouvoir le parcourir
    })

    let apparatusList = [...new Set(apparatusArray)].sort()
    const inputApparatus = document.querySelector("#search-apparatus").value

    apparatusList = apparatusList.filter(apparatus => !tagApparatus.includes(apparatus) && apparatus.toLowerCase().includes(inputApparatus.toLowerCase()))

    apparatusList.forEach(apparatus => {
        $apparatusResult.insertAdjacentHTML("beforeend",
            `<p class="item-list item-apparatus">${apparatus}</p>`)
    })

}

export const displayUtensils = (recipes, tagUtensils) => {
    $utensilsResult.innerHTML = ""
    let utensilsArray = []

    recipes.map(recipe => {
        const utensils = recipe.ustensils
        utensils.forEach(utensil => utensilsArray.push(utensil))
    })

    let utensilsList = [...new Set(utensilsArray)].sort()
    const inputUtensils = document.querySelector("#search-utensils").value

    utensilsList = utensilsList.filter(utensil => !tagUtensils.includes(utensil) && utensil.toLowerCase().includes(inputUtensils.toLowerCase()))

    utensilsList.forEach(utensil => {
        $utensilsResult.insertAdjacentHTML("beforeend", 
            `<p class="item-list item-utensils">${utensil}</p>`)
    })
}