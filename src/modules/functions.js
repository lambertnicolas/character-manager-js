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

export { listDisplay };
