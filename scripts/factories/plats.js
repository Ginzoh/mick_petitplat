function setAttributes(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function recetteFactory(data) {
  const {
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
  } = data;
  // function getRecetteDOM() {
  //   const article = document.createElement("article");
  //   return article;
  // }
}
