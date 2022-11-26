function searchPlat() {
  const platInput = document.getElementById("searchInput");
  console.log(platInput.value);
  if (platInput.value.length < 3) {
    if (document.getElementById("mes-recettes").children.length < 50) {
      document.querySelector(".mes-recettes").innerHTML = "";
      displayData(recipes);
    }
    return;
  }
  const result = trierPlats(platInput.value.toUpperCase());
  document.querySelector(".mes-recettes").innerHTML = "";
  displayData(result);
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
    return food.ingredient.toUpperCase().search(plat) !== -1;
  });
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
      console.log("test");
      this.style.display = "none";
      const myInput = document.querySelector(".select input");
      myInput.style.display = "block";
      myInput.focus();
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
  const recettesSection = document.querySelector(".mes-recettes");
  const mesIngredients = document.getElementById("ingredients-list");
  const mesAppareils = document.getElementById("appareils");
  const mesUstensiles = document.getElementById("ustensiles");
  recettes.forEach((recette) => {
    const recetteModel = recetteFactory(recette);
    const recettes = recetteModel.getRecetteDOM();
    const ingredients = recetteModel.getIngredient();
    const appareil = recetteModel.getAppliance();
    recetteModel.getUstansiles(mesUstensiles);
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
