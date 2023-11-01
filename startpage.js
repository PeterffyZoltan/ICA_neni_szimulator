window.addEventListener('load', () => {
    startButtonGlow();
    createCircularBackground();
    dancingICA();
});

function startButtonGlow() {
    const startButton = document.getElementById("startButton");
    startButton.classList.add("glow-animation");
}

function createCircularBackground() {
    const background = document.getElementById("background");
    const foodCircles = document.querySelectorAll(".food-circle");

    const centerX = background.clientWidth / 2;
    const centerY = background.clientHeight / 2;
    const radius = background.clientWidth / 4;
    const numCircles = foodCircles.length;

    foodCircles.forEach((circle, index) => {
        const angle = (index / numCircles) * 2 * Math.PI;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        circle.style.display = "block";
        circle.style.transform = `translate(${centerX + x}px, ${centerY + y}px)`;
    });
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
