'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.dots');

/* Modal Window */
const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/* /Modal Window */

/* Smooth Scrolling */
btnScrollTo.addEventListener('click', () => section1.scrollIntoView({ behavior: 'smooth' }));
// document.querySelector('.btn--scroll-to').addEventListener('click', () => window.scrollTo({ left: document.querySelector('#section--1').getBoundingClientRect().left + window.pageXOffset, top: document.querySelector('#section--1').getBoundingClientRect().top + window.pageYOffset, behavior: 'smooth' }));
// btnScrollTo.addEventListener('click', function(e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);

//   console.log(e.target.getBoundingClientRect());

//   console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

//   console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);

//   // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);
//   // window.scrollTo({
//   //   left: s1coords.left + window.pageXOffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();

  if(e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    const scrl = document.querySelector(id).getBoundingClientRect();

    console.log(scrl.top);
    window.scrollTo({
      left: scrl.left + window.pageXOffset,
      top: scrl.top + window.pageYOffset,
      behavior: 'smooth',
    });
    console.log(window.pageYOffset);
  }
});
/* Smooth Scrolling */
/* Tabs */
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');

  // Geard clause
  if(!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});
/* /Tabs */
/* Menu fade animation */
// const handleHover = function(e, opacity) {
//   if(e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if(el !== link) el.style.opacity = this;
//     });
//     logo.style.opacity = this;
//   }
// }

// Passing "argument" into handler
// nav.addEventListener('mouseover', handleHover.bind(0.5));
// nav.addEventListener('mouseout', handleHover.bind(1));
// /* /Menu fade animation */
// /* Sticky navigation */
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function() {
//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
// const obsCallBack = function(entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// }

// const obsOptions = {
//   root: null,
//   threashold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
  const [entry] = entries;

  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threashold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
/* /Sticky navigation */
/* Reveal sections */
const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
/* /Reveal sections */
/* Lazy loading images */
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
  const [entry] = entries;
  
  if(!entry.isIntersecting) return;

  // Replace src data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));
/* /Lazy loading images */
/* Slider */
const slider = function() {
  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function() {
    slides.forEach(function(_, i) {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
    });
  }

  const activateDot = function(slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  }

  const goToSlide = function(slide) {
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
  }

  // Next slide
  const nextSlide = function() {
    curSlide === maxSlide -1 ? curSlide = 0 : curSlide++;

    goToSlide(curSlide);
    activateDot(curSlide);
  }
  // Prev slide
  const prevSlide = function() {
    curSlide === 0 ? curSlide = maxSlide - 1 : curSlide--;

    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const init = function() {
    goToSlide(0);
    createDots();
    activateDot(0);
  }
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function(e) {
    if(e.key === 'ArrowLeft') prevSlide();
    if(e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function(e) {
    if(e.target.classList.contains('dots__dot')) {
      const {slide} = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
}
slider();
/* /Slider */
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
{ // Selecting, Creating, and Deleting Elements
  // const message = document.createElement('div');
  // message.classList.add('cookie-message');

  // const header = document.querySelector('.header');

  // message.innerHTML = 'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

  // header.append(message);

  // document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  //   message.remove();
  // });

  // // Styles, Attributes and Classes
  // message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

  // document.documentElement.style.setProperty('--color-primary', 'orangered');
}
{ // Lifecycle DOM Events
  document.addEventListener('DOMContentLoaded', function(e) {
    console.log('HTML parsed and DOM tree built!', e);
  });

  window.addEventListener('load', function(e) {
    console.log('Page fully loaded', e);
  });
}