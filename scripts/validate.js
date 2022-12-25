const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function showError(input, error, errorMessage) {
  input.classList.add(validationConfig.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(validationConfig.errorClass);
}

function hideError(input, error) {
  input.classList.remove(validationConfig.inputErrorClass);
  error.classList.remove(validationConfig.errorClass);
  error.textContent = '';
}

function checkInputValidity(form, input, config) {
  const error = form.querySelector(`.${input.id}-error`);
  if (!input.validity.valid) {
    showError(input, error, input.validationMessage);
  } else {
    hideError(input, error);
  }
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonElement = form.querySelector(config.submitButtonSelector);

  toggleButtonState(config, inputs, buttonElement);
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
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.classList.remove(config.inactiveButtonClass);
  }
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit',(evt)=> {
      evt.preventDefault();
    })
    setEventListeners(form, config);
  })
}

enableValidation(validationConfig);

