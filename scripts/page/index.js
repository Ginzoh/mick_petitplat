let result = recipes;
let mytags = [];
let myIngs;
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function searchPlat(para, tag, test = 1) {
  const platInput = document.getElementById("searchInput");
  const mesRec = document.querySelector(".mes-recettes");
  const tags = document.getElementById("tags");
  console.log(platInput.value);

  if (platInput.value.length < 3 && test) {
    if (tags.children.length > 0) {
      console.log("TELL ME");
      return;
    }
    if (mesRec.children.length < 50) {
      mesRec.innerHTML = "";
      displayData(recipes);
    }
  }
  console.log(para);
  switch (para) {
    case "ing":
      result = trierPlats(tag.toUpperCase(), para);
      console.log(result);
      break;
    case "app":
      result = trierPlats(tag.toUpperCase(), para);
      break;
    case "ust":
      result = trierPlats(tag.toUpperCase(), para);
      break;
    case "full":
      result = trierPlats(platInput.value.toUpperCase(), para);
      break;
    default:
      result = trierPlats(
        platInput.value.toUpperCase(),
        para.currentTarget.myParam
      );
  }

  mesRec.innerHTML = "";
  document.getElementById("ingredients-list").innerHTML = "";
  document.getElementById("appareils-list").innerHTML = "";
  document.getElementById("ustensiles").innerHTML = "";
  displayData(result);
  if (mesRec.innerHTML === "") {
    let message_1 = document.createElement("P");
    message_1.setAttribute("id", "notfound");

    let message_2 = document.createTextNode("Aucune recette trouvée");
    message_1.appendChild(message_2);
    mesRec.appendChild(message_1);
  }
  console.log("Hello" + { result });
  return result;
}

