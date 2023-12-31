window.addEventListener('load', () => {
    dyingICA();
});

window.addEventListener('resize', () => {
    clearInterval(interval);
});

const restart = document.getElementById('restart').addEventListener('click', restartGame);

function restartGame() {
    window.open("./game.html" + window.location.search, "_self");
}

function dyingICA() {    
    const img = document.getElementById("ICAimg");
    const sources = [
        "assets/endpage/1.png",
        "assets/endpage/2.png",
        "assets/endpage/3.png",
        "assets/endpage/4.png",
        "assets/endpage/5.png",
        "assets/endpage/6.png",
    ];

    let index = 0;
    function changeImageSource() {
        img.src = sources[index];
        index = (index + 1) % sources.length;
    }
    const interval = setInterval(changeImageSource, 500);
}