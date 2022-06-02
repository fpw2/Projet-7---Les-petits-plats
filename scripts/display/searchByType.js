// DOM
const ingredientsResult = document.querySelector("#list-ingredients-result")
const apparatusResult = document.querySelector("#list-apparatus-result")
const utensilsResult = document.querySelector("#list-utensils-result")

export const displayIngredients = (recipes, tagIngredients) => {
    ingredientsResult.innerHTML = ""
    let ingredientsArray = []

    recipes.forEach(recipe => {
        const ingredients = recipe.ingredients
        const itemsIngredients = ingredients.map(ings => ings.ingredient) // ["",""]["",""]["","",""] etc...
        itemsIngredients.forEach(item => ingredientsArray.push(item))
    })

    let ingredientsList = [...new Set(ingredientsArray)].sort() // j'enlève les doublons et je trie par ordre alpha
    // je filtre pour enlever ceux que j'ai dans mes tags et je trie
    ingredientsList = ingredientsList.filter(ingredient => !tagIngredients.includes(ingredient))

    ingredientsList.forEach(ingredient => {
        ingredientsResult.insertAdjacentHTML("beforeend",
            `<p class="item-list">${ingredient}</p>`)
    })
}

export const displayApparatus = (recipes, tagApparatus) => {
    apparatusResult.innerHTML = ""
    let apparatusArray = []

    recipes.filter(recipe => {
        const apparatus = recipe.appliance
        // j'envoie tous les résultats dans mon tableau pour pouvoir le parcourir
        apparatusArray.push(apparatus)
    })

    let apparatusList = [...new Set(apparatusArray)].sort()
    apparatusList = apparatusList.filter(apparatus => !tagApparatus.includes(apparatus))

    apparatusList.forEach(apparatus => {
        apparatusResult.insertAdjacentHTML("beforeend",
            `<p class="item-list">${apparatus}</p>`)
    })

}

export const displayUtensils = (recipes, tagUtensils) => {
    utensilsResult.innerHTML = ""
    let utensilsArray = []

    recipes.map(recipe => {
        const utensils = recipe.ustensils
        utensils.forEach(utensil => utensilsArray.push(utensil))
    })

    let utensilsList = [...new Set(utensilsArray)].sort()
    utensilsList = utensilsList.filter(utensil => !tagUtensils.includes(utensil))

    utensilsList.forEach(utensil => {
        utensilsResult.insertAdjacentHTML("beforeend", 
            `<p class="item-list">${utensil}</p>`)
    })
}