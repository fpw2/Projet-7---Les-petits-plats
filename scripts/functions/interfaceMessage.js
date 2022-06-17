/**
 * Gestion affichage quand aucune recette
 */
const interfaceMessage = () => {
    const $searchResult = document.querySelector("#search-result")
    const result = document.createElement("p")
    result.classList.add("no-result")
    result.textContent = "Aucune recette ne correspond à votre recherche"
    $searchResult.appendChild(result)
    console.log("pas de recette")
}