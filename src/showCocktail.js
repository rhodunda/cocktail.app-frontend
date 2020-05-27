function displayCocktailShowPage(e, cocktail) {
  const container = document.querySelector('#detail');
  clearContainerContents(container);

  // Name
  const cocktailHeader = document.createElement('h1');
  cocktailHeader.innerText = cocktail.name

  // Picture
  const cocktailImage = document.createElement('img');
  cocktailImage.src = cocktail.image;
  cocktailImage.classList.add('cocktail-image')

  // Ingredients
  const ingredientsHeader = document.createElement('h2');
  ingredientsHeader.innerText = 'Ingredients';

  const ingredientList = document.createElement('ul');
  for (let i = 0; i < cocktail.ingredients.length; i++) {
    const ingredientListItem = document.createElement('li');
    const measure = cocktail.cocktailIngredients[i].measure;
    const name = cocktail.ingredients[i].name;
    ingredientListItem.innerText = `${measure} ${name}`;
    ingredientList.appendChild(ingredientListItem);
  }

  // cocktail.ingredients.forEach(ingredient => {
  //   const ingredientListItem = document.createElement('li');
  //   ingredientListItem.innerText = ingredient.name;
  //   ingredientList.appendChild(ingredientListItem);
  // });

  // Favorite Button --- post fetch to fetches -> include cocktail information
  const favoriteButton = document.createElement('button');
  favoriteButton.innerText = 'Favorite';
  favoriteButton.addEventListener('click', (e) => favoriteCocktail(e, cocktail))
  colorIfFavorite(favoriteButton, cocktail);

  // Review section --- post review to reviews -> include cocktail information. After post, create new review section
  const reviewsHeader = document.createElement('h2');
  reviewsHeader.innerText = 'Reviews';

  const reviewForm = document.createElement('form');

  const reviewTextArea = document.createElement('textarea');
  reviewTextArea.placeholder = 'Write Review Here';

  const reviewSubmitButton = document.createElement('input');
  reviewSubmitButton.type = 'submit';

  reviewForm.append(reviewTextArea, reviewSubmitButton);

  // Append children to page
  container.append(cocktailHeader, cocktailImage, ingredientsHeader, ingredientList, favoriteButton, reviewsHeader, reviewForm);
}