/**
 * Filtre mes recettes en faisant correspondre mes données 
 * avec ce que je tappe dans la recherche ou avec les tags
 */
export class Filter {
  constructor(recipes) {
    this.recipes = recipes
  }

  bySearchBar(input) {

    let result = []
    for (let recipe of this.recipes) {
      if (recipe.name.toLowerCase().includes(input.toLowerCase()) ||
        recipe.description.toLowerCase().includes(input.toLowerCase()) ||
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(input.toLowerCase()))) {
        result.push(recipe)
      }
      this.recipes = result
    }
    return this.recipes

  }

  byTag(tag) {
    switch (tag.type) { // je viens chercher la valeur type de mon objet tag
      case "ingredients":
        this.recipes = this.recipes.filter(recipe => {
          return recipe.ingredients.some(ingredient => {
            return ingredient.ingredient.toLowerCase().includes(tag.value.toLowerCase())
          })
        })
        break

      case "apparatus":
        this.recipes = this.recipes.filter(recipe => {
          return recipe.appliance.toLowerCase().includes(tag.value.toLowerCase())
        })
        break

      case "utensils":
        this.recipes = this.recipes.filter(recipe => {
          return recipe.ustensils.some(ustensil => {
            return ustensil.toLowerCase().includes(tag.value.toLowerCase())
          })
        })
        break
    }
    return this.recipes
  }
}