function trierPlats(plat, para) {
  console.log(recipes);
  switch (para) {
    case "full":
      return recipes.filter(function (a) {
        return (
          a.description.toUpperCase().includes(plat) ||
          a.name.toUpperCase().includes(plat) ||
          testIng(a.ingredients, plat)
        );
      });
    case "ing":
      return result.filter(function (a) {
        return testIng(a.ingredients, plat);
      });
    case "app":
      return result.filter(function (a) {
        return a.appliance.toUpperCase().includes(plat);
      });
    case "ust":
      return result.filter(function (a) {
        const found = a.ustensils.find((ul) => ul.toUpperCase().includes(plat));
        return found !== undefined;
      });
    default:
      console.log("Erreur de tri");
  }
}
function testIng(ingredients, plat) {
  const found = ingredients.find((ing) =>
    ing.ingredient.toUpperCase().includes(plat)
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

  for (const button of document.querySelectorAll(".select #ingredients")) {
    button.addEventListener("click", function () {
      this.style.display = "none";
      const myInput = document.querySelector(".select #ingInput");
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
  for (const button of document.querySelectorAll(".select #appareilsButton")) {
    button.addEventListener("click", function () {
      this.style.display = "none";
      const myInput = document.querySelector(".select #appInput");
      myInput.style.display = "block";
      document.getElementById("appsWrap").style.width = "667px";
      myInput.focus();
      myInput.addEventListener("focusout", function () {
        this.style.display = "none";
        button.style.display = "block";
        document.getElementById("appsWrap").style.width = "170px";
      });
    });
  }
  for (const button of document.querySelectorAll(".select #ustensilesButton")) {
    button.addEventListener("click", function () {
      this.style.display = "none";
      const myInput = document.querySelector(".select #ustInput");
      myInput.style.display = "block";
      document.getElementById("ustWrap").style.width = "667px";
      myInput.focus();
      myInput.addEventListener("focusout", function () {
        this.style.display = "none";
        button.style.display = "block";
        document.getElementById("ustWrap").style.width = "170px";
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
  const mesAppareils = document.getElementById("appareils-list");
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
  applyIng("n");
  const ingInput = document.querySelector(".select #ingInput");
  ingInput.removeEventListener("input", dropdownIng);
  ingInput.addEventListener("input", dropdownIng);
  ingInput.myParam = ingredientsArray;
  const appInput = document.querySelector(".select #appInput");
  appInput.removeEventListener("input", dropdownApp);
  appInput.addEventListener("input", dropdownApp);
  appInput.myParam = applianceArray;
  const ustInput = document.querySelector(".select #ustInput");
  ustInput.removeEventListener("input", dropdownUst);
  ustInput.addEventListener("input", dropdownUst);
  ustInput.myParam = ustensilsArray;
}
function applyIng(n) {
  let options;
  if (n === "n") {
    options = document.querySelectorAll(".custom-option");
  } else if (n === "pika") {
    options = document.querySelectorAll(".drop-option");
  } else if (n === "app") {
    options = document.querySelectorAll(".drop-option-app");
  } else if (n === "ust") {
    options = document.querySelectorAll(".drop-option-ust");
  }
  for (const option of options) {
    option.removeEventListener("click", applyTag);
    option.addEventListener("click", applyTag);
  }

  for (const ing of document.querySelectorAll(".ing")) {
    applySearch(ing, "ing");
    if (n === "n") {
      ing.removeEventListener("click", applyTag);
      ing.addEventListener("click", applyTag);
      ing.myParam = "ing";
    }
  }
  for (const app of document.querySelectorAll(".app")) {
    applySearch(app, "app");
    if (n === "n") {
      app.removeEventListener("click", applyTag);
      app.addEventListener("click", applyTag);
      app.myParam = "app";
    }
  }
  for (const ust of document.querySelectorAll(".ust")) {
    applySearch(ust, "ust");
    if (n == "n") {
      ust.removeEventListener("click", applyTag);
      ust.addEventListener("click", applyTag);
      ust.myParam = "ust";
    }
  }
}

function applyTag(n) {
  // if (n.currentTarget.myParam !== "undefined") {
  //   n = n.currentTarget.myParam;
  // }
  let li = document.createElement("li");
  let inputValue = this.dataset.value;
  let t = document.createTextNode(
    capitalizeFirstLetter(inputValue.toLowerCase())
  );
  li.appendChild(t);
  console.log("OKKKKKKKKKKKK????????????");
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
  span.onclick = function () {
    console.log("wow");
    console.log(result);
    const index = mytags.indexOf(inputValue.toUpperCase());
    console.log("Tell me " + mytags + "my tag" + inputValue.toUpperCase());
    if (index > -1) {
      console.log("REMOVE HERE");
      mytags.splice(index, 1);
    }
    // let div = this.parentElement;
    // div.style.display = "none";
    li.parentNode.removeChild(li);
    const userInput = document.querySelector("#searchInput").value;
    searchPlat("full", userInput);
    console.log(mytags);
    if (mytags.length !== 0) {
      console.log("So n is " + n);
      if (n === "app") {
        mytags.forEach((tag) => searchPlat("app", tag));
      } else if (n === "ust") {
        mytags.forEach((tag) => searchPlat("ust", tag));
      } else {
        mytags.forEach((tag) => searchPlat("ing", tag));
      }
    } else {
      console.log(userInput);
      if (userInput === "") {
        result = recipes;
      }
    }
    console.log("waw");
    console.log(result);
  };
}
function applySearch(ele, tag) {
  ele.removeEventListener("click", searchTag);
  ele.addEventListener("click", searchTag);
  ele.myParam = tag;
}
function searchTag(tag) {
  console.log(this.dataset.value);
  let triValue = this.dataset.value;
  searchPlat(tag.currentTarget.myParam, triValue.trim(), 0);
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
    if (newIng.length !== 0) {
      let ingredient_1;
      let dropdown = document.getElementById("dropdown");
      dropdown.innerHTML = "";
      newIng.forEach((ing) => {
        console.log(
          "HEY I'M MR MEESSEEKS " + capitalizeFirstLetter(ing.toLowerCase())
        );
        let newIng = capitalizeFirstLetter(ing.toLowerCase());
        ingredient_1 = document.createElement("LI");
        ingredient_1.setAttribute("class", "custom-option ing drop-option");
        ingredient_1.setAttribute("data-value", newIng.toUpperCase());

        let ingredient_2 = document.createTextNode(newIng);
        ingredient_1.appendChild(ingredient_2);
        dropdown.appendChild(ingredient_1);
      });
      applyIng("pika");
    }
  } else {
    document.getElementById("ingredients-list").style.opacity = 1;
    document.getElementById("dropdown").style.opacity = 0;
  }
}

function dropdownApp(appArray) {
  const myInputApp = document.querySelector(".select #appInput");

  if (this.value.length !== 0) {
    document.getElementById("appareils-list").style.opacity = 0;
    document.getElementById("dropdownApps").style.opacity = 1;
    console.log(appArray.currentTarget.myParam);
    console.log(myInputApp.value);
    let newIng = appArray.currentTarget.myParam.filter((app) => {
      // console.log("Testing " + myInputApp.value.toUpperCase() + " and " + ing);
      return app.search(myInputApp.value.toUpperCase()) !== -1;
    });
    if (newIng.length !== 0) {
      let ingredient_1;
      let dropdown = document.getElementById("dropdownApps");
      dropdown.innerHTML = "";
      newIng.forEach((ing) => {
        console.log(
          "HEY I'M MR MEESSEEKS " + capitalizeFirstLetter(ing.toLowerCase())
        );
        let newIng = capitalizeFirstLetter(ing.toLowerCase());
        ingredient_1 = document.createElement("LI");
        ingredient_1.setAttribute("class", "custom-option app drop-option-app");
        ingredient_1.setAttribute("data-value", newIng.toUpperCase());

        let ingredient_2 = document.createTextNode(newIng);
        ingredient_1.appendChild(ingredient_2);
        dropdown.appendChild(ingredient_1);
      });
      applyIng("app");
    }
  } else {
    document.getElementById("appareils-list").style.opacity = 1;
    document.getElementById("dropdownApps").style.opacity = 0;
  }
}

function dropdownUst(ustArray) {
  const myInputApp = document.querySelector(".select #ustInput");

  // myInputIng.removeEventListener("focusout", htmlBack);
  // myInputIng.addEventListener("focusout", htmlBack);
  if (this.value.length !== 0) {
    document.getElementById("ustensiles").style.opacity = 0;
    document.getElementById("dropdownUsts").style.opacity = 1;
    console.log(ustArray.currentTarget.myParam);
    console.log(myInputApp.value);
    let newIng = ustArray.currentTarget.myParam.filter((ust) => {
      // console.log("Testing " + myInputApp.value.toUpperCase() + " and " + ing);
      console.log(
        "checking " + ust + " with " + myInputApp.value.toUpperCase()
      );
      return ust.includes(myInputApp.value.toUpperCase());
    });
    if (newIng.length !== 0) {
      let ingredient_1;
      let dropdown = document.getElementById("dropdownUsts");
      dropdown.innerHTML = "";
      newIng.forEach((ing) => {
        console.log(
          "HEY I'M MR MEESSEEKS " + capitalizeFirstLetter(ing.toLowerCase())
        );
        let newIng = capitalizeFirstLetter(ing.toLowerCase());
        ingredient_1 = document.createElement("LI");
        ingredient_1.setAttribute("class", "custom-option ust drop-option-ust");
        ingredient_1.setAttribute("data-value", newIng.toUpperCase());

        let ingredient_2 = document.createTextNode(newIng);
        ingredient_1.appendChild(ingredient_2);
        dropdown.appendChild(ingredient_1);
      });
      applyIng("ust");
    }
  } else {
    document.getElementById("ustensiles").style.opacity = 1;
    document.getElementById("dropdownUsts").style.opacity = 0;
  }
}

async function init() {
  console.log(recipes);
  displayData(recipes);
  my_select();
  // document.querySelector(".search").addEventListener("click", searchPlat);
  // document.querySelector(".search").myParam = "full";

  document.getElementById("searchInput").addEventListener("input", searchPlat);
  document.getElementById("searchInput").myParam = "full";
  myIngs = document.querySelector(".custom-options").innerHTML;
}

init();
