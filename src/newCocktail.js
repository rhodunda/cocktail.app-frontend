function newCocktail() {
  const newCocktailForm = document.querySelector("#new-cocktail-form");
  const modal = document.querySelector('#new-cocktail-modal');

  newCocktailForm.addEventListener("submit", function (e) {
    e.preventDefault();

    formSubmit = {
      name: e.target.name.value,
      image: e.target.image.value,
      instructions: e.target.instructions.value,
      creator_id: localStorage.getItem('user_id')
    };

    newCocktailFetch(formSubmit);
    newCocktailForm.reset();

    modal.style.display = "none"
  });
}

function newCocktailFetch(formSubmit) {
  const fetchObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formSubmit),
  }

  fetch("http://localhost:3000/api/v1/cocktails", fetchObj)
    .then((resp) => resp.json())
    .then(cocktail => createLoadShowPage(cocktail));
}

function createLoadShowPage(cocktail) {
  getShowInformation(cocktail)
}

