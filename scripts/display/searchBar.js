// DOM
const $searchResult = document.querySelector("#search-result")

/**
 * Affiche le rendu HTML d'une recette
 * @param {object} recipe 
 */
 export const displayRecipe = (recipe) => {
    const ingredients = recipe.ingredients.map(ingredient => `<li>${ingredient.ingredient} : ${ingredient?.quantity ?? ""} ${ingredient?.unit ?? ""}</li>`).join("")
    $searchResult.insertAdjacentHTML("beforeend",
        `
    <div class="recipe">
        <div class="recipe-image">
            <img src="assets/images/${recipe.name}.jpg" alt="" />
        </div>
        <div class="recipe-body">
            <div class="recipe-header">
                <div class="recipe-title">
                    <h2>${recipe.name}</h2>
                </div>
                <div class="recipe-time">
                    <p><i class="far fa-clock fa-sm"></i></p>
                    <p>${recipe.time} min</p>
                </div>
            </div>
            <div class="recipe-content">
                <div class="recipe-ingredients">${ingredients}</div>
                <p class="recipe-describe ">${recipe.description}</p>
            </div>
        </div>
    </div>
    `)
}
