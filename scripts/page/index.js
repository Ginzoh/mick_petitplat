let result = recipes;
let mytags = [];
let myIngs;
function searchPlat(para, tag) {
  const platInput = document.getElementById("searchInput");
  const mesRec = document.querySelector(".mes-recettes");
  console.log(platInput.value);
  if (platInput.value.length < 3) {
    if (mesRec.children.length < 50) {
      mesRec.innerHTML = "";
      displayData(recipes);
    }
    return;
  }
  if (para === "ing") {
    result = trierPlats(tag.toUpperCase(), para);
    console.log(result);
  } else if (para === "app") {
    console.log("app");
  } else if (para === "ust") {
    console.log("ust");
  } else if (para === "full" || para.currentTarget.myParam === "full") {
    if (para == "full") {
      result = trierPlats(platInput.value.toUpperCase(), para);
    } else {
      result = trierPlats(
        platInput.value.toUpperCase(),
        para.currentTarget.myParam
      );
    }
  } else {
    console.log("There was a mistake in the search tag");
  }
  mesRec.innerHTML = "";
  document.getElementById("ingredients-list").innerHTML = "";
  document.getElementById("appareils").innerHTML = "";
  document.getElementById("ustensiles").innerHTML = "";
  displayData(result);
  if (mesRec.innerHTML === "") {
    let message_1 = document.createElement("P");
    message_1.setAttribute("id", "notfound");

    let message_2 = document.createTextNode("Aucune recette trouvée");
    message_1.appendChild(message_2);
    mesRec.appendChild(message_1);
  }
}

function trierPlats(plat, para) {
  if (para === "full") {
    return recipes.filter(function (a) {
      return (
        a.description.toUpperCase().search(plat) !== -1 ||
        a.name.toUpperCase().search(plat) !== -1 ||
        testIng(a.ingredients, plat)
      );
    });
  }
  if (para === "ing") {
    return result.filter(function (a) {
      return testIng(a.ingredients, plat);
    });
  }
}
function testIng(ingredients, plat) {
  // ingredients.forEach((food) => {
  //   if (food.ingredient.toUpperCase().search(plat) !== -1) {
  //     console.log("coco pog");
  //     return true;
  //   }
  // });
  const found = ingredients.find(
    (ing) => ing.ingredient.toUpperCase().search(plat) !== -1
  );
  return found !== undefined;
}

function my_select() {
  for (const dropdown of document.querySelectorAll(".select-wrapper")) {
    dropdown.addEventListener("click", function () {
      this.querySelector(".select").classList.toggle("open");
      document.getElementById("ingredients").style.borderRadius = "5px 5px 0 0";
    });
  }

  for (const button of document.querySelectorAll(".select button")) {
    button.addEventListener("click", function () {
      this.style.display = "none";
      const myInput = document.querySelector(".select input");
      myInput.style.display = "block";
      document.getElementById("ingredientsWrap").style.width = "667px";
      myInput.focus();
      myInput.addEventListener("focusout", function () {
        this.style.display = "none";
        button.style.display = "block";
        document.getElementById("ingredientsWrap").style.width = "170px";
      });
    });
  }
}
window.addEventListener("click", function (e) {
  for (const select of document.querySelectorAll(".select")) {
    if (!select.contains(e.target)) {
      select.classList.remove("open");
    }
  }
});

async function displayData(recettes) {
  let ingredientsArray = [];
  let applianceArray = [];
  let ustensilsArray = [];
  const recettesSection = document.querySelector(".mes-recettes");
  const mesIngredients = document.getElementById("ingredients-list");
  const mesAppareils = document.getElementById("appareils");
  const mesUstensiles = document.getElementById("ustensiles");
  recettes.forEach((recette) => {
    const recetteModel = recetteFactory(recette);
    const recettes = recetteModel.getRecetteDOM();
    recetteModel.getIngredient(ingredientsArray, mesIngredients);
    recetteModel.getAppliance(applianceArray, mesAppareils);
    recetteModel.getUstansiles(ustensilsArray, mesUstensiles);
    recettesSection.appendChild(recettes);
  });
  myIngs = document.querySelector(".custom-options").innerHTML;
  for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener("click", function () {
      let li = document.createElement("li");
      let inputValue = this.dataset.value;
      let t = document.createTextNode(inputValue);
      li.appendChild(t);
      if (inputValue === "") {
        alert("You must write something!");
      } else {
        document.getElementById("tags").appendChild(li);
        if (mytags.indexOf(inputValue.toUpperCase()) === -1)
          mytags.push(inputValue.toUpperCase());
      }

      let span = document.createElement("SPAN");
      let txt = document.createTextNode("\u00D7");
      span.className = `close`;
      span.appendChild(txt);
      li.appendChild(span);
      // let close = document.getElementsByClassName("close");
      // for (let c of close) {
      span.onclick = function () {
        const index = mytags.indexOf(inputValue.toUpperCase());
        console.log("Tell me " + mytags + "my tag" + inputValue.toUpperCase());
        if (index > -1) {
          console.log("REMOVE HERE");
          mytags.splice(index, 1);
        }
        let div = this.parentElement;
        div.style.display = "none";
        searchPlat(
          "full",
          document.querySelector("#searchInput").dataset.value
        );
        if (mytags.length !== 0) {
          mytags.forEach((tag) => searchPlat("ing", tag));
        }
      };
      // }
    });
  }
  for (const ing of document.querySelectorAll(".ing")) {
    ing.addEventListener("click", function () {
      let triValue = this.dataset.value;
      searchPlat("ing", triValue);
      console.log(triValue);
    });
    ing.myParam = "ing";
  }
  const ingInput = document.querySelector(".select input");
  ingInput.removeEventListener("input", dropdownIng);
  ingInput.addEventListener("input", dropdownIng);
  ingInput.myParam = ingredientsArray;
}

function dropdownIng(ingArray) {
  const myInputIng = document.querySelector(".select input");

  // myInputIng.removeEventListener("focusout", htmlBack);
  // myInputIng.addEventListener("focusout", htmlBack);
  if (this.value.length !== 0) {
    document.getElementById("ingredients-list").style.opacity = 0;
    document.getElementById("dropdown").style.opacity = 1;
    console.log(ingArray.currentTarget.myParam);
    console.log(myInputIng.value);
    let newIng = ingArray.currentTarget.myParam.filter((ing) => {
      console.log("Testing " + myInputIng.value.toUpperCase() + " and " + ing);
      return ing.search(myInputIng.value.toUpperCase()) !== -1;
    });
    console.log(newIng);
  } else {
    document.getElementById("ingredients-list").style.opacity = 1;
    document.getElementById("dropdown").style.opacity = 0;
  }
}

// function htmlBack() {
//   // if (
//   //   document.querySelector(".custom-options").innerHTML !==
//   //   myInner.currentTarget.myParam
//   // ) {
//   //   document.querySelector(".custom-options").innerHTML +=
//   //     myInner.currentTarget.myParam;
//   // }
// }

async function init() {
  console.log(recipes);
  displayData(recipes);
  my_select();
  document.querySelector(".search").addEventListener("click", searchPlat);
  document.querySelector(".search").myParam = "full";

  document.getElementById("searchInput").addEventListener("input", searchPlat);
  document.getElementById("searchInput").myParam = "full";
  myIngs = document.querySelector(".custom-options").innerHTML;
}

init();
