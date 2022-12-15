import throttle from 'lodash.throttle';


const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const inputemail = document.querySelector('input[name=email]');
const inputMessage = document.querySelector('textarea[name=message]');
let formData = {};

populateInput();

form.addEventListener('input', throtle(setMessageToLocal, 500));
form.addEventListener('submit', resetAndSubmitForm);

function resetAndSubmitForm(e) {
    e.preventDefault();
    	const objSubmit = JSON.parse(localStorage.getItem(STORAGE_KEY))
	console.log(objSubmit);
	localStorage.removeItem(STORAGE_KEY);
	formData = {};
   form.reset();
}
function setMessageToLocal(e) {
   const message = e.target.value;

   formData[e.target.name] = message;
   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateInput() {
   const textForInput = localStorage.getItem(STORAGE_KEY);
   const obj = JSON.parse(textForInput);
   if (textForInput) {
      if (obj.email) {
         inputEmail.value = obj.email;
      }
      if (obj.message) {
         inputMessage.value = obj.message;
		}
		formData = obj;
   }
}