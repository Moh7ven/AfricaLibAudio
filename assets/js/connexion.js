const form = document.querySelector("form");

async function userConnect() {
  const formData = new FormData(form);

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
      console.log("Erreur lors de l'enregistrement : ", resData);
    }
  } catch (error) {
    console.log(error);
  }
}

form.addEventListener("click", (e) => {
  e.preventDefault();
  userConnect();
});
