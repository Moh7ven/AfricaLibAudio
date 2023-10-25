const token = localStorage.getItem("token");
// const identif = document.querySelector("#infoUser");

if (!token) {
  alert("Veuillez vous connecter svp");
  window.location.href = "../pages/connexion.html";
}

async function recupDonnee() {
  const recup = await fetch(
    "https://africalibaudio-api.onrender.com/api/livre/"
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      data.forEach((element) => {
        html += `
          <div class="card-livre">
          <div class="card-haut">
            <img
              src="${element.image}"
              alt=""
              width="139px"
              height="207px"
            />
          </div>
          <div class="card-bas">
            <span class="titre">${element.titre}</span>
            <span class="type-content"
              ><u>Catégorie:</u> <span class="type">${element.typeLivre}</span></span
            >
            <span class="prix">${element.sommeLivre} <span>fcfa</span></span>
            
          </div>
        </div>
                `;
      });
      document.querySelector(".card-livre-container").innerHTML = html;
      // console.log(data);
    });
  return recup;
}
recupDonnee();
