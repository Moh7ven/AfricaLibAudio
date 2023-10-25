const token = localStorage.getItem("token");
const identif = document.querySelector("#infoUser");
const acheter = document.querySelector("#acheter");

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
          <div class="panier-logo">
            <a href="#popup-achat" onclick="makeAchat('${element._id}')">
              <img
                src="../assets/img/panier.png"
                alt="logo-panier"
                width="23px"
                height="23px"
              />
            </a>
          </div>
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
let idArt = "";
async function makeAchat(idLivre) {
  await fetch(`https://africalibaudio-api.onrender.com/api/livre/${idLivre}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#image-pop").src = data.image;
      document.querySelector("#prix").textContent = data.sommeLivre;
      document.querySelector("#titre").textContent = data.titre;
      document.querySelector("#auteur").textContent = data.authorLivre;
      document.querySelector(".des-pop").textContent = data.libLivre;
      idArt = data._id;
      //   console.log(data);
    })
    .catch((e) => console.log(e));
}

acheter.addEventListener("click", (e) => {
  e.preventDefault();

  const payement = document.querySelector("#payement").value;
  const phone = document.querySelector(".phone").value;
  const prix = parseInt(document.querySelector("#prix").textContent);

  let objetPay = {
    operateur: payement,
    somme: prix,
    phone: phone,
    idArticle: idArt,
  };
  console.log(objetPay);

  /* async function sendAchat() {
    try {
      const res = await fetch("http://localhost:3000/api/achat/createachat", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  } */
});
