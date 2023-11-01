window.addEventListener('load', () => {
    startButtonGlow();
    
});

function startButtonGlow() {
    const startButton = document.getElementById("startButton");
    startButton.classList.add("glow-animation");
}

