var objectAPI = "http://localhost:3000/objects";

function start() {
  getObjects(function (objects) {
    renderObjects(objects);
    createChart(objects);
  });
  handleCreateForm();
  handleUpdateForm();

}

start();

function getObjects(callback) {
  fetch(objectAPI)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}



function renderObjects(objects) {
  var listObjectsblock = document.querySelector("#list-objects");
  var htmls = objects.map(function (object) {
    return `
            <li class="object-item-${object.id}">  
            <h4 class = "index"> ${object.id}.  ${object.StageName}</h4> 
            <img  class = "photo" src ="${object.img}" alt="avatar" > </img>
            <div class="apex">
            <p class = "information"> Họ và tên: ${object.FullName}</p>
            <p class = "information"> Tuổi: ${object.Age}</p>
            <p class = "information"> Giới tính: ${object.Gender}</p>
            <p class = "information"> Nơi sinh: ${object.PlaceOfOrigin}</p>
            </div>
            <div class ="bpex">
              <button class="button"> <a href="#edit" onclick="handleEditObject(${object.id})">Sửa</a> </button>
              <button  class="button" onclick="handleDeleteObject(${object.id})">Xóa</button>
            </div>
            </li>
    `;
  });
  listObjectsblock.innerHTML = htmls.join("");
}
function createTable(objects)
{
  var tableObjectsblock = document.querySelector("#table");
  var htmls = objects.map(function (object) {
    return `
    <li class="object-item-${object.id}">  
            <h4 class = "index"> ${object.id}.  ${object.StageName}</h4> 
            <img  class = "photo" src ="${object.img}" alt="avatar" > </img>
            <div class="apex">
            <p class = "information"> Họ và tên: ${object.FullName}</p>
            <p class = "information"> Tuổi: ${object.Age}</p>
            <p class = "information"> Giới tính: ${object.Gender}</p>
            <p class = "information"> Nơi sinh: ${object.PlaceOfOrigin}</p>
            </li>
    `
  }

);tableObjectsblock.innerHTML = htmls.join("");
}

function handleDeleteObject(id) {
  var options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(objectAPI + "/" + id, options)
    .then(function (response) {
      response.json();
    })
    .then(function () {
      var objectIteam = document.querySelector(".object-item-" + id);
      if (objectIteam) {
        objectIteam.remove();
      }
    });
}

function handleUpdateForm() {
  var updateButton = document.querySelector("#update");
  updateButton.addEventListener("click", function () {
    var id = document.querySelector('input[name="id"]').value;
    var FullName = document.querySelector('input[name="FullName"]').value;
    var StageName = document.querySelector('input[name="StageName"]').value;
    var Age = document.querySelector('input[name="Age"]').value;
    var Gender = document.querySelector('input[name="Gender"]').value;
    var PlaceOfOrigin = document.querySelector('input[name="PlaceOfOrigin"]').value;
    var img = document.querySelector('input[name="img"]').value;

    var formData = {
      FullName: FullName,
      StageName: StageName,
      Age: Age,
      Gender: Gender,
      PlaceOfOrigin: PlaceOfOrigin,
      img: img,
    };

    updateObject(id, formData, function () {
      getObjects(function (objects) {
        renderObjects(objects);
      });
      document.getElementById("create").style.display = "inline-block";
      document.getElementById("update").style.display = "none";
    });
  });
}

const getData = async (url) => {
  const response = await fetch(`${objectAPI}/${url}`);
  const data = await response.json();
  return data;
};

function createChart(data) {
  const labels = data.map(function (object) {
    return object.StageName;
  });

  const performancesPerMonth = data.map(function (object) {
    return object.performancespermonth;
  });

  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Performances Per Month",
          data: performancesPerMonth,
          backgroundColor: "rgba(75, 192, 192, 0.2)", // Set your desired color
          borderColor: "rgba(75, 192, 192, 1)", // Set your desired color
          borderWidth: 1,
         // cursor: pointer
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}


function updateObject(id, data, callback) {
  var options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(objectAPI + "/" + id, options)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

const idEdit = document.querySelector('input[name="id"]');
const statgeNameEdit = document.querySelector('input[name="StageName"]');
const fullnameEdit = document.querySelector('input[name="FullName"]');
const ageEdit = document.querySelector('input[name="Age"]');
const genderEdit = document.querySelector('input[name="Gender"]');
const placeEdit = document.querySelector('input[name="PlaceOfOrigin"]');
const imgEdit = document.querySelector('input[name="img"]');

function handleEditObject(id, callback) {
  getData(id).then((response) => {
    console.log(response);
    idEdit.value = response.id;
    statgeNameEdit.value = response.StageName;
    fullnameEdit.value = response.FullName;
    ageEdit.value = response.Age;
    genderEdit.value = response.Gender;
    placeEdit.value = response.PlaceOfOrigin;
    imgEdit.value = response.img;
  });
  document.getElementById("create").style.display = "none"
  document.getElementById("update").style.display = "inline-block"

}

function EditObject() {
  getObjects(objectAPI)
}

function handleCreateForm() {
  var createButton = document.querySelector("#create");
  createButton.onclick = function () {
    var FullName = document.querySelector('input[name="FullName"]').value;
    var StageName = document.querySelector('input[name="StageName"]').value;
    var id = document.querySelector('input[name="id"]').value;
    var Age = document.querySelector('input[name="Age"]').value;
    var Gender = document.querySelector('input[name="Gender"]').value;
    var PlaceOfOrigin = document.querySelector('input[name="PlaceOfOrigin"]').value;
    var img = document.querySelector('input[name="img"]').value;

    var formData = {
      FullName: FullName,
      StageName: StageName,
      id: id,
      Age: Age,
      Gender: Gender,
      PlaceOfOrigin: PlaceOfOrigin,
      img: img,
    };

    CreateObject(formData, function () {
      getObjects(function (objects) {
        renderObjects(objects);
      });
    });
  };
}

function CreateObject(data, callback) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(objectAPI, options)
    .then(function (response) {
      response.json();
    })
    .then(callback);
}



var logoutButton = document.querySelector("#logout");
logoutButton.onclick = function () {
  window.location.href = "login.html";
}
