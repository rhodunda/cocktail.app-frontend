function renderReviews(container, cocktail) {
  clearContainerContents(container);

  cocktail.reviews.forEach(review => {
    renderReview(container, review);
  })
}

function renderReview(container, review) {
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

      reviewDiv.append(reviewUser, reviewRating, reviewContent);

      if (parseInt(localStorage.getItem('user_id')) === user.id) {
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerText = 'Delete Review';
        deleteButton.addEventListener('click', (e) => deleteReview(e, review))

        reviewDiv.appendChild(deleteButton);
      }

      container.appendChild(reviewDiv);
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

  const reviewContainer = document.querySelector('#reviews-container')

  fetch(`${BASE_URL}/reviews`, fetchObj)
    .then(response => response.json())
    .then(data => {
      updateCocktailEventListeners(data.cocktail);
      renderReview(reviewContainer, data.review)
    });
}

function deleteReview(e, review) {
  const fetchObj = {
    method: 'DELETE'
  }

  fetch(`${BASE_URL}/reviews/${review.id}`, fetchObj)
    .then(response => response.json())
    .then(confirmation => confirmation ? e.target.parentElement.remove() : alert('Failed to delete review'));
}