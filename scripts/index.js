//кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const buttonsClosePopup = document.querySelectorAll('.popup__close');
const buttonAddPlace = document.querySelector('.profile__add-button');
//попапы
const fullscreenContainer = document.querySelector('.fullscreen');
const containerList = document.querySelectorAll('.popup__container');
const popupList = document.querySelectorAll('.popup');
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
const photoFullscreen = document.querySelector('.fullscreen__image');
const photoText = document.querySelector('.fullscreen__text');
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
  photoElement.addEventListener('click', ()=> {
    photoFullscreen.src = photoLink;
    photoFullscreen.alt = locationName;
    photoText.textContent = locationName;
    openPopup(photoPopup);
  });

//функция лайков
function toggleLike(evt) {
  evt.target.classList.toggle('card__like_active');
}

//обработка лайков и удаление карточек
placeCard.querySelector('.card__like').addEventListener('click', toggleLike);
placeCard.querySelector('.card__delete').addEventListener('click', ()=>placeCard.remove());
return placeCard;
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
  document.addEventListener('keydown', closePopupOnEscape);
}

//функция закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', closePopupOnEscape);
}

function closePopupOnEscape(evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_open');
    closePopup(popupOpen);
  }
}

//Цикл для добавления слушателей событий на кнопки закрытия форм
buttonsClosePopup.forEach((button)=>{
  const buttonParentPopup = button.closest('.popup');
  button.addEventListener('click', ()=>closePopup(buttonParentPopup));
})

//Функции отправки формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInputField.value;
  profileJob.textContent = jobInputField.value;
  closePopup(profileEditPopup);
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  renderCard(placeInputLink.value, placeInputName.value);
  closePopup(placeAddPopup);
  placeForm.reset();
}

profileEditButton.addEventListener('click',()=>openPopup(profileEditPopup));

//добавляем второй слушатель клика на попап редактирования профиля
//для подстановки данных профиля в поля ввода
profileEditButton.addEventListener('click',()=> {
  nameInputField.value = profileName.textContent;
  jobInputField.value = profileJob.textContent;
})

buttonAddPlace.addEventListener('click', ()=>openPopup(placeAddPopup));

//добавляем обработчики событий на сабмиты форм редактирования профиля и добавления карточек
profileForm.addEventListener('submit',handleProfileFormSubmit);
placeForm.addEventListener('submit',handlePlaceFormSubmit);

//закрыте попапов по клику на темный фон
popupList.forEach((popup) => {
  popup.addEventListener('click', ()=>closePopup(popup));
})

containerList.forEach((container) => {
  container.addEventListener('click', (evt) => evt.stopPropagation());
})

fullscreenContainer.addEventListener('click', (evt) => evt.stopPropagation());
