'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// Opening the registration window by clicking on one of the buttons
btnsOpenModal.forEach((btn) => btn.addEventListener(`click`, openModal));

// Closing the registration window by clicking outside the window or on the close button
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Closing the registration window by pressing `ESC` button
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// Show registration account form function
function openModal(e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

// Hide register account form function
function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
