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
import {
    toggleListResult
} from "./functions/openList.js"

// DOM
const $searchInput = document.querySelector("#search-input")
const $searchResult = document.querySelector("#search-result")
const $searchIngredients = document.querySelector("#search-ingredients")
const $searchApparatus = document.querySelector("#search-apparatus")
const $searchUtensils = document.querySelector("#search-utensils")
const $tags = document.querySelector("#tags")
const $listResult = document.querySelectorAll(".list-result")

// CLASS
const filter = new Filter(recipes);

// ARRAY
let tagList = []

/**
 * Affichage des recettes 
 */
const displayRecipes = (recipes) => {
    recipes?.forEach(recipe => {
        displayRecipe(recipe)
    })
}

/**
 * Search bar
 */
$searchInput.addEventListener("keyup", () => {
    $searchResult.innerHTML = "" // évite les doublons et vide à chaque recherche
    filterTagSearch()
})

/**
 * Gestion des tags
 */
const eventTag = () => {
    $listResult.forEach(list => {
        list.querySelectorAll(".item-list").forEach(itemList => {
            itemList.addEventListener("click", (e) => {
                const tag = { // objet tag avec une value et un type
                    value: e.target.textContent, // la valeur sur laquelle je clique dans ma liste
                    type: e.target.closest(".list-result").dataset.type // je vais chercher data-type de mon html(ingredients, apparatus ou utensils)
                }
                tagList.push(tag) // je mets dans mon tableau tous ce que je click
                $tags.innerHTML += `
                    <button class="tag tag-${tag.type}">${tag.value}<i class="fa-solid fa-xmark close-tag" data-value="${tag.value}"></i></button>
                `
                const tagResult = filter.byTag(tag) // je trie avec ma class Filter
                $searchResult.innerHTML = "" // je vide les résultas qui ne correspondent pas

                displayRecipes(tagResult)
                displayIngredients(tagResult, tagList.filter(tag => tag.type == "ingredients").map(tag => tag.value))
                displayApparatus(tagResult, tagList.filter(tag => tag.type == "apparatus").map(tag => tag.value))
                displayUtensils(tagResult, tagList.filter(tag => tag.type == "utensils").map(tag => tag.value))
                eventTag()
                removeTag()
            })
        })

    })
}

/**
 * Suppression tag
 */
 const removeTag = () => {
    document.querySelectorAll(".close-tag").forEach(tag => {
        tag.addEventListener("click", (e) => {
            e.target.closest(".tag").remove()
            tagList = tagList.filter(tag => tag.value != e.target.dataset.value)
            $searchResult.innerHTML = ""
            filterTagSearch()
        })
    })
}

/**
 * Filtre par la barre de recherche et les tags (ensemble)
 */
const filterTagSearch = () => {
    filter.recipes = recipes // reinitialise avec toutes les recettes
    let result = filter.recipes
    let input = document.querySelector("#search-input").value // la valeur de ce que je tappe dans mon input
    if (input.length >= 3) {
        result = filter.bySearchBar(input)
    }
    tagList.forEach(tag => {
        result = filter.byTag(tag)
    })
    displayRecipes(result)
    displayIngredients(result, tagList.filter(tag => tag.type == "ingredients").map(tag => tag.value))
    displayApparatus(result, tagList.filter(tag => tag.type == "apparatus").map(tag => tag.value))
    displayUtensils(result, tagList.filter(tag => tag.type == "utensils").map(tag => tag.value))
    eventTag()
}

$searchIngredients.addEventListener("keyup", () => {
    displayIngredients(recipes, tagList)
    eventTag()

})

$searchApparatus.addEventListener("keyup", () => {
    displayApparatus(recipes, tagList)
    eventTag()

})

$searchUtensils.addEventListener("keyup", () => {
    displayUtensils(recipes, tagList)
})

/**
 * Initialisation 
 */
displayRecipes(recipes)
displayIngredients(recipes, [])
displayApparatus(recipes, [])
displayUtensils(recipes, [])
toggleListResult()
eventTag()

