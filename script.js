'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);

// Modal account registration window
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

// "Learn more" smooth scroll button
btnScroll.addEventListener(`click`, function (e) {
    e.preventDefault();
    section1.scrollIntoView({ behavior: `smooth` });
});

// Section navigation with event delegation
document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
    e.preventDefault();
    if (e.target.classList.contains(`nav__link`) && !e.target.classList.contains(`btn--show-modal`)) {
        const id = e.target.getAttribute(`href`);
        document.querySelector(id).scrollIntoView({ behavior: `smooth` });
    }
});

// Tabs on section 2
const tabs = document.querySelectorAll(`.operations__tab`);
const tabsContainer = document.querySelector(`.operations__tab-container`);
const tabsContent = document.querySelectorAll(`.operations__content`);

tabsContainer.addEventListener(`click`, function (e) {
    e.preventDefault();
    // Select clicked tab
    const clickedTab = e.target.closest(`.operations__tab`);
    // Guard clause
    if (!clickedTab) return;
    // Remove active classes
    tabs.forEach((tab) => tab.classList.remove(`operations__tab--active`));
    tabsContent.forEach((content) => content.classList.remove(`operations__content--active`));
    // Activate tab
    clickedTab.classList.add(`operations__tab--active`);
    // Activate content area
    document
        .querySelector(`.operations__content--${clickedTab.dataset.tab}`)
        .classList.add(`operations__content--active`);
});

// Show registration account form function
function openModal(e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

// Hide register account form function
function closeModal(e) {
    e.preventDefault();
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
