const modal = document.querySelector("#new-cocktail-modal")
document.querySelector("#make-cocktail-button").addEventListener("click", () => {
    modal.style.display = "block"
})
// Hide the form
modal.addEventListener("click", e => {
    if (e.target.dataset.action === "close") {
        modal.style.display = "none"
    }
})