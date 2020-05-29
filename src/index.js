const BASE_URL = "http://localhost:3000/api/v1";
const COCKTAILS_LINK = BASE_URL + "/cocktails";
const COCKTAILS_FIRST_CHAR_ARR = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

document.addEventListener("DOMContentLoaded", function () {
  init();
});

function init() {
  signUp();
  login();
  setupSearchForm();
  displayCocktailSelector();
  newCocktail();
  displayUserFavorites();
  account();
}

function setupSearchForm() {
  const searchForm = document.querySelector("#cocktails-search-form");

  searchForm.addEventListener("submit", fetchCocktails);
}

function fetchCocktails(e) {
  e.preventDefault();
  searchValue = e.target
    .querySelector("#search-form-input")
    .value.toLowerCase();

  if (!searchValue) return;

  const fetchObj = {
    method: "POST",
  };

  if (e.target.querySelector("#search-option").value == "ingredient")
    searchUrl = "http://localhost:3000/api/v1/cocktails/search-by-ingredient";
  else searchUrl = "http://localhost:3000/api/v1/cocktails/search-by-name";

  fetch(`${searchUrl}?q=${searchValue}`, fetchObj)
    .then((response) => response.json())
    .then((cocktails) => renderCocktailsTable(cocktails));

  e.target.reset();
}

function displayCocktailSelector() {
  const cocktailSelector = document.querySelector("#cocktails-selector");

  COCKTAILS_FIRST_CHAR_ARR.forEach((char) => {
    cocktailAnchor = document.createElement("a");
    cocktailAnchor.textContent = ` ${char} `;
    cocktailAnchor.href = "javascript:";
    cocktailAnchor.addEventListener("click", () => {
      fetchCocktailsByChar(char);
    });

    cocktailSelector.appendChild(cocktailAnchor);
  });
}

function fetchCocktailsByChar(char) {
  const fetchObj = {
    method: "POST",
  };
  fetch(
    `http://localhost:3000/api/v1/cocktails/search-by-char?q=${char}`,
    fetchObj
  )
    .then((response) => response.json())
    .then((cocktails) => renderCocktailsTable(cocktails));
}

function clearContainerContents(container) {
  if (container) {
    while (container.lastChild) {
      container.lastChild.remove();
    }
  }
}

function renderCocktailsTable(cocktails) {
  const container = document.querySelector("#detail");

  clearContainerContents(container);

  const cocktailCards = buildCocktailsCards(cocktails);

  if (cocktailCards) {
    container.appendChild(cocktailCards);
  }
}

function buildCocktailsCards(cocktails) {
  if (cocktails.length <= 0) {
    alert(`Looks like there's no cocktails here`)
    return;
  }

  const cocktailCardsContainer = document.createElement("div");
  cocktailCardsContainer.classList.add("container");

  const cocktailCardsRow = document.createElement("div");
  cocktailCardsRow.classList.add("row");

  cocktails.forEach((cocktail) => {
    const cocktailCardColumn = document.createElement("div");
    cocktailCardColumn.className = "col-sm-4";

    const cocktailCardDiv = document.createElement("div");
    cocktailCardDiv.classList.add("card");
    cocktailCardDiv.style = "width: 15rem; cursor: pointer";
    cocktailCardDiv.addEventListener("click", () =>
      getShowInformation(cocktail)
    );

    const cocktailImage = document.createElement("img");
    cocktailImage.src = cocktail.image;
    cocktailImage.classList.add("card-img-top");

    const cocktailCardBody = document.createElement("div");
    cocktailCardBody.className = "card-body";

    const cocktailName = document.createElement("h5");
    cocktailName.innerText = cocktail.name;
    cocktailName.className = "card-title";

    cocktailCardBody.appendChild(cocktailName);
    cocktailCardDiv.appendChild(cocktailImage);
    cocktailCardDiv.appendChild(cocktailCardBody);
    cocktailCardColumn.appendChild(cocktailCardDiv);
    cocktailCardsRow.appendChild(cocktailCardColumn);
  });

  cocktailCardsContainer.appendChild(cocktailCardsRow);

  return cocktailCardsContainer;
}
