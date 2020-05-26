function login() {
    loginListener()
    logout()
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
    loginSubmit.value = 'login'
    loginSubmit.innerText = "Login"
    loginForm.appendChild(loginSubmit)


    loginForm.addEventListener('submit', function (e) {
        e.preventDefault()

        let loginInfo = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        loginFetch(loginInfo)
    })
}

function loginFetch(loginInfo) {
    fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
    })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            sessionStorage.setItem("user_id", `${data.id}`)
        })
}


function logout() {
    let logoutBtn = document.querySelector("#logout")
    logoutBtn.addEventListener("click", function () {
        createLogOut()
    })
}

function createLogOut() {
    let detailsDiv = document.querySelector("#detail")
    detailsDiv.innerHTML = ''

    let logoutMessage = document.createElement("h2")
    logoutMessage.innerText = 'See you next time!!'
    detailsDiv.appendChild(logoutMessage)

    let finalLogoutBtn = document.createElement('button')
    finalLogoutBtn.style.color = 'red'
    finalLogoutBtn.innerText = 'Logout'
    detailsDiv.appendChild(finalLogoutBtn)

    finalLogoutBtn.addEventListener('click', function () {
        sessionStorage.removeItem('user_id')
        window.alert("Logout")
    })
}


