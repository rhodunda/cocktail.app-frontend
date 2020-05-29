function account() {
  accountBtnListener();
}

function accountBtnListener() {
  let accountBtn = document.querySelector("#account");
  accountBtn.addEventListener("click", function () {
    creatingAccountInfo();
  });
}

function creatingAccountInfo() {
  let detailsDiv = document.querySelector("#detail");
  detailsDiv.innerHTML = "";

  let accountH1 = document.createElement("h1");
  accountH1.innerText = "Welcome to The Account Page";
  detailsDiv.appendChild(accountH1);

  let accountDeleteBtn = document.createElement("button");
  accountDeleteBtn.innerText = "DELETE ACCOUNT";
  detailsDiv.appendChild(accountDeleteBtn);
  accountDeleteBtn.addEventListener("click", function () {
    deleteFetch();
  });
}

function deleteFetch() {
  fetch(
    `http://localhost:3000/api/v1/users/${localStorage.getItem("user_id")}`,
    {
      method: "DELETE",
    }
  )
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
      localStorage.clear("user_id");
    });
}
