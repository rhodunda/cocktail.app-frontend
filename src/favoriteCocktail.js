function colorIfFavorite(button, cocktail) {
  fetchObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: localStorage.getItem('user_id'),
      cocktail_id: cocktail.id
    })
  }

  fetch(`${BASE_URL}/cocktails/is-favorite`, fetchObj)
    .then(response => response.json())
    .then(isFavorite => {
      if (isFavorite) {
        button.classList.add('is-favorite');
        button.classList.remove('is-not-favorite');
      } else {
        button.classList.add('is-not-favorite');
        button.classList.remove('is-favorite');
      }
    });
}

function favoriteCocktail(e, cocktail) {
  const user_id = localStorage.getItem('user_id');

  if (!user_id) {
    alert('You cannot favorite a cocktail if you are not logged in');
    return;
  }

  fetchObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: user_id,
      cocktail: cocktail
    })
  }

  fetch(`${BASE_URL}/favorites`, fetchObj)
    .then(response => response.json())
    .then(cocktail => {
      updateCocktailEventListeners(cocktail);
      const favoriteButton = document.querySelector('#favorite-button')
      colorIfFavorite(favoriteButton, cocktail);
    })
}