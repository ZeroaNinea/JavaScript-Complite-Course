/* Modal Window */
'use strict';

const modal = document.querySelector('#modal-window');
const overlay = document.querySelector('.overlay');

const closeModal = function() {
	modal.classList.remove('show');
	modal.classList.add('hide');
	overlay.style.display = 'none';
}
const openModal = function() {
	modal.classList.add('show');
	modal.classList.remove('hide');
	overlay.style.display = 'block';
}

const showModal = document.querySelectorAll('.show-modal');

for(let i = 0; i < showModal.length; i++) {
	showModal[i].addEventListener('click', openModal); // Show the modal window.
}
document.querySelector('[data-hide-modal]').addEventListener('click', closeModal); // Hide the modal window by click on the cross.
document.querySelector('.overlay').addEventListener('click', closeModal); // Hide the modal window by click on the window.
document.addEventListener('keydown', function(e) {
	if(e.key === ' ' || e.key === ';' && modal.classList.contains('show')) {
		closeModal();
	}
});