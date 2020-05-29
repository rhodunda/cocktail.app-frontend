function renderIngredients(cocktail, container) {
  clearContainerContents(container);

  const ingredientTable = document.createElement('table');
  ingredientTable.id = 'ingredient-table'

  const ingredientTableBody = document.createElement('tbody');
  ingredientTableBody.id = 'ingredients-table-body'

  for (let i = 0; i < cocktail.ingredients.length; i++) {
    const ingredientTableRow = document.createElement('tr');

    const ingredientInfoTd = document.createElement('td');
    const measure = cocktail.cocktailIngredients.find(ci => ci.ingredient_id === cocktail.ingredients[i].id).measure;
    const name = cocktail.ingredients[i].name;
    ingredientInfoTd.innerText = `${measure} ${name}`;
    ingredientTableRow.appendChild(ingredientInfoTd);

    if (parseInt(localStorage.getItem('user_id')) === cocktail.creator_id) {
      const ingredientDeleteTd = document.createElement('td');

      const ingredientDeleteButton = document.createElement('button');
      ingredientDeleteButton.classList.add('delete-button');
      ingredientDeleteButton.innerText = 'Delete Ingredient';
      ingredientDeleteButton.addEventListener('click', (e) => deleteCocktailIngredient(e, cocktail.cocktailIngredients.find(ci => ci.ingredient_id === cocktail.ingredients[i].id)))

      ingredientDeleteTd.appendChild(ingredientDeleteButton);
      ingredientTableRow.appendChild(ingredientDeleteTd);
    }

    ingredientTableBody.appendChild(ingredientTableRow);
  }

  ingredientTable.appendChild(ingredientTableBody);
  container.appendChild(ingredientTable);

  if (parseInt(localStorage.getItem('user_id')) === cocktail.creator_id) {
    const addIngredientButton = document.createElement('button');
    addIngredientButton.id = 'add-ingredient-button';
    addIngredientButton.innerText = 'Add Ingredient';
    addIngredientButton.addEventListener('click', () => addIngredient(cocktail));
    container.appendChild(addIngredientButton);
  }

  return container;
}

function setupNewIngredientForm(cocktail) {
  const newIngredientModal = document.querySelector('#new-ingredient-modal');

  clearContainerContents(newIngredientModal);

  const newIngredientForm = document.createElement('form');
  newIngredientForm.id = 'new-ingredient-form';
  newIngredientForm.classList.add('modal-form');

  const newIngredientHeader = document.createElement('h1');
  newIngredientHeader.innerText = 'Add New Ingredient';

  const newIngredientNameLabel = document.createElement('label');
  newIngredientNameLabel.innerText = 'Name';

  const newIngredientNameInput = document.createElement('input')
  newIngredientNameInput.type = 'text';
  newIngredientNameInput.name = 'name';

  const newIngredientMeasureLabel = document.createElement('label');
  newIngredientMeasureLabel.innerText = 'Measure';

  const newIngredientMeasureInput = document.createElement('input')
  newIngredientMeasureInput.type = 'text';
  newIngredientMeasureInput.name = 'measure';

  const newIngredientSubmit = document.createElement('input');
  newIngredientSubmit.type = 'submit';
  newIngredientSubmit.value = 'Create Ingredient';

  newIngredientForm.append(newIngredientHeader, newIngredientNameLabel, newIngredientNameInput, newIngredientMeasureLabel, newIngredientMeasureInput, newIngredientSubmit);
  newIngredientForm.addEventListener("submit", (e) => saveIngredient(e, cocktail))

  newIngredientModal.appendChild(newIngredientForm);
}

function addIngredient() {
  setupIngredientModal();
}

function setupIngredientModal() {
  const modal = document.querySelector('#new-ingredient-modal');
  modal.style.display = "block"

  modal.addEventListener("click", e => {
    if (e.target.dataset.action === "close") {
      modal.style.display = "none"
    }
  })
}

function saveIngredient(e, cocktail) {
  const modal = document.querySelector('#new-ingredient-modal');
  modal.style.display = "none"

  e.preventDefault();

  const fetchObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: e.target.name.value,
      measure: e.target.measure.value
    })
  }

  if (!e.target.name.value) {
    alert('You  must include a name for the ingredient')
    return;
  }

  e.target.reset();

  fetch(`${BASE_URL}/cocktails/${cocktail.id}/add-ingredient`, fetchObj)
    .then(response => response.json())
    .then(data => renderNewIngredient(data));
}

function renderNewIngredient(data) {
  if (data.error) {
    alert(data.error)
  } else {
    const ingredientsTableBody = document.querySelector('#ingredients-table-body');

    const ingredientTableRow = document.createElement('tr');

    const ingredientInfoTd = document.createElement('td');
    ingredientInfoTd.innerText = `${data.cocktailIngredient.measure} ${data.ingredient.name}`

    const ingredientDeleteTd = document.createElement('td');

    const ingredientDeleteButton = document.createElement('button');
    ingredientDeleteButton.classList.add('delete-button');
    ingredientDeleteButton.innerText = 'Delete Ingredient';
    ingredientDeleteButton.addEventListener('click', (e) => deleteCocktailIngredient(e, data.cocktailIngredient))

    ingredientDeleteTd.appendChild(ingredientDeleteButton);
    ingredientTableRow.append(ingredientInfoTd, ingredientDeleteTd);

    ingredientsTableBody.appendChild(ingredientTableRow);
  }
}

function deleteCocktailIngredient(e, cocktailIngredient) {
  const fetchObj = {
    method: 'DELETE'
  };

  fetch(`${BASE_URL}/cocktail_ingredients/${cocktailIngredient.id}`, fetchObj)
    .then(response => response.json())
    .then(confirmation => confirmation ? e.target.parentElement.parentElement.remove() : alert('Failed to delete ingredient'));
}