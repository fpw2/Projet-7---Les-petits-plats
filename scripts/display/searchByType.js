// DOM
const ingredientsResult = document.querySelector("#list-ingredients-result")
const apparatusResult = document.querySelector("#list-apparatus-result")
const utensilsResult = document.querySelector("#list-utensils-result")

export const displayIngredients = (recipes, tagIngredients) => {
    ingredientsResult.innerHTML = ""
    recipes.forEach(recipe => {
        const ingredients = recipe.ingredients
        // je mets dans un nouveau tableau avec map tous les ingredients [Lait de coco, Jus de citron, etc]
        let ingredientsArray = ingredients.map(ings => ings.ingredient)
        let filteredIngredientsArray = [...new Set(ingredientsArray)]
        console.log(filteredIngredientsArray)
        // je filtre pour enlever ceux que j'ai dans mes tags
        ingredientsArray = ingredientsArray.filter(ingredient => !tagIngredients.includes(ingredient)).sort()
        // const filteredIngredientsArray = ingredientsArray.filter((ele,pos) => ingredientsArray.indexOf(ele) == pos)
        //console.log(filteredIngredientsArray)
        ingredientsArray.forEach(ingredient => {
            ingredientsResult.insertAdjacentHTML("beforeend",
                `<p class="item-list">${ingredient}</p>`)
        })
    })
}

export const displayApparatus = (recipes) => {
    apparatusResult.innerHTML = ""
    recipes.filter(recipe => {
        const apparatus = recipe.appliance
        // le résultat n'est pas un tableau donc je le transforme en tableau pour pouvoir le parcourir
        let apparatusArray = []
        apparatusArray.push(apparatus)
        // console.log(apparatusArray)
        // const filteredApparatusArray = apparatusArray.filter((item, index) => apparatusArray.indexOf(item) !== index)
        // console.log(filteredApparatusArray)
        apparatusArray.forEach(apparatus => {
            apparatusResult.insertAdjacentHTML("beforeend",
            `<p class="item-list">${apparatus}</p>`)
        })
    })
}

export const displayUtensils = (recipes) => {
    utensilsResult.innerHTML = ""
    recipes.filter(recipe => {
        const utensils = recipe.ustensils
        //console.log(utensils)
        // utensils.forEach(utensil => {
        //     utensilsResult.insertAdjacentElement("beforeend", 
        //     `<p class="item-list">${utensil}</p>`)
        // })
    })
}

