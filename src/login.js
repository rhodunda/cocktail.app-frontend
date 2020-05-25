function login() {
    loginListener()
}

function loginListener() {
    let loginBtn = document.querySelector("#login")
    loginBtn.addEventListener('click', function () {
        creatingLogin()
    })
}

function creatingLogin() {
    // clearing detail div
    let detailsDiv = document.querySelector("#detail")
    detailsDiv.innerHTML = ''


    let loginH3 = document.createElement('h3')
    loginH3.innerText = "Please Login"
    detailsDiv.appendChild(loginH3)

    let loginForm = document.createElement("form")
    loginForm.id = "login-form"
    detailsDiv.appendChild(loginForm)

    let loginInput1 = document.createElement('input')
    loginInput1.type = 'text'
    loginInput1.placeholder = 'email'
    loginInput1.name = 'email'
    loginInput1.autocomplete = 'off'
    loginForm.appendChild(loginInput1)

    let loginInput2 = document.createElement('input')
    loginInput2.type = 'password'
    loginInput2.placeholder = 'password'
    loginInput2.name = 'password'
    loginInput2.autocomplete = 'off'
    loginForm.appendChild(loginInput2)

    let loginSubmit = document.createElement('input')
    loginSubmit.type = "submit"
    loginSubmit.value = 'sign up'
    loginSubmit.innerText = "Submit"
    loginForm.appendChild(loginSubmit)

    loginForm.addEventListener('submit', function (e) {

    })
}

