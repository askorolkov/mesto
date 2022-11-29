const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container');
let nameInputField = document.getElementById('formName');
let jobInputField = document.getElementById('formJob');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

function openPopup() {
  popup.classList.add('popup_open');
  // Подставляем данные в форму из профиля
  nameInputField.value = profileName.textContent;
  jobInputField.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_open');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInputField.value;
  profileJob.textContent = jobInputField.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
