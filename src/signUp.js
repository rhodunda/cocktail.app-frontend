function signUp() {
  signUpBtnListener();
}

function signUpBtnListener() {
  let signUpBtn = document.querySelector("#sign-up");
  signUpBtn.addEventListener("click", function (e) {
    createSignUpForm();
  });
}

function createSignUpForm() {
  // clearing detail div
  let detailsDiv = document.querySelector("#detail");
  detailsDiv.innerHTML = "";

  let signUpH3 = document.createElement("h3");
  signUpH3.innerText = "Sign-Up";
  detailsDiv.appendChild(signUpH3);

  let signUpForm = document.createElement("form");
  signUpForm.id = "new-signup-form";
  detailsDiv.appendChild(signUpForm);

  let signUpInput1 = document.createElement("input");
  signUpInput1.type = "text";
  signUpInput1.placeholder = "email";
  signUpInput1.name = "email";
  signUpInput1.autocomplete = "off";
  signUpForm.appendChild(signUpInput1);

  let signUpInput2 = document.createElement("input");
  signUpInput2.type = "text";
  signUpInput2.placeholder = "password";
  signUpInput2.name = "password";
  signUpInput2.autocomplete = "off";
  signUpForm.appendChild(signUpInput2);

  let signUpSubmit = document.createElement("input");
  signUpSubmit.type = "submit";
  signUpSubmit.value = "sign up";
  signUpSubmit.innerText = "Submit";
  signUpForm.appendChild(signUpSubmit);

  signUpForm.addEventListener("submit", function (e) {
    let newUser = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    creatingUser(newUser);
    signUpForm.reset();
  });
}

function creatingUser(newUser) {
  fetch("http://localhost:3000/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.setItem("user_id", `${data.id}`);
      window.alert("Welcome to Cocktail Picker");
    });
}
