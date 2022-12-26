const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function showError(input, error, errorMessage, config) {
  input.classList.add(config.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(config.errorClass);
}

function hideError(input, error, config) {
  input.classList.remove(config.inputErrorClass);
  error.classList.remove(config.errorClass);
  error.textContent = '';
}

function checkInputValidity(form, input, config) {
  const error = form.querySelector(`.${input.id}-error`);
  if (!input.validity.valid) {
    showError(input, error, input.validationMessage, config);
  } else {
    hideError(input, error, config);
  }
}

//блокировать разблокировать кнопку сабмита
function disableSubmitButton(button, config) {
  button.classList.add(config.inactiveButtonClass);
  button.setAttribute('disabled', true);
}

function enableSubmitButton(button, config) {
  button.classList.remove(config.inactiveButtonClass);
  button.removeAttribute('disabled', true);
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonElement = form.querySelector(config.submitButtonSelector);

  // toggleButtonState(config, inputs, buttonElement);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, config);
      toggleButtonState(config, inputs, buttonElement);
    })
  })
}

function hasInvalidInput(inputs) {
  return inputs.some((element) => {
    return !element.validity.valid;
  })
}

function toggleButtonState(config, inputs, button) {
  if (hasInvalidInput(inputs)) {
    disableSubmitButton(button, config);
  } else {
    enableSubmitButton(button, config);
  }
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    setEventListeners(form, config);
  })
}

enableValidation(validationConfig);

