var allPostitElems = [];


function openCreatePostitModal(){
  var modalBackdrop = document.getElementById('modal-backdrop');
  var createPostitModal = document.getElementById('create-postit-modal');

  modalBackdrop.classList.remove('hidden');
  createPostitModal.classList.remove('hidden');
}

function closeCreatePostitModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createPostitModal = document.getElementById('create-postit-modal');

  modalBackdrop.classList.add('hidden');
  createPostitModal.classList.add('hidden');

//  clearTwitInputValues();
}

function generateNewPostitElem() {

  var postitTemplate = Handlebars.templates.postit;

  return postitTemplate();

}

function insertNewPostit() {

  var newPostitElem = generateNewPostitElem();
  var postitContainer = document.querySelector('.post-it-container');
  postitContainer.insertAdjacentHTML('beforeend', newPostitElem);
  allPostitElems.push(newPostitElem);

  closeCreatePostitModal();

}

var postitAcceptButton = document.getElementsByName('submit')[0];
postitAcceptButton.addEventListener('click', insertNewPostit);

var uploadImage = document.getElementsByClassName('postitem')[0];
uploadImage.addEventListener('click', openCreatePostitModal);

var modalCloseButton = document.getElementsByClassName('modal-close-button')[0];
modalCloseButton.addEventListener('click', closeCreatePostitModal);
