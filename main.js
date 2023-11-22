
import {GameHandler} from './GameHandler.js';

const canvas = document.getElementById('MainCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;








const gameHandler = new GameHandler(ctx, width, height);

window.addEventListener('load', gameHandler.startGameLoop);

window.addEventListener('resize', function () {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    gameHandler.width = width;
    gameHandler.height = height;
    }
);