const token = localStorage.getItem("token");

const supUser = document.querySelector("#supprimer");

/* VERIFIER SI L'UTILISATEUR EST CONNECTER */
if (!token) {
  alert("Veuillez vous connecter svp");
  window.location.href = "../pages/connexion.html";
}

async function recupLivres() {
  const recup = await fetch(
    "https://africalibaudio-api.onrender.com/api/auth/alluser",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      data.forEach((element) => {
        html += `
        <div class="livre">
        <div class="supp-bloc"><a href="#popup-supprimer" onclick="setDeleteIndex('${element._id}')">Supprimer</a></div>
        <div class="image-livre">
          <img
            src="../assets/img/humain.png"
            alt=""
            height="120px"
            width="120px"
          />
        </div>
        <div class="audio-and-des">
          <div class="description">
            <p class="auteur">
              <u>Nom:</u>
              <span style="color: black" id="nomUser">${element.nomUser}</span>
            </p>
            <p class="titre">
              <u>Prenom:</u>
              <span style="color: black" id="prenomUser">${element.prenomUser}</span>
            </p>
            <p class="titre">
              <u>Pseudo:</u>
              <span style="color: black" id="pseudoUser">${element.Username}</span>
            </p>
            <p class="titre">
              <u>Email:</u>
              <span style="color: black" id="emailUser">${element.emailUser}</span>
            </p>
          </div>
        </div>
      </div>
                 `;
      });
      document.querySelector(".livres-container").innerHTML = html;
      document.querySelector("#nbrLivre").textContent = data.length;

      console.log(data);
    });
  return recup;
}
recupLivres();

let currentDeleteIndex;

function setDeleteIndex(index) {
  currentDeleteIndex = index;
  //   console.log(currentDeleteIndex);
}

supUser.addEventListener("click", (e) => {
  e.preventDefault();

  if (currentDeleteIndex !== undefined) {
    async function supData() {
      const deleteData = await fetch(
        `https://africalibaudio-api.onrender.com/api/auth/${currentDeleteIndex}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then(() => (window.location.href = "./liste-user.html"))
        .catch((e) => console.log(e));
    }
    supData();
  }
});
