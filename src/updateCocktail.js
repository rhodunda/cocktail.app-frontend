function setupUpdateCocktailForm(cocktail) {
  const updateCocktailModal = document.querySelector('#update-cocktail-modal');

  clearContainerContents(updateCocktailModal);

  const updateCocktailForm = document.createElement('form');
  updateCocktailForm.id = 'update-cocktail-form';
  updateCocktailForm.classList.add('modal-form');

  const updateCocktailHeader = document.createElement('h1');
  updateCocktailHeader.innerText = 'Update Cocktail';

  const updateCocktailNameLabel = document.createElement('label');
  updateCocktailNameLabel.innerText = 'Name';

  const updateCocktailNameInput = document.createElement('input')
  updateCocktailNameInput.type = 'text';
  updateCocktailNameInput.name = 'name';
  updateCocktailNameInput.value = cocktail.name;

  const updateCocktailImageLabel = document.createElement('label');
  updateCocktailImageLabel.innerText = 'Image';

  const updateCocktailImageInput = document.createElement('input')
  updateCocktailImageInput.type = 'text';
  updateCocktailImageInput.name = 'image';
  updateCocktailImageInput.value = cocktail.image;

  const updateCocktailInstructionsLabel = document.createElement('label');
  updateCocktailInstructionsLabel.innerText = 'Instructions';

  const updateCocktailInstructionsInput = document.createElement('input')
  updateCocktailInstructionsInput.type = 'text';
  updateCocktailInstructionsInput.name = 'instructions';
  updateCocktailInstructionsInput.value = cocktail.instructions;

  const updateCocktailSubmit = document.createElement('input');
  updateCocktailSubmit.type = 'submit';
  updateCocktailSubmit.value = 'Update Cocktail';

  updateCocktailForm.append(updateCocktailHeader, updateCocktailNameLabel, updateCocktailNameInput, updateCocktailImageLabel,
    updateCocktailImageInput, updateCocktailInstructionsLabel, updateCocktailInstructionsInput, updateCocktailSubmit);
  updateCocktailForm.addEventListener("submit", (e) => saveUpdatedCocktail(e, cocktail))

  updateCocktailModal.appendChild(updateCocktailForm);
}

function updateCocktail() {
  setupUpdateCocktailModal();
}

function setupUpdateCocktailModal() {
  const modal = document.querySelector('#update-cocktail-modal');
  modal.style.display = "block"

  modal.addEventListener("click", e => {
    if (e.target.dataset.action === "close") {
      modal.style.display = "none"
    }
  })
}

function saveUpdatedCocktail(e, cocktail) {
  const modal = document.querySelector('#update-cocktail-modal');
  modal.style.display = "none"

  e.preventDefault();

  const fetchObj = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cocktail_id: cocktail.id,
      name: e.target.name.value,
      image: e.target.image.value,
      instructions: e.target.instructions.value
    })
  }

  if (!e.target.name.value) {
    alert('You  must include a name for the cocktail')
    return;
  }

  e.target.reset();

  fetch(`${BASE_URL}/cocktails/${cocktail.id}`, fetchObj)
    .then(response => response.json())
    .then(cocktail => {
      renderUpdatedCocktail(cocktail)
    });
}

function renderUpdatedCocktail(cocktail) {
  setupUpdateCocktailForm(cocktail);

  if (cocktail.error) {
    alert(cocktail.error)
  } else {
    const cocktailHeader = document.querySelector('#cocktail-header');
    cocktailHeader.innerText = cocktail.name;

    const cocktailImage = document.querySelector('.cocktail-image');
    cocktailImage.src = cocktail.image;

    const cocktailInstructions = document.querySelector('#cocktail-instructions');
    cocktailInstructions.innerText = cocktail.instructions;
  }
}

function deleteCocktail(cocktail) {
  if (!confirm('Are you sure you want to delete this cocktail?')) {
    return;
  }

  const fetchObj = {
    method: 'DELETE'
  }

  fetch(`${BASE_URL}/cocktails/${cocktail.id}`, fetchObj)
    .then(response => response.json())
    .then(confirmation => confirmation ? clearContainerContents(document.querySelector('#detail')) : alert('Failed to delete cocktail'))
}