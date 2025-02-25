'use strict';

// Registration account window
const modal = document.querySelector('.modal');
// Overlay for UI with opened registration account window
const overlay = document.querySelector('.overlay');
// Close button for registration account window
const btnCloseModal = document.querySelector('.btn--close-modal');
// Open buttons for registration account window
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// Scroll button to first section
const btnScroll = document.querySelector(`.btn--scroll-to`);
// First section
const section1 = document.querySelector(`#section--1`);
// All tabs in second section
const tabs = document.querySelectorAll(`.operations__tab`);
// Tabs container for second section
const tabsContainer = document.querySelector(`.operations__tab-container`);
// All content for second section
const tabsContent = document.querySelectorAll(`.operations__content`);
// Navigation panel
const nav = document.querySelector(`.nav`);

// Modal account registration window
// Opening the registration window by clicking on one of the buttons
btnsOpenModal.forEach((btn) => btn.addEventListener(`click`, openModal));
// Closing the registration window by clicking outside the window or on the close button
btnCloseModal.addEventListener('click', (e) => closeModal(e));
overlay.addEventListener('click', (e) => closeModal(e));
// Closing the registration window by pressing `ESC` button
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal(e);
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

// Tab navigation on second section
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

// Menu link fade animation
nav.addEventListener(`mouseover`, handlerHoverOpacity.bind(0.5));
nav.addEventListener(`mouseout`, handlerHoverOpacity.bind(1));

// Functions

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

// Handler function for menu link fade animation
function handlerHoverOpacity(e) {
    e.preventDefault();
    if (e.target.classList.contains(`nav__link`)) {
        // Selecting hovered link
        const link = e.target;
        // Selecting all links except hovered
        const siblings = link.closest(`.nav`).querySelectorAll(`.nav__link`);
        // Selecting logo
        const logo = link.closest(`.nav`).querySelector(`img`);
        // Making all links semitransparent except hovered
        siblings.forEach((el) => {
            if (el !== link) el.style.opacity = this;
        });
        // Making logo semitransparent
        logo.style.opacity = this;
    }
}
