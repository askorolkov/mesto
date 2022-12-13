//кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const buttonsClosePopup = document.querySelectorAll('.popup__close');
const photoCloseButton = document.querySelector('.photos__popup-close');
const buttonAddPlace = document.querySelector('.profile__add-button');
//попапы
const profileEditPopup = document.querySelector('#editProfile');
const placeAddPopup = document.querySelector('#addPlace');
const photoPopup = document.querySelector('.popup_photo');
//шаблоны
const placeTemplate = document.querySelector('#place').content;
//поля ввода
const placeInputLink = document.querySelector('#placeLink');
const placeInputName = document.querySelector('#placeName');
const nameInputField = document.querySelector('#formName');
const jobInputField = document.querySelector('#formJob');
//формы
const profileForm = document.querySelector('#profileForm');
const placeForm = document.querySelector('#placeForm');
//остальные элементы
const photoList = document.querySelector('.photos');
const photoFullscreen = document.querySelector('.photos__fullscreen-image');
const photoText = document.querySelector('.photos__text');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');

//Функция для формирования карточек из шаблона
function createCard(photoLink,locationName) {
  const placeCard = placeTemplate.querySelector('.card').cloneNode(true);
  const photoElement = placeCard.querySelector('.card__photo');
  photoElement.src = photoLink;
  photoElement.alt = locationName;
  placeCard.querySelector('.card__location').textContent = locationName;
  //открытие фотографии в полный размер
  photoElement.addEventListener('click', ()=> openPopup(photoPopup));
  photoElement.addEventListener('click', ()=> {
    photoFullscreen.src = photoLink;
    photoText.textContent = locationName;
  });
  //обработка лайков и удаление карточек
  placeCard.querySelector('.card__like').addEventListener('click', (evt)=>evt.target.classList.toggle('card__like_active'));
  placeCard.querySelector('.card__delete').addEventListener('click', ()=>placeCard.remove());
  return placeCard
}

//функция для добавления карточек на страницу
function renderCard(photoLink, locationName) {
  const card = createCard(photoLink, locationName);
  photoList.prepend(card);
}

//Добавляем 6 дефолтных карточек из шаблона циклом
initialCards.forEach((card)=> renderCard(card['link'],card['name']));

//функция открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_open');
}

//функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_open');
}

//Цикл для добавления слушателей событий на кнопки закрытия форм
buttonsClosePopup.forEach((button)=>{
  const buttonParentPopup = button.closest('.popup');
  button.addEventListener('click', ()=>closePopup(buttonParentPopup));
});

//Функции отправки формы
function handleProfileFormSubmit(evt,popup) {
  evt.preventDefault();
  profileName.textContent = nameInputField.value;
  profileJob.textContent = jobInputField.value;
  closePopup(popup);
};

function handlePlaceFormSubmit(evt,popup) {
  evt.preventDefault();
  renderCard(placeInputLink.value, placeInputName.value);
  closePopup(popup);
  placeForm.reset();
};

profileEditButton.addEventListener('click',()=>openPopup(profileEditPopup));

//добавляем второй слушатель клика на попап редактирования профиля
//для подстановки данных профиля в поля ввода
profileEditButton.addEventListener('click',()=> {
  nameInputField.value = profileName.textContent;
  jobInputField.value = profileJob.textContent;
});

buttonAddPlace.addEventListener('click', ()=>openPopup(placeAddPopup));
photoCloseButton.addEventListener('click',()=>closePopup(photoPopup));

//добавляем обработчики событий на сабмиты форм редактирования профиля и добавления карточек
profileForm.addEventListener('submit',(evt)=> handleProfileFormSubmit(evt,profileEditPopup));
placeForm.addEventListener('submit',(evt)=> handlePlaceFormSubmit(evt,placeAddPopup));
