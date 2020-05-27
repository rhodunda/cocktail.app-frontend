function displayCocktailShowPage(cocktail) {
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

  // Favorite Button --- post fetch to fetches -> include cocktail information
  const favoriteButton = document.createElement('button');
  favoriteButton.innerText = 'Favorite';
  favoriteButton.addEventListener('click', (e) => favoriteCocktail(e, cocktail))
  colorIfFavorite(favoriteButton, cocktail);

  // Review section --- post review to reviews -> include cocktail information. After post, create new review section
  const reviewsHeader = document.createElement('h2');
  reviewsHeader.innerText = 'Reviews';

  const reviewsContainer = document.createElement('div');
  reviewsContainer.id = 'reviews-container';

  renderReviews(reviewsContainer, cocktail);

  const reviewForm = document.createElement('form');

  const reviewRatingSpan = document.createElement('span');
  reviewRatingSpan.innerText = 'Rating: ';

  const reviewRatingSelect = document.createElement('select');
  reviewRatingSelect.name = 'reviewRating';
  for (let i = 0; i <= 10; i++) {
    const reviewRatingOption = document.createElement('option');
    reviewRatingOption.value = i;
    reviewRatingOption.innerText = i;
    reviewRatingSelect.appendChild(reviewRatingOption);
  }
  reviewRatingSpan.appendChild(reviewRatingSelect);

  const reviewTextArea = document.createElement('textarea');
  reviewTextArea.name = 'reviewContent';
  reviewTextArea.placeholder = 'Write Review Here';

  const reviewSubmitButton = document.createElement('input');
  reviewSubmitButton.type = 'submit';

  reviewForm.append(reviewRatingSpan, reviewTextArea, reviewSubmitButton);
  reviewForm.addEventListener('submit', (e) => saveReview(e, cocktail));

  // Append children to page
  container.append(cocktailHeader, cocktailImage, ingredientsHeader, ingredientList, favoriteButton, reviewsHeader, reviewsContainer, reviewForm);
}