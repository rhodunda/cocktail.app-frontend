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

    const cocktailsTable = buildCocktailsTable(cocktails);

    if (cocktailsTable) {
        container.appendChild(cocktailsTable);
    }
}

function buildCocktailsTable(cocktails) {
    if (cocktails.length <= 0) {
        return;
    }

    const table = document.createElement("table");
    const tHead = document.createElement("thead");
    const tHeadRow = document.createElement("tr");

    const tHeadName = document.createElement("th");
    tHeadName.innerText = "Name";

    const tHeadImage = document.createElement("th");
    tHeadImage.innerText = "Image";

    const tBody = document.createElement("tbody");

    cocktails.forEach((cocktail) => {
        const tDataRow = document.createElement("tr");

        const tDataName = document.createElement("td");

        const tDataAnchor = document.createElement('a')
        tDataAnchor.innerText = cocktail.name
        tDataAnchor.href = 'javascript:'

        tDataAnchor.addEventListener("click", function (e) {
            getShowInformation(cocktail)
        })

        const tDataImage = document.createElement("td");
        cocktailImage = document.createElement("img");
        cocktailImage.src = cocktail.image;
        cocktailImage.classList.add("table-image");

        tDataName.appendChild(tDataAnchor);
        tDataImage.appendChild(cocktailImage);
        tDataRow.append(tDataName, tDataImage);
        tBody.appendChild(tDataRow);
    });

    tHeadRow.append(tHeadName, tHeadImage);
    tHead.appendChild(tHeadRow);
    table.append(tHead, tBody);

    return table;
}

