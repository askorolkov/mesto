//кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelectorAll('.popup__close');
const addPlaceButton = document.querySelector('.profile__add-button');
//попапы
const profileEditPopup = document.querySelector('#editProfile');
const placeAddPopup = document.querySelector('#addPlace');
const photoPopup = document.querySelector('.photo__popup');
//шаблоны
const placeTemplate = document.querySelector('#place').content;
//поля ввода
let placeInputLink = document.querySelector('#placeLink');
let placeInputName = document.querySelector('#placeName');
let nameInputField = document.querySelector('#formName');
let jobInputField = document.querySelector('#formJob');
//формы
const profileForm = document.querySelector('#profileForm');
const placeForm = document.querySelector('#placeForm');
//остальные элементы
const photo = document.querySelector('.photo');
const photoElements = document.querySelectorAll('.photo__element');
const photoFullscreen = document.querySelector('.photo__fullscreen-image');
const photoText = document.querySelector('.photo__text');
let formElement = document.querySelectorAll('.popup__container');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Функция для добавления карточек из шаблона
function addNewPlace(link,name) {
  const placeElement = placeTemplate.querySelector('.photo__wrapper').cloneNode(true);
  placeElement.querySelector('.photo__element').src = link;
  placeElement.querySelector('.photo__element').alt = name;
  placeElement.querySelector('.photo__location').textContent = name;
  placeElement.querySelector('.photo__element').addEventListener('click', openPhotoFullscreen);
  placeElement.querySelector('.photo__like').addEventListener('click', (evt)=>evt.target.classList.toggle('photo__like_active'));
  placeElement.querySelector('.photo__delete').addEventListener('click', ()=>placeElement.remove());
  photo.prepend(placeElement);
}

//Добавляем 6 дефолтных карточек из шаблона циклом
for (let j=0;j<initialCards.length;j++) {
  let link = initialCards[j]['link'];
  let placeName = initialCards[j]['name'];
  addNewPlace(link, placeName);
}

// Функции открытия попапов
function openEditPopup() {
  profileEditPopup.classList.add('popup_open');
  // Подставляем данные в форму из профиля
  nameInputField.value = profileName.textContent;
  jobInputField.value = profileJob.textContent;
}

function openPlacePopup() {
  placeAddPopup.classList.add('popup_open');
}

function openPhotoFullscreen(evt) {
  photoFullscreen.src = evt.srcElement.currentSrc;
  photoText.textContent = evt.srcElement.alt;
  photoPopup.classList.add('popup_open');
}

//Цикл для добавления слушателей событий на кнопки закрытия форм
closeButton.forEach((button)=> button.addEventListener('click', closePopup));

//функция закрытия попапов
function closePopup(evt) {
  let pop = evt.target.closest('.popup');
  let photoPop = evt.target.closest('.photo__popup');
  if (pop) {
    evt.target.closest('.popup').classList.remove('popup_open');
  }
  if (photoPop) {
    evt.target.closest('.photo__popup').classList.remove('popup_open');
  }
}

//Функция отправки формы
function handleFormSubmit (evt) {
  evt.preventDefault();
  let edit = evt.target.closest('#editProfile')
  let add = evt.target.closest('#addPlace')
  //если это форма редактирования профиля - подставляем значения в поля ввода
  if (edit) {
    profileName.textContent = nameInputField.value;
    profileJob.textContent = jobInputField.value;
  }
  //если это форма добавления места - вызываем функцию добавления карточки
  //и обнуляем поля ввода
  if (add) {
    addNewPlace(placeInputLink.value, placeInputName.value);
    placeInputLink.value = '';
    placeInputName.value = '';
  }
  closePopup(evt);
}

profileEditButton.addEventListener('click', openEditPopup);
addPlaceButton.addEventListener('click', openPlacePopup);

//циклом добавляем обработчики событий на обе формы
formElement.forEach((item)=> item.addEventListener('submit', handleFormSubmit));
