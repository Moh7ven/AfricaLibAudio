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
