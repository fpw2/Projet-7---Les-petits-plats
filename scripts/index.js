import { recipes } from "../data/recipes.js"
import { Filter } from "./class/Filter.js"
import { displayRecipe } from "./display/searchBar.js"
import { displayIngredients } from "./display/searchByType.js"
import { displayApparatus } from "./display/searchByType.js"
import { displayUtensils } from "./display/searchByType.js"

// DOM
const searchInput = document.querySelector("#search-input")
const searchResult = document.querySelector("#search-result")
const searchIngredients = document.querySelector("#search-ingredients")
const searchApparatus = document.querySelector("#search-apparatus")
const searchUtensils = document.querySelector("#search-utensils")
const chevrons =  document.querySelectorAll(".chevron")
const tags = document.querySelector("#tags")
const listResult = document.querySelectorAll(".list-result")

// CLASS
const filter = new Filter(recipes);

// ARRAY
let tagList = []

/**
 * Affichage des recettes au chargement
 */ 
recipes.forEach(recipe => {
    displayRecipe(recipe)
})

/**
 * Search bar
 */
searchInput.addEventListener("keyup", e => {
    currentResult = filter.bySearchBar(e.target.value)
    //console.log(filterResult)
    searchResult.innerHTML = "" // évite les doublons 
    // pour chaque resultat j'affiche mon modele de card recipe
    currentResult.forEach(recipe => {
        displayRecipe(recipe)
    })
})

/**
 * Gestion des chevrons updown
 */
const lists = document.querySelectorAll(".content-input")
lists.forEach(list => {
    list.addEventListener("click", e => {
        console.log(e.currentTarget)
        displayIngredients(recipes, [])
        e.currentTarget.classList.toggle("list-open")
        // chevrons.classList.toggle("list-open")
    })
})

/**
 * Initialisation liste
 */
displayApparatus(recipes)
displayUtensils(recipes)

/**
 * Gestion des tags
 */
listResult.forEach(list => {
    list.addEventListener("click", (e) => {
        console.log(e.target)
        // objet tag avec une value et un type
        const tag = {
            value : e.target.textContent, // la valeur sur laquelle je clique dans ma liste
            type : e.target.closest(".list-result").dataset.type // je vais chercher data-type de mon html(ingredients, apparatus ou utensils)
        }
        tagList.push(tag) // je mets dans mon tableau tous ce que je click
        tags.innerHTML += `<button class="tag tag-${tag.type}">${tag.value}</button>` 
        const result = filter.byTag(tag) // je trie avec ma class Filter
        searchResult.innerHTML = ""  // je supprime les résultas qui ne correspondent pas
        result.forEach(recipe => {
            displayRecipe(recipe)
        })
        displayIngredients(result, tagList.filter(totem => totem.type == "ingredients").map(totem => totem.value))
        //displayApparatus(result, tagList.filter(totem => totem.type == "apparatus").map(totem => totem.value))
        
    })
})


// chevronIngredients.addEventListener("click", () => {
//     recipes.forEach(recipe => {
//         //displayIngredients(recipe).classList.toggle("show-list")
//         displayIngredients(recipe)
//     })
// })

