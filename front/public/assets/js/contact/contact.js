import { fetch_data } from "../lib/functions.js";

// on récupère tous les champs
const form = document.querySelector("#form-contact");
const name_input = document.querySelector("#name");
const email_input = document.querySelector("#email");
const subject_input = document.querySelector("#subject");
const message_input = document.querySelector("#message");
// on récupère toutes les div error
const error_name = document.querySelector("#error-name");
const error_email = document.querySelector("#error-email");
const error_subject = document.querySelector("#error-subject");
const error_message = document.querySelector("#error-message");
const response_message = document.querySelector("#response-message");

//validation données rejex
const name_regex = new RegExp("^[A-Za-zÀ-ÿ-]+(?: [A-Za-zÀ-ÿ-]+)*$");
const email_regex = new RegExp(
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
);

//validatin via regex
function validate_field(input, regex, errorEl, errorMsg) {
  const value = input.value.trim();
  if (!regex.test(value)) {
    errorEl.textContent = errorMsg;
    input.classList.remove("valid");
    input.classList.add("invalid");
    setValidationIcon(input, false);
    return false;
  } else {
    errorEl.textContent = "";
    input.classList.remove("invalid");
    input.classList.add("valid");
    setValidationIcon(input, true);
    return true;
  }
}

// Fonction de validation par longueur minimale pour les champs sujet et message
function validate_length(input, minLength, errorEl, errorMsg) {
  const value = input.value.trim();
  if (value.length < minLength) {
    errorEl.textContent = errorMsg;
    input.classList.remove("valid");
    input.classList.add("invalid");
    setValidationIcon(input, false);
    return false;
  } else {
    errorEl.textContent = "";
    input.classList.remove("invalid");
    input.classList.add("valid");
    setValidationIcon(input, true);
    return true;
  }
}

// Affiche ou cache l'icône de validation dans le wrapper de l'input
function setValidationIcon(input, isValid) {
  const wrapper = input.parentElement;
  const icon = wrapper.querySelector(".validation-icon");
  if (isValid) {
    icon.className = "validation-icon fas fa-check valid-icon"; // Icône check verte
  } else {
    icon.className = "validation-icon"; // Réinitialisation (aucune icône)
  }
}

// on ajoute des écoutes d'évènements blur pour valider chaque champs
name_input.addEventListener("blur", () => {
  validate_field(
    name_input,
    name_regex,
    error_name,
    "Veuillez entrer un nom valide (minimum 2 caractères, lettres et espaces uniquement)."
  );
});
email_input.addEventListener("blur", () => {
  validate_field(
    email_input,
    email_regex,
    error_email,
    "Veuillez entrer une adresse email valide."
  );
});
subject_input.addEventListener("blur", () => {
  validate_length(
    subject_input,
    3,
    error_subject,
    "Le sujet doit comporter au moins 3 caractères."
  );
});
message_input.addEventListener("blur", () => {
  validate_length(
    message_input,
    10,
    error_message,
    "Le message doit comporter au moins 10 caractères."
  );
});

//bloque le rechargement automatique de la page
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // Validation finale avant envoi
  const is_name_valid = validate_field(
    name_input,
    name_regex,
    error_name,
    "Veuillez entrer un nom valide (minimum 2 caractères, lettres et espaces uniquement)."
  );
  const is_email_valid = validate_field(
    email_input,
    email_regex,
    error_email,
    "Veuillez entrer une adresse email valide."
  );
  const is_subject_valid = validate_length(
    subject_input,
    3,
    error_subject,
    "Le sujet doit comporter au moins 3 caractères."
  );
  const is_message_valid = validate_length(
    message_input,
    10,
    error_message,
    "Le message doit comporter au moins 10 caractères."
  );
  if (
    !is_email_valid ||
    !is_name_valid ||
    !is_subject_valid ||
    !is_message_valid
  )
    return; //il y aura un retour si tous les champs sont ok//

  const form_data = {
    name: name_input.value.trim(),
    email: email_input.value.trim(),
    subject: subject_input.value.trim(),
    message: message_input.value.trim(),
  };

  // envoi du message ...
  try {
    const result = await fetch_data({
      route: "/contact",
      api: "",
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form_data),
      },
    });
    response_message.innerHTML = `<div class="alert success">${result.message}</div>`;
    form.reset();
    document
      .querySelectorAll(".vaidation-icon")
      .forEach((icon) => (icon.className = "validation-icon"));
  } catch (error) {
    response_message.innerHTML = `<div class="alert error">Une erreur est survenue lors de l'envoi du formulaire</div>`;
    console.log(error);
  }
  console.log(e);
});
