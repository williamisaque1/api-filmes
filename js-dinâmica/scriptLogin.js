const init = () => {
  const validateEmail = (event) => {
    const input = event.currentTarget;
    const regex = /[^a-zA-Z0-9]/;
    const emailTeste = regex.test(input.value);
    if (emailTeste) {
      submitButton.setAttribute("disabled", "disabled");
      input.nextElementSibling.classList.add("error");
    } else {
      submitButton.removeAttribute("disabled");
      input.nextElementSibling.classList.remove("error");
    }
  };
  const validatePassword = (event) => {
    const input = event.currentTarget;
    if (input.value.length === 0) {
      alert("coloque uma senha !!!");
    } else if (input.value.length < 3) {
      submitButton.setAttribute("disabled", "disabled");
      input.nextElementSibling.classList.add("error");
    } else {
      submitButton.removeAttribute("disabled");
      input.nextElementSibling.classList.remove("error");
    }
  };
  const inputEmail = document.querySelector('input[type= "email"]');
  const inputPassword = document.querySelector('input[type= "password"]');
  const submitButton = document.querySelector(".login_submit");
  inputEmail.addEventListener("input", validateEmail);
  inputPassword.addEventListener("input", validatePassword);
  const sucessHandler = () => {
    submitButton.classList.remove("error");
    submitButton.classList.add("success");
    submitButton.textContent = "Sucesso :) ";
  };
  const errorHandler = () => {
    submitButton.classList.remove("success");
    submitButton.classList.add("error");
    submitButton.textContent = "ERRO :( ";
  };

  if (submitButton) {
    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      submitButton.textContent = "loading...";
      axios
        .get("https://projetinhoback.herokuapp.com/comentarios")
        .then(function (response) {
          for (i = 0; i < response.data.length; i++) {
            if (
              inputEmail.value === response.data[i]["usuario"] &&
              inputPassword.value === response.data[i]["senha"]
            ) {
              sucessHandler();
              setTimeout(function () {
                location.href = "http://127.0.0.1:5500/html-layouts/index.html";
              }, 1000);

              break;
              /* console.log(
                response.data[i]["usuario"] +
                  "\n" +
                  response.data[i]["senha"] +
                  "\n" +
                  response.status
              ); */
            } else {
              errorHandler();
            }
          }
        })
        .catch(() => {
          errorHandler();
        });
    });
  }
};
//window.onload = init;
window.addEventListener("load", init);
