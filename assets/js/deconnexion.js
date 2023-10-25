const tokenDeco = localStorage.getItem("token");
const deconnexion = document.querySelector("#deco");
// console.log(tokenDeco);

deconnexion.addEventListener("click", (e) => {
  if (tokenDeco) {
    localStorage.clear("token");
    window.location.href = "../index.html";
  } else {
    alert("Vous n'êtes pas connecter");
    window.location.href = "./connexion.html";
  }
});
