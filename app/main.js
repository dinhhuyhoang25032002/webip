var adminAPI = "http://localhost:3000/admins";
// var userAPI ="http://localhost:3000/users"
async function logJSONData() {
  const response = await fetch(adminAPI);
  const jsonData = await response.json();
  return jsonData;
}

var loginButton = document.querySelector("#submit");
const msg = document.querySelector(".msg");
const checkBoxRemember = document.querySelector('input[name="remember"]');

checkBoxRemember.addEventListener("change", (e) => {
  if (e.target.checked) {
    localStorage.setItem("isRemember", true);
  } else {
    localStorage.setItem("isRemember", false);
  }
});

loginButton.addEventListener("click", async () => {
  const userName = document.querySelector('input[name="userName"]').value;
  const passWord = document.querySelector('input[name="passWord"]').value;
  var formAdminData = {
    userName: userName,
    passWord: passWord,
  };
  console.log(formAdminData);
  logJSONData().then((res) => {
    const account = res.find(
      (value) => value.userName === formAdminData.userName
    );
    console.log(account);
    if (account !== undefined) {
      if (account.passWord === formAdminData.passWord) {
        if (checkBoxRemember.checked) {
          localStorage.setItem("username", formAdminData.userName);
          localStorage.setItem("password", formAdminData.passWord);
        }
        window.location.href = "index.html";
      } else {
        msg.innerHTML = "Wrong password";
      }
    } else {
      msg.innerHTML = "Account not exist";
    }
  });
});


var RegisterButton = document.querySelector("#signup");
RegisterButton.onclick = function () {
  window.location.href = "register.html";
}



// async function logJSONData() {
//   const response = await fetch(userAPI);
//   const jsonData = await response.json();
//   return jsonData;
// }


function signup() {
  handleCreateUser();
}

function handleCreateUser() {
  var registerButton = document.querySelector("#register1");
  registerButton.onclick = function () {
    var userName = document.querySelector('input[name="userName"]').value;
    var passWord = document.querySelector('input[name="passWord"]').value;

    var formUserData = {
      userName: userName,
      passWord: passWord,
    };

    RegisterUser(formUserData, function () {
      alert("Đăng kí thành công!");
      window.location.href = "login.html";
    });
  }
}

function RegisterUser(data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(userAPI, options)
    .then(function (response) {
      return response.json();
    })
   
}