const token = localStorage.getItem("token");
const supLivre = document.querySelector("#supprimer");
// const modifLivre = documen.querySelector("#");

const formAdd = document.querySelector("#formAdd");

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
      window.location.href = "./gestion-livre.html";
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
      //   console.log(data);
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
      document.querySelector(".livres-container").innerHTML = html;
      document.querySelector("#author").textContent = "bonjour";
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
  if (currentUpdateIndex !== undefined) {
    async function UpdateData() {
      const UpData = await fetch(
        `https://africalibaudio-api.onrender.com/api/livre/${currentUpdateIndex}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
            document.querySelector("#author").value = data.titre;
        })
        .catch((e) => console.log(e));
    }
    UpdateData();
    //   console.log(currentDeleteIndex);
  }
}

/* modifLivre.addEventListener("click", (e) => {
  e.preventDefault();

  if (currentUpdateIndex !== undefined) {
    async function UpdateData() {
      const UpData = await fetch(
        `https://africalibaudio-api.onrender.com/api/livre/${ccurrentUpdateIndex}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data)=>{
            document.querySelector("")
        })
        .catch((e) => console.log(e));
    }
    UpdateData();
  }
}); */
