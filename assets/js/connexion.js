const form = document.querySelector("form");

async function userConnect() {
  const formData = new FormData(form);
  const pseudo = document.querySelector("#pseudo").value;

  if (pseudo === "admin") {
    /* Connexion si c'est l'administrateur */
    try {
      const res = await fetch(
        "https://africalibaudio-api.onrender.com/api/admin/loginadmin",
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        const resData = await res.json();
        localStorage.setItem("token", resData.token);
        window.location.href = "../admin/acceuil-admin.html";
      } else {
        const resData = await res.json();
        console.log("Erreur lors de la connexion : ", resData);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    /* Connexion si c'est l'utilisateur */
    try {
      const res = await fetch(
        "https://africalibaudio-api.onrender.com/api/auth/login",
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        const resData = await res.json();
        localStorage.setItem("token", resData.token);
        window.location.href = "./acceuil.html";
      } else {
        const resData = await res.json();
        console.log("Erreur lors de la connexion : ", resData);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  userConnect();
});
