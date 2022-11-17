function searchPlat() {
  console.log("GG");
  const platInput = document.getElementById("searchInput");
  console.log(platInput.value);
  const result = trierPlats(platInput.value.toUpperCase());
  document.querySelector(".mes-recettes").innerHTML = "";
  displayData(result);
  console.log("wtf");
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
    if (food.ingredient.toUpperCase().search(plat) !== -1) {
      return 1;
    } else {
      return -1;
    }
  });
}
function my_select() {
  for (const dropdown of document.querySelectorAll(".select-wrapper")) {
    dropdown.addEventListener("click", function () {
      this.querySelector(".select").classList.toggle("open");
      console.log(document.getElementById("ingredients"));
      document.getElementById("ingredients").style.borderRadius = "5px 5px 0 0";
    });
  }
  for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener("click", function () {
      let triValue = this.dataset.value;
      console.log(triValue);
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

  recettes.forEach((recette) => {
    const recetteModel = recetteFactory(recette);
    const userCardDOM = recetteModel.getRecetteDOM();
    recettesSection.appendChild(userCardDOM);
  });
}

async function init() {
  console.log(recipes);
  // document.querySelector(".mes-recettes").innerHTML = "";
  my_select();
  displayData(recipes);
  document.querySelector(".search").addEventListener("click", searchPlat);
}

init();
