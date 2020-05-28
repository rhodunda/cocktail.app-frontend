function renderIngredients(cocktail, container) {
  clearContainerContents(container);

  const ingredientsList = document.createElement('ul');
  ingredientsList.id = 'ingredients-list'

  for (let i = 0; i < cocktail.ingredients.length; i++) {
    const ingredientListItem = document.createElement('li');
    const measure = cocktail.cocktailIngredients[i].measure;
    const name = cocktail.ingredients[i].name;
    ingredientListItem.innerText = `${measure} ${name}`;

    if (parseInt(localStorage.getItem('user_id')) === cocktail.creator_id) {
      const ingredientDeleteButton = document.createElement('button');
      ingredientDeleteButton.classList.add('delete-button');
      ingredientDeleteButton.innerText = 'Delete Ingredient';
      ingredientDeleteButton.addEventListener('click', (e) => deleteCocktailIngredient(e, cocktail.cocktailIngredients[i]))

      ingredientListItem.appendChild(ingredientDeleteButton);
    }

    ingredientsList.appendChild(ingredientListItem);
  }

  container.appendChild(ingredientsList);

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
    const ingredientsList = document.querySelector('#ingredients-list');

    const ingredientListItem = document.createElement('li');
    ingredientListItem.innerText = `${data.cocktailIngredient.measure} ${data.ingredient.name}`

    const ingredientDeleteButton = document.createElement('button');
    ingredientDeleteButton.classList.add('delete-button');
    ingredientDeleteButton.innerText = 'Delete Ingredient';
    ingredientDeleteButton.addEventListener('click', (e) => deleteCocktailIngredient(e, data.cocktailIngredient))

    ingredientListItem.appendChild(ingredientDeleteButton);

    ingredientsList.appendChild(ingredientListItem);
  }
}

function deleteCocktailIngredient(e, cocktailIngredient) {
  const fetchObj = {
    method: 'DELETE'
  };

  fetch(`${BASE_URL}/cocktail_ingredients/${cocktailIngredient.id}`, fetchObj)
    .then(response => response.json())
    .then(confirmation => confirmation ? e.target.parentElement.remove() : alert('Failed to delete ingredient'));
}