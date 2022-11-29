function searchPlat() {
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
  const result = trierPlats(platInput.value.toUpperCase());
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

function trierPlats(plat) {
  return recipes.filter(function (a) {
    return (
      a.description.toUpperCase().search(plat) !== -1 ||
      a.name.toUpperCase().search(plat) !== -1 ||
      testIng(a.ingredients, plat)
    );
  });
}
function testIng(ingredients, plat) {
  ingredients.forEach((food) => {
    if (food.ingredient.toUpperCase().search(plat) !== -1) return true;
  });
  return false;
}
function my_select() {
  for (const dropdown of document.querySelectorAll(".select-wrapper")) {
    dropdown.addEventListener("click", function () {
      this.querySelector(".select").classList.toggle("open");
      document.getElementById("ingredients").style.borderRadius = "5px 5px 0 0";
    });
  }
  for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener("click", function () {
      let triValue = this.dataset.value;
      console.log(triValue);
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
    const ingredients = recetteModel.getIngredient(ingredientsArray);
    const appareil = recetteModel.getAppliance(applianceArray);
    recetteModel.getUstansiles(mesUstensiles, ustensilsArray);
    recettesSection.appendChild(recettes);
    if (ingredients !== undefined) {
      mesIngredients.appendChild(ingredients);
    }
    if (appareil !== undefined) {
      mesAppareils.appendChild(appareil);
    }
  });
}

async function init() {
  console.log(recipes);
  displayData(recipes);
  my_select();
  document.querySelector(".search").addEventListener("click", searchPlat);
  document.getElementById("searchInput").addEventListener("input", searchPlat);
}

init();
