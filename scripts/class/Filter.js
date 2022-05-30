/**
 * Filtre mes recettes en faisant correspondre mes données avec ce que je tappe dans la recherche
 * @param {object} dataRecipes 
 * @param {string} value 
 * @returns nom ou description ou ingredients if true
 */
export class Filter {
  constructor(recipes) {
    this.recipes = recipes
  }

  bySearchBar(input) {
    this.recipes = this.recipes.filter(recipe => { // filter : me retourne tous les éléments trouvés correspondant
      return recipe.name.toLowerCase().includes(input.toLowerCase()) ||
        recipe.description.toLowerCase().includes(input.toLowerCase()) ||
        // some : return true si il trouve une correspondance
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(input.toLowerCase()))
    })
    return this.recipes
  }


  byUtensils(datasRecipes, input) {
    return datasRecipes.filter(recipe => {
      return recipe.ustensils.forEach(ustensil => ustensil.toLowerCase().includes(input.toLowerCase()))
    })
  }

  byTag(tag) {
    switch (tag.type) { // je viens chercher la valeur type de mon objet tag
      case "ingredients":
        this.recipes = this.recipes.filter(recipe => {
          return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.value.toLowerCase()))
        })
        break

      case "apparatus":
        this.recipes = this.recipes.filter(recipe => {
          return recipe.appliance.toLowerCase().includes(tag.value.toLowerCase())
        })
        break

      case "utensils":


      break
    }
    return this.recipes
  }

}