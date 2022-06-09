export const toggleListResult = () => {
    const $listComboBox = document.querySelectorAll(".combo-box") // mon bloc qui contient bloc input et bloc list-result
    $listComboBox.forEach(comboBox => { // pour chaque bloc
        comboBox.addEventListener("click", (e) => { // à chaque clic
            if (e.currentTarget.classList.contains("open")) { // si l'élément ou je clic dans mon bloc à la class open
                e.currentTarget.classList.remove("open") // je ferme mon bloc list en cliquant sur mon item-list ou mon input
                e.currentTarget.querySelector("input").placeholder = e.currentTarget.querySelector("input").dataset.type // je remplace mon placeholder
            } else {
                $listComboBox.forEach(combo => { // je resélectionne tout en bouclant
                    combo.classList.remove("open") // j'enlève la class open 
                    combo.querySelector("input").placeholder = combo.querySelector("input").dataset.type
                })
                e.currentTarget.classList.add("open") // j'ajoute la class open au clic sur le bloc
                e.currentTarget.querySelector("input").placeholder = "Rechercher un " + e.currentTarget.querySelector("input").dataset.searchType
            }
        })
    })
}
// ma class open est relié aux classes list-result, chevron et input //