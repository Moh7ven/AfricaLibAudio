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
            <img
              src="./assets/img/panier.png"
              alt="logo-panier"
              width="23px"
              height="23px"
            />
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

const menuSlide = () => {
  const menuIcon = document.querySelector(".menu-icon");
  const navLinks = document.querySelector(".nav-links");
  const navLinksInner = document.querySelectorAll(".nav-links li");

  //menu-icon click event
  menuIcon.addEventListener("click", () => {
    //toggle active class
    navLinks.classList.toggle("menu-active");

    //animate navLinks
    navLinksInner.forEach((li, index) => {
      if (li.style.animation) {
        li.style.animation = "";
      } else {
        li.style.animation = `navLinkAnime 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });

    //toggle for menu-icon animation
    menuIcon.classList.toggle("span-anime");
  });
};

menuSlide();
