function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const hamburgerimg = document.querySelector('.hamburger > img');

    if (hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        nav.classList.remove('active')
        hamburgerimg.src = "assets/burger-menu-svgrepo-com.svg";
    } else {
        hamburger.classList.add('active');
        hamburgerimg.src = "assets/cross-svgrepo-com.svg";
        nav.classList.add('active')
    }
}

const address = document.querySelector('.address');
const contractAddress = document.querySelector('.contract-address');
const copyText = document.querySelector('.copy-text');

address.addEventListener('click', () => {
    // Create a temporary input element to copy the text
    const tempInput = document.createElement('input');
    tempInput.value = contractAddress.innerText; // Get the contract address text
    document.body.appendChild(tempInput);

    // Select and copy the text
    tempInput.select();
    document.execCommand('copy');

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    // Change the text of the .copy-text div to "Copied"
    copyText.innerText = 'Copied';

    // Show the "Copied" text for a short time before hiding it again
    setTimeout(() => {
        copyText.innerText = 'Click to copy address';
    }, 2000);
});

const images = [
    'assets/about/lalo-full.png',
    'assets/about/tuco-full.png',
    'assets/about/twins-full.png',
    'assets/about/hector-full.png'
];

let currentIndex = 0;

function rotateImages() {
    const img = document.querySelector('.story > div:nth-child(1) > img');

    img.classList.remove('active');
    void img.offsetWidth;
    img.src = images[currentIndex];
    img.classList.add('active');
    currentIndex = (currentIndex + 1) % images.length;
}

setInterval(rotateImages, 3000);

var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
});

document.querySelector('.play-icon').addEventListener('click', function () {
    const videoContainer = document.querySelector('.video-container');
    const video = document.getElementById('video');

    // Show the video container
    videoContainer.style.display = 'flex';

    // Play the video
    video.style.display = 'block';
    video.play();
});

// Optional: Close the video container when clicking outside the video
document.querySelector('.video-container').addEventListener('click', function (e) {
    if (e.target === this) {
        const video = document.getElementById('video');
        video.pause();
        video.currentTime = 0; // Reset video to start
        this.style.display = 'none';
    }
});