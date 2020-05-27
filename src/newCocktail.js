function newCocktail() {
  let newCocktailForm = document.querySelector("#new-cocktail-form");
  newCocktailForm.addEventListener("submit", function (e) {
    e.preventDefault();

    formSubmit = {
      name: e.target.name.value,
      image: e.target.image.value
    };

    newCocktailFetch(formSubmit);
    newCocktailForm.reset();
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
    .then((resp) => console.log(resp));
}

