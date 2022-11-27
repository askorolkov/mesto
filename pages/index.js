const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close'); 
const popup = document.querySelector('.popup');
const saveButton = document.querySelector('.popup__save');
let formElement = document.querySelector('.popup__container');
const like = document.querySelectorAll('.photo__like');

function openPopup() {
  popup.classList.add('popup_open');
}

function closePopup(event) {
  popup.classList.remove('popup_open');
}

//слушатель событий на кнопки лайк под каждой фотографией
for (let i=0;i<like.length;i++) {
  like[i].addEventListener('click', function(){like[i].classList.toggle('photo__like_active')});
} 

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

let nameInput = formElement.querySelectorAll('.popup__input')[0];
let jobInput = formElement.querySelectorAll('.popup__input')[1];

console.log(document.querySelector('.profile__name'));

function handleFormSubmit (evt) {
  evt.preventDefault();     
  document.querySelector('.profile__name').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit); 