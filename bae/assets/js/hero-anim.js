var characterImg = document.querySelectorAll(".character")

window.addEventListener('load', function() {
    Preloader();
    updateImageSource()
});

function Preloader() {
    setTimeout(function() {
        var preloadElements = document.querySelectorAll('.preload');
        preloadElements.forEach(function(element) {
            element.style.transition = 'opacity 0.6s';
            element.style.opacity = '0';
            setTimeout(function() {
                element.parentNode.removeChild(element);
            }, 600); // Match the transition duration
        });

        heroAnimation()

    }, 1200);
};

function heroAnimation() {
    characterImg.forEach((element) => {
        element.classList.add('anim')
    });
}

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

function copyToClipboard(element) {
    // Find the closest parent .code-box and get the .code-text
    const codeBox = element.closest('.code-box');
    const codeText = codeBox.querySelector('.code-text').textContent;

    // Copy the codeText to the clipboard
    navigator.clipboard.writeText(codeText).then(() => {
        // Find the .hover-text element and add the 'show' class to make it visible
        const hoverText = codeBox.querySelector('.hover-text');
        hoverText.classList.add('show');

        // Remove the 'show' class after 3 seconds
        setTimeout(() => {
            hoverText.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}


document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetID = this.getAttribute('href');
        const targetSection = document.querySelector(targetID);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


document.querySelectorAll('.accordion').forEach(button => {
    button.addEventListener('click', () => {
        const icon = button.querySelector('.toggle-icon');
        const panel = button.nextElementSibling;

        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            icon.src = "data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTEgMTFoLTcuMjVjLS40MTQgMC0uNzUuMzM2LS43NS43NXMuMzM2Ljc1Ljc1Ljc1aDcuMjV2Ny4yNWMwIC40MTQuMzM2Ljc1Ljc1Ljc1cy43NS0uMzM2Ljc1LS43NXYtNy4yNWg3LjI1Yy40MTQgMCAuNzUtLjMzNi43NS0uNzVzLS4zMzYtLjc1LS43NS0uNzVoLTcuMjV2LTcuMjVjMC0uNDE0LS4zMzYtLjc1LS43NS0uNzVzLS43NS4zMzYtLjc1Ljc1eiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+"; // Change to plus icon
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            icon.src = "data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMjEgMTEuNzVjMC0uNDE0LS4zMzYtLjc1LS43NS0uNzVoLTE2LjVjLS40MTQgMC0uNzUuMzM2LS43NS43NXMuMzM2Ljc1Ljc1Ljc1aDE2LjVjLjQxNCAwIC43NS0uMzM2Ljc1LS43NXoiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg=="; // Change to minus icon
        }
    });
});

function updateImageSource() {
    const tokenomicsImg = document.querySelector('.tokenomics-img');
    if (window.innerWidth <= 768) {
        tokenomicsImg.src = 'assets/images/tokenomics/tokenomics-mobile.svg';
    }
}