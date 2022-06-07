export const toggleListResult = () => {
    const listComboBox = document.querySelectorAll(".combo-box")
    listComboBox.forEach(comboBox => {
        comboBox.addEventListener("click", (e) => {
            if (e.currentTarget.classList.contains("open")) { // ne pas confondre avec e.current
                e.currentTarget.classList.remove("open")
                e.currentTarget.querySelector("input").placeholder = e.currentTarget.querySelector("input").dataset.type
            } else {
                listComboBox.forEach(combo => {
                    combo.classList.remove("open")
                    combo.querySelector("input").placeholder = combo.querySelector("input").dataset.type
                })
                e.currentTarget.classList.add("open")
                e.currentTarget.querySelector("input").placeholder = "Rechercher un " + e.currentTarget.querySelector("input").dataset.type.toLowerCase()
            }
        })
    })
}