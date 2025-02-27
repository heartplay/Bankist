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
// Slider in third section
const sliderContainer = document.querySelector(`.slider`);
// All slides in slider
const slides = document.querySelectorAll(`.slide`);
// Left button for slider
const btnLeft = document.querySelector(`.slider__btn--left`);
// Right button for slider
const btnRight = document.querySelector(`.slider__btn--right`);
// Dot buttons container for slider
const dotContainer = document.querySelector(`.dots`);
// Sign up section
const signUpSection = document.querySelector(`.section--sign-up`);

let currentSection, timer;

// Initialization all functionality
init();

function init() {
    currentSection = 1;
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
    // Slider in third section
    slider();

    sectionsKeyboardNavigation();
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
        // threshold: 0.15,
        threshold: [0.15, 0.3],
    });
    // Hide all sections by default and set observers on them
    allSections.forEach((section) => {
        section.classList.add(`section--hidden`);
        sectionsObserver.observe(section);
    });

    // Callback function for observer for revealing sections
    function revealingSections(entries, observer) {
        // const [entry] = entries;
        // // Guard clause
        // if (!entry.isIntersecting) return;
        // // Show section
        // entry.target.classList.remove(`section--hidden`);
        // currentSection = entry.target.dataset.section;
        // // Disable observer
        // // observer.unobserve(entry.target);

        entries.forEach((entry) => {
            if (entry.intersectionRatio >= 0.15) entry.target.classList.remove(`section--hidden`);
            if (entry.intersectionRatio >= 0.3) {
                currentSection = entry.target.dataset.section;
            }
        });
    }
}

function sectionsKeyboardNavigation() {
    const maxSection = allSections.length;
    const singUpSectionObserver = new IntersectionObserver(activateArrowNavigation, {
        root: null,
        threshold: 0.15,
    });
    singUpSectionObserver.observe(signUpSection);
    function activateArrowNavigation(entries, observer) {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        currentSection = signUpSection.dataset.section;
        observer.unobserve(signUpSection);
        document.addEventListener(`keydown`, function (e) {
            if (e.key == `ArrowUp`) {
                prevSection(e);
            }
            if (e.key == `ArrowDown`) {
                nextSection(e);
            }
        });
    }
    function goToSection(section) {
        document.querySelector(`#section--${section}`).scrollIntoView({ behavior: `smooth` });
    }
    function prevSection(e) {
        e.preventDefault();
        if (currentSection == 1) currentSection = maxSection;
        else currentSection--;
        goToSection(currentSection);
    }
    function nextSection(e) {
        e.preventDefault();
        if (currentSection == maxSection) currentSection = 1;
        else currentSection++;
        goToSection(currentSection);
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

// Slider
function slider() {
    // Caclulate zero based amount of slides
    const maxSlide = slides.length - 1;
    // Set current slide to show
    let currentSlide = 0;
    // Initialization slider
    initSlider();
    // Event listeners for click on dot buttons for navigating slides
    dotContainer.addEventListener(`click`, function (e) {
        if (e.target.classList.contains(`dots__dot`)) {
            // Set current slide according to which dot button is clicked
            currentSlide = +e.target.dataset.slide;
            // Show current slide
            goToSlide(currentSlide);
            // Highlight current slide dot button
            activateDot();
            // clearInterval(timer);
            // timer = slideShow();
        }
    });
    // Event listeners for click on left and right buttons for navigating slides
    btnRight.addEventListener(`click`, nextSlide);
    btnLeft.addEventListener(`click`, prevSlide);
    // Event listeners for pressing left and right arrow on keyboard for navigating slides
    document.addEventListener(`keydown`, (e) => {
        // e.preventDefault();
        e.key == `ArrowLeft` && prevSlide();
        e.key == `ArrowRight` && nextSlide();
    });

    // Init function for slider
    function initSlider() {
        // Create dot buttons for each slide
        createDots();
        // Show initial slide
        goToSlide(currentSlide);
        // Highlight initial slide dot button
        activateDot();

        // timer = slideShow();
    }

    // Show current slide
    function goToSlide(currentSlide) {
        slides.forEach((slide, i) => (slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`));
    }

    // Show previous slide
    function prevSlide() {
        if (currentSlide == 0) currentSlide = maxSlide;
        else currentSlide--;
        // clearInterval(timer);
        goToSlide(currentSlide);
        activateDot();
        // timer = slideShow();
    }

    // Show next slide
    function nextSlide() {
        if (currentSlide == maxSlide) currentSlide = 0;
        else currentSlide++;
        // clearInterval(timer);
        goToSlide(currentSlide);
        activateDot();
        // timer = slideShow();
    }

    // Create dot buttons for each slide
    function createDots() {
        slides.forEach((_, i) => {
            // Creating html button with data number according to slide index
            dotContainer.insertAdjacentHTML(
                `beforeend`,
                `
                <button class="dots__dot" data-slide="${i}"></button>
                `
            );
        });
    }

    // Highlight current slide dot button
    function activateDot() {
        // Remove active classes
        document.querySelectorAll(`.dots__dot`).forEach((dot) => dot.classList.remove(`dots__dot--active`));
        // Activate dot
        document.querySelector(`.dots__dot[data-slide="${currentSlide}"]`).classList.add(`dots__dot--active`);
    }

    // function slideShow() {
    //     return setInterval(nextSlide, 10000);
    // }
}

// slider.style.transform = `scale(0.4) translateX(-1000px)`;
// slider.style.overflow = `visible`;

// slides.forEach((slide, i) => (slide.style.transform = `translateX(${100 * i}%)`));

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
