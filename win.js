const restart = document.getElementById('restart').addEventListener('click', restartGame);

function restartGame() {
    window.open("./game.html" + window.location.search, "_self");
}