// swipper
// forward
const nextButton = document.querySelector('.tg-swiper-next');

const swiperWrapper = document.querySelector('.swiper-wrapper');

let clickCount = 0;

nextButton.addEventListener('click', function() {

  clickCount++;

  if (clickCount <= 5) {

    const translationValue = -400 * clickCount;

    const style = `transition-duration: 1000ms; transform: translate3d(${translationValue}px, 0px, 0px);`;

    swiperWrapper.setAttribute('style', style);
  }
});

// Get the element with the class "swiper-pagination-progressbar-fill"
const progressbarFill = document.querySelector('.swiper-pagination-progressbar-fill');

// Initialize the initial scaleX value
let scaleXValue = 0.1666666666666667;

// Add click event listener to the nextButton
nextButton.addEventListener('click', function() {
  // Increment the scaleX value
  scaleXValue += 0.1666666666666667;

  // Update the style of the progressbarFill element
  progressbarFill.style.transform = `scaleX(${scaleXValue})`;
});




// scroll by nav
const sectionLinks = document.querySelectorAll('.section-link');

sectionLinks[1].addEventListener('click', scrollToMinting);
sectionLinks[6].addEventListener('click', scrollToMinting);

function scrollToMinting(event) {
  event.preventDefault();

  const mintingSection = document.getElementById('minting');

  mintingSection.scrollIntoView({ behavior: 'smooth' });
}

sectionLinks[2].addEventListener('click', scrollToAbout);
sectionLinks[3].addEventListener('click', scrollToAbout);
sectionLinks[7].addEventListener('click', scrollToAbout);
sectionLinks[8].addEventListener('click', scrollToAbout);

function scrollToAbout(event) {
  event.preventDefault();
  
  const mintingSection = document.getElementById('about');
  
  mintingSection.scrollIntoView({ behavior: 'smooth' });
}

sectionLinks[4].addEventListener('click', scrollToRoadmap);
sectionLinks[9].addEventListener('click', scrollToRoadmap);

function scrollToRoadmap(event) {
  event.preventDefault();
  
  const mintingSection = document.getElementById('roadmap');
  
  mintingSection.scrollIntoView({ behavior: 'smooth' });
}


// mobile menu
const mobileNavToggler = document.querySelector('.mobile-nav-toggler');

const closeBtn = document.querySelector('.close-btn');

mobileNavToggler.addEventListener('click', function() {
  const body = document.querySelector('body');
  
  body.classList.add('mobile-menu-visible');
});

closeBtn.addEventListener('click', function() {

  const body = document.querySelector('body');
  
  body.classList.remove('mobile-menu-visible');
});

sectionLinks[6].addEventListener('click', closeMobileMenu);
sectionLinks[7].addEventListener('click', closeMobileMenu);
sectionLinks[8].addEventListener('click', closeMobileMenu);
sectionLinks[9].addEventListener('click', closeMobileMenu);

function closeMobileMenu(){
  const body = document.querySelector('body');
  
  body.classList.remove('mobile-menu-visible');
}

let subMenu = document.querySelectorAll('.sub-menu')[1];
let dropDownBtn = document.querySelectorAll('.dropdown-btn')[0];

dropDownBtn.addEventListener('click', openSubMenuMobile);

function openSubMenuMobile(){
  subMenu.style.display = "block"
  dropDownBtn.classList.add("open");
}




// sticky header
window.addEventListener('scroll', function() {
  var header = document.querySelector('.tg-header__area');
  var sticky = window.scrollY > 80;

  if (sticky) {
    header.classList.add('sticky-menu');
  } else {
    header.classList.remove('sticky-menu');
  }
});




// Get all the accordion buttons
const accordionButtons = document.querySelectorAll('.accordion-button');

// Add click event listener to each accordion button
accordionButtons.forEach(button => {
  button.addEventListener('click', toggleAccordion);
});

function toggleAccordion() {
  // Get the parent element of the clicked button
  const parent = this.closest('.accordion-item');

  // Get the collapse element associated with the parent
  const collapse = parent.querySelector('.accordion-collapse');

  // Get the accordion button
  const button = parent.querySelector('.accordion-button');

  // Check if the collapse element is already expanded
  const isExpanded = collapse.classList.contains('show');

  // Close all other collapse elements
  closeAllAccordions();

  if (!isExpanded) {
    // Open the clicked collapse element
    collapse.classList.add('show');
    button.classList.remove('collapsed');
  } else {
    button.classList.add('collapsed');
  }
}

function closeAllAccordions() {
  // Get all the collapse elements
  const collapses = document.querySelectorAll('.accordion-collapse');

  // Remove the 'show' class from all collapse elements
  collapses.forEach(collapse => {
    collapse.classList.remove('show');
  });
}





// scroll to the top

const scrollButton = document.querySelector('.scroll-to-target');
scrollButton.addEventListener('click', scrollToTop);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}




// theme change

const toggle_class = document.querySelector('.modeSwitch')
toggle_class.addEventListener('change',()=> {
  toggleTheme();
})

// set toggle theme scheme
function tg_set_scheme(tg_theme) {
    localStorage.setItem('tg_theme_scheme', tg_theme);
    document.documentElement.setAttribute("tg-theme", tg_theme);
}

// toggle theme scheme
function toggleTheme() {
    if (localStorage.getItem('tg_theme_scheme') === 'dark') {
        tg_set_scheme('light');
    } else {
        tg_set_scheme('dark');
    }
}

// set the first theme scheme
function tg_init_theme() {
    if (localStorage.getItem('tg_theme_scheme') === 'dark') {
        tg_set_scheme('dark');
        document.querySelector('.modeSwitch').checked = true;
    } else {
        tg_set_scheme('light');
        document.querySelector('.modeSwitch').checked = false;
    }
}
tg_init_theme();