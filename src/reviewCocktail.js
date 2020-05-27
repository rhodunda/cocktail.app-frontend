function renderReviews(container, cocktail) {
  clearContainerContents(container);

  cocktail.reviews.forEach(review => {
    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        review: review
      })
    }

    fetch(`${BASE_URL}/reviews/${review.id}/get-user-email`, fetchObj)
      .then(response => response.json())
      .then(user => {

        const reviewDiv = document.createElement('div');

        const reviewUser = document.createElement('h3');
        reviewUser.innerText = `User: ${user.email}`;

        const reviewRating = document.createElement('h3');
        reviewRating.innerText = `Rating: ${review.rating}`;

        const reviewContent = document.createElement('p');
        reviewContent.innerText = review.content;

        const reviewBreak = document.createElement('br');

        reviewDiv.append(reviewUser, reviewRating, reviewContent, reviewBreak);
        container.appendChild(reviewDiv);
      })
  })
}

function saveReview(e, cocktail) {
  e.preventDefault();

  const user_id = localStorage.getItem('user_id');

  if (!user_id) {
    alert('You cannot review a cocktail if you are not logged in');
    return;
  }

  const review = {
    rating: e.target.reviewRating.value,
    content: e.target.reviewContent.value
  }

  const fetchObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: user_id,
      cocktail: cocktail,
      review: review
    })
  }

  e.target.reset();

  fetch(`${BASE_URL}/reviews`, fetchObj)
    .then(response => response.json())
    .then(cocktail => displayCocktailShowPage(cocktail));
}