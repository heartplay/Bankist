'use strict';

// Selecting all needed elements
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
// Header
const header = document.querySelector(`.header`);
// All sections
const allSections = document.querySelectorAll(`.section`);
// All images in first section
const targetImg = document.querySelectorAll(`img[data-src]`);

// Initialization all functional
init();

function init() {
    // Registration window
    registrationWindow();
    // Sections navigation
    sectionsNavigation();
    // "Learn more" scroll button
    scrollToFirstSection();
    // Tabs on second section
    secondSectionTabNavigation();
    // Fading link menu
    fadeLinkMenu();
    // Sticky sections navigation panel
    stickyNavigationPanel();
    // Revealing sections on scroll
    revealingSections();
    // Lazy loading of images on first section
    lazyLoadImg();
}

// Modal account registration window
function registrationWindow() {
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

    // Show registration account window function
    function openModal(e) {
        e.preventDefault();
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    }
    // Hide registration account window function
    function closeModal(e) {
        e.preventDefault();
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    }
}

// Sections navigation with event delegation
function sectionsNavigation() {
    // Event listener for click on navigation link panel
    document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
        e.preventDefault();
        // Checking clicked element
        if (e.target.classList.contains(`nav__link`) && !e.target.classList.contains(`btn--show-modal`)) {
            const id = e.target.getAttribute(`href`);
            // Scrolling to section according to clicked link
            document.querySelector(id).scrollIntoView({ behavior: `smooth` });
        }
    });
}

// "Learn more" smooth scroll button
function scrollToFirstSection() {
    // Event listener for click on "Learn more" button
    btnScroll.addEventListener(`click`, function (e) {
        e.preventDefault();
        // Scrolling to first section
        section1.scrollIntoView({ behavior: `smooth` });
    });
}

// Tab navigation on second section
function secondSectionTabNavigation() {
    // Event listener for click on tabs panel
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
}

// Menu link fade animation
function fadeLinkMenu() {
    // Event listeners for mouse over and out on navigation panel
    nav.addEventListener(`mouseover`, handlerHoverOpacity.bind(0.5));
    nav.addEventListener(`mouseout`, handlerHoverOpacity.bind(1));

    // Handler function for menu link fade animation
    function handlerHoverOpacity(e) {
        e.preventDefault();
        if (e.target.classList.contains(`nav__link`)) {
            // Selecting hovered link
            const link = e.target;
            // Selecting all links
            const siblings = link.closest(`.nav`).querySelectorAll(`.nav__link`);
            // Selecting logo
            // const logo = link.closest(`.nav`).querySelector(`img`);
            // Making all links semitransparent except hovered
            siblings.forEach((el) => {
                if (el !== link) el.style.opacity = this;
            });
            // Making logo semitransparent
            // logo.style.opacity = this;
        }
    }
}

// Sticky navigation panel
function stickyNavigationPanel() {
    // Calculate height of navigation panel
    const navHeight = nav.getBoundingClientRect().height;
    // Create observer
    const headerObserver = new IntersectionObserver(stickyNavigation, {
        root: null,
        threshold: 0,
        rootMargin: `-${navHeight}px`,
    });
    // Set observer on header
    headerObserver.observe(header);

    // Callback function for observer for sticky navigation
    function stickyNavigation(entries) {
        const [entry] = entries;
        // Show navigation panel on top of viewport
        if (!entry.isIntersecting) nav.classList.add(`sticky`);
        // Hide navigation panel
        else nav.classList.remove(`sticky`);
    }
}

// Revealing sections on scroll
function revealingSections() {
    // Create observer
    const sectionsObserver = new IntersectionObserver(revealingSections, {
        root: null,
        threshold: 0.15,
    });
    // Hide all sections by default and set observers on them
    allSections.forEach((section) => {
        section.classList.add(`section--hidden`);
        sectionsObserver.observe(section);
    });

    // Callback function for observer for revealing sections
    function revealingSections(entries, observer) {
        const [entry] = entries;
        // Guard clause
        if (!entry.isIntersecting) return;
        // Show section
        entry.target.classList.remove(`section--hidden`);
        // Disable observer
        observer.unobserve(entry.target);
    }
}

// Lazy load images
function lazyLoadImg() {
    // Create observer
    const imgObserver = new IntersectionObserver(imgLoad, {
        root: null,
        threshold: 0,
        rootMargin: `-200px`,
    });
    // Set observer on all lazy loading images
    targetImg.forEach((img) => imgObserver.observe(img));

    // Callback function for observer for lazy load images
    function imgLoad(entries, observer) {
        const [entry] = entries;
        // Guard clause
        if (!entry.isIntersecting) return;
        // Switch image to high resolution image
        entry.target.src = entry.target.dataset.src;
        // Disable blur effect on high resolution image
        entry.target.addEventListener(`load`, () => entry.target.classList.remove(`lazy-img`));
        // Disable observer
        observer.unobserve(entry.target);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////                                  TESTING                        /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Testing revealing
function revealingSectionsTest(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) entry.target.classList.add(`section--hidden`);
    else entry.target.classList.remove(`section--hidden`);
}

// CLASS SECTION HIDDEN TRANSLATEY
// Testing for scroll to revealing sections
// document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
//     e.preventDefault();
//     if (e.target.classList.contains(`nav__link`) && !e.target.classList.contains(`btn--show-modal`)) {
//         const id = e.target.getAttribute(`href`);
//         const sectionCoords = document.querySelector(id).getBoundingClientRect();
//         window.scrollTo({
//             left: sectionCoords.left + window.pageXOffset,
//             top: sectionCoords.top + window.pageYOffset - navHeight,
//             behavior: `smooth`,
//         });
//     }
// });
