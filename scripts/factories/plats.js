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
  function getRecetteDOM() {
    let recetteNode_1 = document.createElement("DIV");
    recetteNode_1.setAttribute("class", "ma-recette");

    let recetteNode_2 = document.createElement("IMG");
    recetteNode_2.setAttribute("class", "recette-pic");
    recetteNode_2.setAttribute("alt", "");
    recetteNode_1.appendChild(recetteNode_2);

    let recetteNode_3 = document.createElement("DIV");
    recetteNode_3.setAttribute("class", "en-tete");
    recetteNode_1.appendChild(recetteNode_3);

    let recetteNode_4 = document.createElement("H2");
    recetteNode_3.appendChild(recetteNode_4);

    let recetteNode_5 = document.createTextNode(name);
    recetteNode_4.appendChild(recetteNode_5);

    let recetteNode_6 = document.createElement("DIV");
    recetteNode_6.setAttribute("class", "time");
    recetteNode_3.appendChild(recetteNode_6);

    let recetteNode_7 = document.createElement("SPAN");
    recetteNode_7.setAttribute("class", "icon");
    recetteNode_6.appendChild(recetteNode_7);

    let recetteNode_8 = document.createElement("P");
    recetteNode_6.appendChild(recetteNode_8);

    let recetteNode_9 = document.createTextNode(`${time} min`);
    recetteNode_8.appendChild(recetteNode_9);

    let recetteNode_10 = document.createElement("DIV");
    recetteNode_10.setAttribute("class", "instruction");
    recetteNode_1.appendChild(recetteNode_10);

    let recetteNode_11 = document.createElement("DIV");
    recetteNode_11.setAttribute("class", "ingredients");
    recetteNode_10.appendChild(recetteNode_11);

    ingredients.forEach((food) => {
      let recetteNode_12 = document.createElement("P");
      recetteNode_11.appendChild(recetteNode_12);

      let recetteNode_13 = document.createElement("SPAN");
      recetteNode_13.setAttribute("class", "ingredient");
      let recetteNode_span = document.createTextNode(`${food.ingredient}`);
      recetteNode_13.appendChild(recetteNode_span);
      recetteNode_12.appendChild(recetteNode_13);
      if (food.quantity !== undefined) {
        let recetteNode_14 = document.createTextNode(`: ${food.quantity}`);
        recetteNode_12.appendChild(recetteNode_14);
      }
      if (food.unit !== undefined) {
        let recetteUnit = document.createTextNode(` ${food.unit}`);
        recetteNode_12.appendChild(recetteUnit);
      }
    });

    let recetteNode_17 = document.createElement("P");
    recetteNode_17.setAttribute("class", "follow");
    recetteNode_10.appendChild(recetteNode_17);

    let recetteNode_18 = document.createTextNode(
      `${description.slice(0, 200)}...`
    );
    recetteNode_17.appendChild(recetteNode_18);
    // howToMake.innerText = `${description.slice(0, 200)}...`;
    return recetteNode_1;
  }
  return {
    id,
    name,
    servings,
    ingredients,
    time,
    description,
    appliance,
    ustensils,
    getRecetteDOM,
  };
}
