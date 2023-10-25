const token = localStorage.getItem("token");

const identif = document.querySelector("#infoUser");
const supAchat = document.querySelector("#supprimer");

if (token) {
  async function getUserInfo() {
    try {
      const response = await fetch(
        "https://africalibaudio-api.onrender.com/api/auth/userinfos",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        identif.textContent = `${userData.nomUser} ${userData.prenomUser}`;

        console.log("Informations de l'utilisateur :", userData);
      } else {
        console.error(
          "Erreur lors de la demande des informations de l'utilisateur."
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  getUserInfo();
} else {
  alert("Veuillez vous connecter svp");
  //   console.log("ghh");
  window.location.href = "./connexion.html";
}

async function recupDonnee() {
  const recup = await fetch(
    "https://africalibaudio-api.onrender.com/api/achat/userachat",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      let html = "";
      data.forEach((element) => {
        html += `
     <div class="livre">
     <div class="supp-bloc"><a href="#popup-supprimer"  onclick="setDeleteIndex('${element._id}')">Supprimer</a></div>
     <div class="image-livre">
       <img src="${element.image}" alt="" height="300px" width="200px" />
     </div>
     <div class="audio-and-des">
       <audio controls><source src="${element.audio}" /></audio>
       <div class="description">
         <p class="auteur">
           <u>Auteur:</u> <span style="color: black" id="auteur">${element.authorLivre}</span>
         </p>
         <p class="titre">
           <u>Titre:</u>
           <span style="color: black" id="titre">${element.titre}</span>
         </p>
         <p class="des-title"><u>Descriptions</u></p>
         <p class="des-text">${element.libLivre}</p>
       </div>
     </div>
   </div>
             `;
      });
      document.querySelector(".livres-container").innerHTML = html;
      console.log(data);
    });
  return recup;
}
recupDonnee();

let currentDeleteIndex;

function setDeleteIndex(index) {
  currentDeleteIndex = index;
  //   console.log(currentDeleteIndex);
}

supAchat.addEventListener("click", (e) => {
  e.preventDefault();

  if (currentDeleteIndex !== undefined) {
    async function supData() {
      const deleteData = await fetch(
        `https://africalibaudio-api.onrender.com/api/achat/${currentDeleteIndex}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then(() => (window.location.href = "./mes-livres.html"))
        .catch((e) => console.log(e));
    }
    supData();
  }
});
