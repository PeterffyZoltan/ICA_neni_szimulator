import {GameHandler} from "./GameHandler.js";

window.addEventListener('load', () => {
    startButtonGlow();
    createCircularBackground();
    dancingICA();
    foodcarriersCircling();
});

window.addEventListener('resize', () => {
    createCircularBackground();
});

function startButtonGlow() {
    const startButton = document.getElementById("startButton");
    startButton.classList.add("glow-animation");
}

function createCircularBackground() {
    const container = document.getElementById("container");
    const foodCircles = document.querySelectorAll(".food-circle");

    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;

    const radius = centerX / 2;

    const numCircles = foodCircles.length;

    foodCircles.forEach((circle, index) => {
        const angle = (index / numCircles) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        circle.style.display = "block";
        circle.style.transform = `translate(${x}px, ${y}px)`;
    });
}

function foodcarriersCircling() {
    const foodCircles = document.querySelectorAll(".food-circle");
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = centerX / 2;
    const numCircles = foodCircles.length;

    let angle = 0;
    const angleIncrement = (2 * Math.PI) / numCircles;

    function moveFoodCarriers() {
        foodCircles.forEach((circle, index) => {
            const x = centerX + radius * Math.cos(angle + index * angleIncrement);
            const y = centerY + radius * Math.sin(angle + index * angleIncrement);

            circle.style.transform = `translate(${x}px, ${y}px)`;
        });

        angle -= 0.02; 
    }

    setInterval(moveFoodCarriers, 50);
}


function dancingICA() {    
    const img = document.getElementById("ICAimg");
    const sources = [
        "assets/startpage/front.png", 
        "assets/startpage/T.png",
        "assets/startpage/right.png",
        "assets/startpage/T.png",
        "assets/startpage/left.png",
        "assets/startpage/T.png",
    ];

    let index = 0;
    function changeImageSource() {
        img.src = sources[index];
        index = (index + 1) % sources.length;
    }
    const interval = setInterval(changeImageSource, 500);
}

// function startGame() {
//     const gameHandler = new GameHandler(ctx, width, height);
//     gameHandler.startGameLoop();
// }
