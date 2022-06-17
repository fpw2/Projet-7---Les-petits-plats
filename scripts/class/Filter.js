
/**
 * Filtre mes recettes en faisant correspondre mes données 
 * avec ce que je tappe dans la recherche ou/et avec les tags
 */
export class Filter {
  constructor(recipes) {
    this.recipes = recipes
  }

  bySearchBar(input) {
    this.recipes = this.recipes.filter(recipe => { // filter : me retourne tous les éléments trouvés correspondant
      return recipe.name.toLowerCase().includes(input.toLowerCase()) ||
        recipe.description.toLowerCase().includes(input.toLowerCase()) ||
        recipe.ingredients.some(ing => {
          return ing.ingredient.toLowerCase().includes(input.toLowerCase())
        })
    })
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

