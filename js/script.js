/* async function recupDonnee() {
  const recup = await fetch("http://localhost:3000/depart")
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      data.forEach((element) => {
        html += `
            <div id="${element.id}">
                <h3>${element.nom}</h3>
                <p>le prix${element.prix}</p>
                <p>le nombre de commantaire ${element.nbrComment}</p>
            </div>
            `;
      });
      document.querySelector("#donnee").innerHTML = html;
      console.log(data);
    });
  return recup;
}

recupDonnee(); */
