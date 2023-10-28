// document.addEventListener("DOMContentLoaded", function () {
const token = localStorage.getItem("token");
const supLivre = document.querySelector("#supprimer");
// const modifLivre = documen.querySelector("#");

const formAdd = document.querySelector("#formAdd");
const msgLivVide = document.querySelector("#msgLivVide");
const messageAdd = document.querySelector("#messageAdd");

/* VERIFIER SI L'UTILISATEUR EST CONNECTER */
if (!token) {
  alert("Veuillez vous connecter svp");
  window.location.href = "../pages/connexion.html";
}

/* AJOUT DE LIVRE */
async function addLivre() {
  const formData = new FormData(formAdd);
  try {
    const res = await fetch(
      "https://africalibaudio-api.onrender.com/api/livre/createlivre",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          //   "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      messageAdd.style.color = "white";
      messageAdd.textContent =
        "Livre enregistrer avec succès veuillez patienter svp !";
      setInterval((window.location.href = "./gestion-livre.html"), 3000);
    } else {
      const resData = await res.json();
      console.log("Erreur lors de l'enregistrement du livre: ", resData);
    }
  } catch (error) {
    console.log(error);
  }
}

formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  addLivre();
});

/* RECUPÉRER TOUS LES LIVRES */
async function recupLivres() {
  const recup = await fetch(
    "https://africalibaudio-api.onrender.com/api/livre/",
    {
      method: "GET",
      /* headers: {
            Authorization: `Bearer ${token}`,
          }, */
    }
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      let modifForm = "";
      data.forEach((element) => {
        html += `
            <div class="livre">
            <div class="supp-bloc"><a href="#popup-supprimer" onclick="setDeleteIndex('${element._id}')">Supprimer</a></div>
            <div class="modif-bloc"><a href="#popup-modifier"  onclick="setUpdateIndex('${element._id}')">Modifier</a></div>
            <div class="image-livre">
              <img
                src="${element.image}"
                alt=""
                height="300px"
                width="200px"
              />
            </div>
            <div class="audio-and-des">
              <audio controls><source src="${element.audio}" /></audio>
              <div class="description">
                <p class="auteur">
                  <u>Auteur:</u> <span style="color: black">${element.authorLivre}</span>
                </p>
                <p class="titre">
                  <u>Titre:</u>
                  <span style="color: black"> ${element.titre}</span>
                </p>
                <p class="des-title"><u>Descriptions</u></p>
                <p class="des-text">
                ${element.libLivre}
                </p>
              </div>
            </div>
          </div>
                 `;
      });
      /* if ((data = [])) {
          msgLivVide.style.color = "red";
          msgLivVide.textContent =
            "Aucun livre n'est enregistré pour le moment !";
        } */
      document.querySelector(".livres-container").innerHTML = html;
      document.querySelector("#author").textContent = "bonjour";
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

supLivre.addEventListener("click", (e) => {
  e.preventDefault();

  if (currentDeleteIndex !== undefined) {
    async function supData() {
      const deleteData = await fetch(
        `https://africalibaudio-api.onrender.com/api/livre/${currentDeleteIndex}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then(() => (window.location.href = "./gestion-livre.html"))
        .catch((e) => console.log(e));
    }
    supData();
  }
});

let currentUpdateIndex;

function setUpdateIndex(index) {
  currentUpdateIndex = index;
  console.log(currentUpdateIndex);

  // Fonction pour récupérer et afficher les données du livre existant
  async function getLivreData() {
    try {
      const response = await fetch(
        `https://africalibaudio-api.onrender.com/api/livre/${currentUpdateIndex}`
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        // console.log(data.libLivre);

        document.getElementById("titre").value = data.titre;
        document.querySelector("#lib").value = data.libLivre;
        document.getElementById("authorLivre").value = data.authorLivre;
        document.getElementById("typeLivre").value = data.typeLivre;
        document.getElementById("sommeLivre").value = data.sommeLivre;

        //afficher le nom de l'image du livre
        const imageUrl = data.image;
        const imageName = imageUrl.split("/").pop().replace(/^\d+-/, "");
        document.getElementById("imageName").textContent = imageName;

        //afficher le nom de l'audio du livre
        const audioUrl = data.audio;
        const audioName = audioUrl.split("/").pop().replace(/^\d+-/, "");
        document.getElementById("audioName").textContent = audioName;
      } else {
        console.error("Erreur lors de la récupération des données du livre");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données du livre",
        error
      );
    }
  }

  getLivreData();

  const formModif = document.querySelector(".form-modif");
  console.log(formModif);

  async function modifRegister() {
    const formDataModif = new FormData(formModif);
    // const livreIdfForModif = currentUpdateIndex;

    try {
      const res = await fetch(
        `https://africalibaudio-api.onrender.com/api/livre/${currentUpdateIndex}`,
        {
          method: "PUT",
          body: formDataModif,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        console.log("hello");
      } else {
        const resData = await res.json();
        console.log("Erreur lors de la modification du livre", resData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  formModif.addEventListener("submit", (e) => {
    e.preventDefault();
    modifRegister();
  });
}
/* // Ici on ecoute le formulaire de modification
  document.querySelector(".form-modif").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const livreId = currentUpdateIndex;
    const formData = new FormData(document.querySelector(".form-modif"));
    console.log("hello");
  
    try {
      const response = await fetch(
        `https://africalibaudio-api.onrender.com/api/livre/${livreId}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        //   window.location.href = "./gestion-livre.html";
      //   console.log("hello");
      } else {
        console.error("Erreur lors de la mise à jour du livre");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du livre", error);
    }
  });
   */

// });
