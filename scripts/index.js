import {
    recipes
} from "../data/recipes.js"
import {
    Filter
} from "./class/Filter.js"
import {
    displayRecipe
} from "./display/searchBar.js"
import {
    displayIngredients
} from "./display/searchByType.js"
import {
    displayApparatus
} from "./display/searchByType.js"
import {
    displayUtensils
} from "./display/searchByType.js"

// DOM
const searchInput = document.querySelector("#search-input")
const searchResult = document.querySelector("#search-result")
const chevrons = document.querySelectorAll(".chevron")
const tags = document.querySelector("#tags")
const listResult = document.querySelectorAll(".list-result")

// CLASS
const filter = new Filter(recipes);

// ARRAY
let tagList = []

/**
 * Affichage des recettes 
 */
const displayRecipes = (recipes) => {
    recipes.forEach(recipe => {
        displayRecipe(recipe)
    })
}

/**
 * Search bar
 */
searchInput.addEventListener("input", (e) => {
    searchResult.innerHTML = "" // évite les doublons et vide à chaque recherche
    const input = e.target.value

    if (input.length > 2) {
        filterTagSearch()
    } else {
        filter.recipes = recipes
        displayRecipes(recipes)
    }
})

/**
 * Gestion des tags
 */
const tagEvent = () => {
    listResult.forEach(list => {
        list.querySelectorAll(".item-list").forEach(item => {
            item.addEventListener("click", (e) => {
                // objet tag avec une value et un type
                const tag = {
                    value: e.target.textContent, // la valeur sur laquelle je clique dans ma liste
                    type: e.target.closest(".list-result").dataset.type // je vais chercher data-type de mon html(ingredients, apparatus ou utensils)
                }
                tagList.push(tag) // je mets dans mon tableau tous ce que je click
                tags.innerHTML += `
            <button class="tag tag-${tag.type}">${tag.value}<i class="fa-solid fa-xmark close-tag" data-value="${tag.value}"></i></button>
            
            `
                const result = filter.byTag(tag) // je trie avec ma class Filter
                searchResult.innerHTML = "" // je supprime les résultas qui ne correspondent pas
                displayRecipes(result)
                displayIngredients(result, tagList.filter(tag => tag.type == "ingredients").map(tag => tag.value))
                displayApparatus(result, tagList.filter(tag => tag.type == "apparatus").map(tag => tag.value))
                displayUtensils(result, tagList.filter(tag => tag.type == "utensils").map(tag => tag.value))
                tagEvent()
                closeTag()
            })
        })

    })
}

const filterTagSearch = () => {
    let result = filter.bySearchBar(document.querySelector("#search-input").value)
    tagList.forEach(tag => {
        result = filter.byTag(tag)
    })

    displayRecipes(result)

    displayIngredients(result, tagList.filter(tag => tag.type == "ingredients").map(tag => tag.value))
    displayApparatus(result, tagList.filter(tag => tag.type == "apparatus").map(tag => tag.value))
    displayUtensils(result, tagList.filter(tag => tag.type == "utensils").map(tag => tag.value))
    tagEvent()
}


// chevronIngredients.addEventListener("click", () => {
//     recipes.forEach(recipe => {
//         //displayIngredients(recipe).classList.toggle("show-list")
//         displayIngredients(recipe)
//     })
// })

/**
 * Suppression tag
 */

const closeTag = () => {
        document.querySelectorAll(".tag .close-tag").forEach(tag => {

            tag.addEventListener("click", (e) => {
            
            e.target.closest(".tag").remove()
            tagList = tagList.filter(tag => tag.value != e.target.dataset.value)
            filter.recipes = recipes
            filterTagSearch()
            })
        })
}

/**
 * Gestion des chevrons updown
 */
//  const lists = document.querySelectorAll(".content-input")
//  lists.forEach(list => {
//      list.addEventListener("click", e => {
//          document.querySelector(".active")?.classList.remove("active")
//          e.currentTarget.classList.toggle("active")
//      })
//  })

/**
 * Initialisation 
 */
displayRecipes(recipes)
displayIngredients(recipes, [])
displayApparatus(recipes, [])
displayUtensils(recipes, [])
tagEvent()