var floor = document.querySelector('.floor');
var bigLeftMountain = document.querySelector('.big-left-mountain');
var bigRightMountain = document.querySelector('.big-right-mountain');
var smallRightMountain = document.querySelector('.small-right-mountain');
var smallLeftMountain = document.querySelector('.small-left-mountain');
var bgMountains = document.querySelector('.bg-mountains');
var clouds = document.querySelector('.clouds');
var spaceShip = document.querySelector('.space-ship');
var character = document.querySelector('#character');

window.addEventListener('load', function () {
    Preloader();
});

function Preloader() {
    setTimeout(function () {
        var preloadElements = document.querySelectorAll('.preload');
        preloadElements.forEach(function (element) {
            element.style.transition = 'opacity 0.6s';
            element.style.opacity = '0';
            setTimeout(function () {
                element.parentNode.removeChild(element);
            }, 600); // Match the transition duration
        });

        heroAnimation()

    }, 1200);
};

function heroAnimation() {
    if (floor) floor.classList.add('animate');
    if (bigLeftMountain) bigLeftMountain.classList.add('animate');
    if (bigRightMountain) bigRightMountain.classList.add('animate');
    if (smallRightMountain) smallRightMountain.classList.add('animate');
    if (smallLeftMountain) smallLeftMountain.classList.add('animate');
    if (bgMountains) bgMountains.classList.add('animate');
    if (clouds) clouds.classList.add('animate');
    if (spaceShip) spaceShip.classList.add('animate');
    if (character) character.classList.add('animate');
}

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});



var canvas;
var context;
var screenH;
var screenW;
var stars = [];
var starfps = 60;
var moonfps = 60;
var numStars = 500;
var xmoon = 1400, ymoon = 15;
var lmoon = 100, wmoon = 100;
var intervalStars, intervalMoon;

$('document').ready(function() {
	screenH = $(window).height();
	screenW = $(window).width();
	canvas = $('#deepspace');
	canvas.attr('height', screenH/2);
	canvas.attr('width', screenW);
	context = canvas[0].getContext('2d');	
  
	for(var i = 0; i < numStars; i++) {
		var x = Math.round(Math.random() * screenW);
		var y = Math.round(Math.random() * screenH);
		var length = 1 + Math.random() * 1.5;
		var opacity = Math.random();
 		var star = new buildStar(x, y, length, opacity);
		stars.push(star);
	}
	intervalStars = setInterval(animStars, 1000 / starfps);
});

function animStars() {
	context.clearRect(0, 0, screenW, screenH);
	$.each(stars, function() {
		this.draw(context);
	})
}

function stopAnimation() {
  clearInterval(animStars);
  clearInterval(animMoon);
}

function buildStar(x, y, length, opacity) {
	this.x = parseInt(x);
	this.y = parseInt(y);
	this.length = parseInt(length);
	this.opacity = opacity;
	this.factor = 1;
	this.increment = Math.random() * .03;
}

buildStar.prototype.draw = function() {
	context.rotate((Math.PI * 1 / 10));
	context.save();
	context.translate(this.x, this.y);
	
	if(this.opacity > 1) {
		this.factor = -1;
	}
	else if(this.opacity <= 0) {
		this.factor = 1;
		this.x = Math.round(Math.random() * screenW);
		this.y = Math.round(Math.random() * screenH);
	}
		
	this.opacity += this.increment * this.factor;
	
	context.beginPath()
	for (var i = 5; i--;) {
		context.lineTo(0, this.length);
		context.translate(0, this.length);
		context.rotate((Math.PI * 2 / 10));
		context.lineTo(0, - this.length);
		context.translate(0, - this.length);
		context.rotate(-(Math.PI * 6 / 10));
	}
	context.lineTo(0, this.length);
	context.closePath();
	context.fillStyle = "rgba(255, 255, 200, " + this.opacity + ")";
	context.shadowBlur = 5;
	context.shadowColor = '#fff';
	context.fill();
	context.restore();
}

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
    anchor.addEventListener('click', function (e) {
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
