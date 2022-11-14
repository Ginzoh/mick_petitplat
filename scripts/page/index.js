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
      // this.parentNode
      //   .querySelector(".custom-option.selected")
      //   .classList.remove("selected");
      // this.classList.add("selected");
      // this.closest(".select").querySelector(
      //   ".select__trigger span"
      // ).textContent = this.textContent;
      let triValue = this.dataset.value;
      console.log(triValue);
      //const triMedias = call_tri(triValue, medias);
      //document.getElementById("photos").innerHTML = "";
      //affichePhotos(triMedias);
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
}

init();
