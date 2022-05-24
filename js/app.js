// Variables

const sendButton = document.querySelector("#enviar");
const email = document.querySelector("#email");
const issue = document.querySelector("#asunto");
const message = document.querySelector("#mensaje");
const formElem = document.querySelector("#enviar-mail");
const resetElem = document.querySelector("#resetBtn");

const re =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Listeners

eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", startApp);
  email.addEventListener("blur", handleBlurValidateForm);
  issue.addEventListener("blur", handleBlurValidateForm);
  message.addEventListener("blur", handleBlurValidateForm);
  formElem.addEventListener("submit", handleSubmitForm);
  resetElem.addEventListener("click", resetForm);
}

// Functions

function startApp() {
  sendButton.disabled = true;
  sendButton.classList.add("cursor-not-allowed", "opacity-50");
}

function handleBlurValidateForm(e) {
  if (e.target.value.length > 0) {
    // Remove errors
    const error = document.querySelector("p.error");
    if (error) {
      error.remove();
    }

    // Change colors
    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
  } else {
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");
    showError("Todos los campos son obligatorios");
  }

  if (e.target.type === "email") {
    if (re.test(e.target.value)) {
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
      }

      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
      e.target.classList.remove("border", "border-green-500");
      e.target.classList.add("border", "border-red-500");
      showError("Email no válido");
    }
  }

  if (re.test(email.value) && issue.value !== "" && message.value !== "") {
    sendButton.disabled = false;
    sendButton.classList.remove("cursor-not-allowed", "opacity-50");
  }
}

function showError(message) {
  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorMessage.classList.add(
    "border",
    "border-red-500",
    "background-color-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );

  const errors = document.querySelectorAll(".error");

  if (errors.length === 0) {
    formElem.appendChild(errorMessage);
  }
}

function handleSubmitForm(e) {
  e.preventDefault();
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  setTimeout(() => {
    spinner.style.display = "none";

    const paragraph = document.createElement("p");
    paragraph.textContent = "El mensaje se envió correctamente";
    paragraph.classList.add(
      "text-center",
      "my-10",
      "p-2",
      "bg-green-500",
      "font-bold",
      "uppercase"
    );

    formElem.insertBefore(paragraph, spinner);

    setTimeout(() => {
      paragraph.remove();

      resetForm();

      startApp();
    }, 5000);
  }, 3000);
}

function resetForm() {
  formElem.reset();
}
