function displayUserFavorites() {
  favoritesListener();
}

function favoritesListener() {
  let favoriteBtn = document.querySelector("#favorite-cocktail-button");
  favoriteBtn.addEventListener("click", function () {
    let detailsDiv = document.querySelector("#detail");
    detailsDiv.innerHTML = "";

    console.log("click");
    userFavoritesFetch();
  });
}

function userFavoritesFetch() {
  fetch(`http://localhost:3000/api/v1/user/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parseInt(localStorage.getItem("user_id"))),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      createCards(data);
    });
}

function createCards(data) {
  let detailsDiv = document.querySelector("#detail");

  let containerDiv = document.createElement("div");
  containerDiv.className = "container";
  detailsDiv.appendChild(containerDiv);

  let cardRow = document.createElement("div");
  cardRow.className = "row";
  containerDiv.appendChild(cardRow);

  data.forEach((cocktail) => {
    let cardCol = document.createElement("div");
    cardCol.className = "col-sm-4";
    cardRow.appendChild(cardCol);

    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.style = "width: 18rem; cursor: pointer";
    cardDiv.addEventListener("click", function () {
      cocktailShowPage(cocktail);
    });
    cardCol.appendChild(cardDiv);

    let userFavoritesImg = document.createElement("img");
    userFavoritesImg.src = cocktail.image;
    userFavoritesImg.className = "card-img-top";
    cardDiv.appendChild(userFavoritesImg);

    let userFavoritesDiv = document.createElement("div");
    userFavoritesDiv.className = "card-body";
    cardDiv.appendChild(userFavoritesDiv);

    let userFavoritesH5 = document.createElement("h5");
    userFavoritesH5.innerText = cocktail.name;
    userFavoritesH5.className = "card-title";
    userFavoritesDiv.appendChild(userFavoritesH5);

    let userFavoritesUl = document.createElement("ul");
    userFavoritesUl.className = "card-text";

    cocktail.ingredients.forEach((ingredient) => {
      let userFavoritesLi = document.createElement("li");
      userFavoritesLi.innerText = ingredient.name;
      userFavoritesUl.appendChild(userFavoritesLi);
    });

    userFavoritesDiv.appendChild(userFavoritesUl);
  });
}

function cocktailShowPage(cocktail) {
  getShowInformation(cocktail);
}
