import {recipes} from "../data/recipes.js"

// DOM
const searchInput = document.querySelector("#search-input")
const searchResult = document.querySelector("#search-result")

searchInput.addEventListener("keyup", (event) => {
    // recipes : mon tableau de données
    const filterResult = filterRecipe(recipes, event.target.value)
    searchResult.innerHTML = "" // évite les doublons 
    // pour chaque resultat j'affiche mon modele de card recipe
    filterResult.forEach(recipe => {
        displayRecipe(recipe)
    })

})

/**
 * Affiche le rendu HTML d'une recette
 * @param {object} recipe 
 */
const displayRecipe = (recipe) => {
    searchResult.insertAdjacentHTML("beforeend",
    `
    <li class="recipe">
        <div class="recipe-image"></div>
        <div class="recipe-body">
            <div class="recipe-header">
                <div class="recipe-title">
                    <h3>${recipe.name}</h3>
                </div>
                <div class="recipe-time">
                    <p id="clock"></p>
                    <strong>${recipe.time} min</strong>
                </div>
            </div>
            <div class="recipe-content">
                <div class="recipe-ingredients">${recipe.ingredients.map(ingredient => `<li>${ingredient.ingredient} </li>`)}</div>
                <div class="recipe-describe">${recipe.description}</div>
            </div>
        </div>
    </li>
    `)
}

recipes.forEach(recipe => {
    displayRecipe(recipe)
})

/**
 * Filtre mes recettes en faisant correspondre mes données avec ce que je tappe dans la barre de recherche
 * @param {object} dataRecipes 
 * @param {string} value 
 * @returns nom ou description ou ingredients if true
 */
const filterRecipe = (dataRecipes, value) => {
    return dataRecipes.filter(recipe => { // filter : me retourne tous les éléments trouvés correspondant
        return recipe.name.toLowerCase().includes(value.toLowerCase()) 
            || recipe.description.toLowerCase().includes(value.toLowerCase())
            // some : return true si il trouve une correspondance
            || recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(value.toLowerCase())) 
    })
}