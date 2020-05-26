const BASE_URL = 'http://localhost:3000/api/v1';
const COCKTAILS_LINK = BASE_URL + '/cocktails';
const COCKTAILS_FIRST_CHAR_ARR = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

document.addEventListener("DOMContentLoaded", function () {
    init()
})

function init() {
    signUp()
    login()
    displayCocktailSelector()
    // newCocktail()
}

function displayCocktailSelector() {
    const cocktailSelector = document.querySelector('#cocktails-selector');

    COCKTAILS_FIRST_CHAR_ARR.forEach(char => {
        cocktailAnchor = document.createElement('a');
        cocktailAnchor.textContent = ` ${char} `;
        cocktailAnchor.href = 'javascript:';
        cocktailAnchor.addEventListener('click', () => { fetchCocktails(char) });

        cocktailSelector.appendChild(cocktailAnchor);
    })
}

function fetchCocktails(char) {
    fetch(`http://localhost:3000/api/v1/cocktails?q=${char}`)
        .then(response => response.json())
        .then(cocktails => renderCocktailsTable(cocktails));
}

function clearContainerContents(container) {
    if (container) {
        while (container.lastChild) {
            container.lastChild.remove();
        }
    }
}

function renderCocktailsTable(cocktails) {
    const container = document.querySelector('#detail');

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

    const table = document.createElement('table');
    const tHead = document.createElement('thead');
    const tHeadRow = document.createElement('tr');

    const tHeadName = document.createElement('th');
    tHeadName.innerText = 'Name';

    const tHeadDescription = document.createElement('th');
    tHeadDescription.innerText = 'Description';

    const tHeadIngredients = document.createElement('th');
    tHeadIngredients.innerText = 'Ingredients';

    const tHeadImage = document.createElement('th');
    tHeadImage.innerText = 'Image';

    const tBody = document.createElement('tbody');

    cocktails.forEach(cocktail => {
        const tDataRow = document.createElement('tr');

        const tDataName = document.createElement('td');
        tDataName.innerText = cocktail.name;

        const tDataImage = document.createElement('td');
        cocktailImage = document.createElement('img');
        cocktailImage.src = cocktail.image;
        cocktailImage.classList.add('table-image');

        const tDataDescription = document.createElement('td');
        tDataDescription.innerText = 'Coming soon!';

        const tDataIngredients = document.createElement('td');
        tDataIngredients.innerText = 'Coming soon!'

        tDataImage.appendChild(cocktailImage);
        tDataRow.append(tDataName, tDataImage, tDataDescription, tDataIngredients);
        tBody.appendChild(tDataRow);
    });

    tHeadRow.append(tHeadName, tHeadImage, tHeadDescription, tHeadIngredients);
    tHead.appendChild(tHeadRow);
    table.append(tHead, tBody);

    return table;
}