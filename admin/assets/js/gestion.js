const token = localStorage.getItem("token");

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
      "https://myblog-x9p2.onrender.com/api/livre/createlivre",
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
      setInterval((window.location.href = "./gestion.html"), 3000);
    } else {
      const resData = await res.json();
      console.log("Erreur : ", resData);
    }
  } catch (error) {
    console.log(error);
  }
}

formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  addLivre();
});
