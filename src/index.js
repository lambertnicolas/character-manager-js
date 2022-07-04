const charachterList = document.querySelector("#characterlist");
const addCharachter = document.querySelector("#addcharacter");
const modifyCharachter = document.querySelector("#modifycharacter");
const viewMore = document.querySelector("#viewmore");
const searchPage = document.querySelector("#search");

//Fonctions :

//Fonction listDisplay :
const listDisplay = (table) => {
  table.forEach((element, index) => {
    let newLi = document.createElement("li");
    if (index % 2 == 0) {
      newLi.classList.add("lipair");
    } else {
      newLi.classList.add("liimpair");
    }
    newLi.innerHTML = `<div><h3>${
      element.name
    }</h3><img src="data:image/png;base64,${
      element.image
    }"><p>${element.shortDescription.substring(
      0,
      56
    )}</p><a href="index.html?id=${element.id}">View more</a></div>`;
    charachterList.appendChild(newLi);
  });
};

//Fonction characterDisplay :
const characterDisplay = (arr) => {
  //Vérfier si un id existe dans l'url
  let str = window.location.href;
  let url = new URL(str);
  let id = url.searchParams.get("id");
  if (id !== null) {
    arr.forEach((element) => {
      if (element.id === id) {
        charachterList.style.display = "none";
        addCharachter.style.display = "none";
        const viewmore = document.querySelector("#viewmore");
        viewmore.style.display = "revert";
        let newLi = document.createElement("li");
        newLi.innerHTML = `<div id="chardisplay"><h2>${element.name}</h2><img src="data:image/png;base64,${element.image}"><p>${element.shortDescription}</p><p>${element.description}</p></div>`;
        viewmore.appendChild(newLi);
      }
    });
  }
};

//AFFICHAGE
const axios = require("axios");
axios
  .get("https://character-database.becode.xyz/characters/")
  .then(function (response) {
    // en cas de réussite de la requête
    const array = Object.values(response.data);
    characterDisplay(array);
    listDisplay(array);
    ///////////////////
    //Fonction Search//
    ///////////////////
    const submit = document.querySelector("#submit");
    submit.addEventListener("click", () => {
      //Masquer la liste des characters
      charachterList.style.display = "none";
      addCharachter.style.display = "none";
      viewMore.style.display = "none";
      modifyCharachter.style.display = "none";
      searchPage.style.display = "revert";
      //Récupérer la valeur de l'input
      const search = document.querySelector("#input").value;

      array.forEach((element) => {
        console.log(element.name);
        if (element.name === search) {
          const newDiv = document.createElement("div");
          newDiv.innerHTML = `<div id="chardisplay"><h2>${element.name}</h2><img src="data:image/png;base64,${element.image}"><p>${element.shortDescription}</p><p>${element.description}</p></div>`;
          searchPage.appendChild(newDiv);
        }
      });
    });

    //Executer openWeather quand on tape sur la touche entrée
    const keyPress = () => {
      input.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          submit.click();
        }
      });
    };
    keyPress();
    //Modifier un character////////////////////////
    //Affichage de la section de modification de perso
    const modifyButton = document.getElementById("modify");
    modifyButton.addEventListener("click", () => {
      charachterList.style.display = "none";
      addCharachter.style.display = "none";
      viewMore.style.display = "none";
      searchPage.style.display = "none";
      modifyCharachter.style.display = "revert";
      let str = window.location.href;
      let url = new URL(str);
      let id = url.searchParams.get("id");
      const inputModify = document.getElementById("namemodify");
      const shortDescModify = document.getElementById("shortdescmodify");
      const descriptionModify = document.getElementById("descriptionmodify");
      const pictureModify = document.getElementById("picturemodify");
      let pictureUpdated = "";
      array.forEach((element) => {
        if (element.id === id) {
          inputModify.value = element.name;
          shortDescModify.value = element.shortDescription;
          descriptionModify.value = element.description;
          pictureUpdated = element.picture;
        }
      });
      const modifyButton = document.getElementById("modifybutton");
      modifyButton.addEventListener("click", () => {
        var base64String = "";
        let name = document.querySelector("#namemodify").value;
        const shortDesc = document.querySelector("#shortdescmodify").value;
        const description = document.querySelector("#descriptionmodify").value;
        var file = document.querySelector("#picturemodify")["files"][0];
        var reader = new FileReader();
        reader.onload = function () {
          base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
          imageBase64Stringsep = base64String;
          console.log(base64String, name, description, shortDesc);
          if (base64String === "") {
            base64String = pictureUpdated;
            console.log(pictureUpdated);
          }
          let url = `https://character-database.becode.xyz/characters/${id}`;
          axios
            .put(url, {
              description: description,
              name: name,
              shortDescription: shortDesc,
              description: description,
              image: base64String,
            })
            .then(function (response) {
              console.log(response);
              location.reload();
            })
            .catch(function (error) {
              console.log(error);
            });
        };
        reader.readAsDataURL(file);
      });
    });
  })
  .catch(function (error) {
    // en cas d’échec de la requête
    console.log(error);
  })
  .then(function () {
    // dans tous les cas
  });

//Ajouter un character////////////////////////
//Affichage de la section de création de perso
elem.onclick = () => {
  elem.style.visibility = "hidden";
  charachterList.style.display = "none";
  viewMore.style.display = "none";
  modifyCharachter.style.display = "none";
  addCharachter.style.display = "revert";
  searchPage.style.display = "none";
};

//Récupérer les données du form et les ajouter à l'API:
let addButton = document.querySelector("#addbutton");

addButton.addEventListener("click", () => {
  const modalAdd = document.querySelector(".modaladd");
  const addedBox = document.querySelector(".modal-add");
  modalAdd.classList.toggle("active");
  addedBox.style.opacity = 1;

  const delay = (seconds) =>
    new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  const wait = 3;
  const func = async () => {
    await delay(wait);
    location.reload();
  };
  func();

  var base64String = "";
  let name = document.querySelector("#name").value;
  const shortDesc = document.querySelector("#shortdesc").value;
  const description = document.querySelector("#description").value;
  var file = document.querySelector("#picture")["files"][0];
  var reader = new FileReader();
  reader.onload = function () {
    base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
    imageBase64Stringsep = base64String;
    console.log(base64String, name, description, shortDesc);
    axios
      .post("https://character-database.becode.xyz/characters/", {
        description: description,
        name: name,
        shortDescription: shortDesc,
        description: description,
        image: base64String,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(base64String, name, description, shortDesc);
  reader.readAsDataURL(file);
});

//Function Delete////////////:
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);

function toggleModal() {
  modalContainer.classList.toggle("active");
}

const deleteButton = document.querySelector(".yesdelete");
deleteButton.addEventListener("click", () => {
  let str = window.location.href;
  let url = new URL(str);
  let id = url.searchParams.get("id");
  axios({
    method: "delete",
    url: `https://character-database.becode.xyz/characters/${id}`,
  })
    .then((response) => {
      console.log(response);
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
});
