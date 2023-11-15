import {Ica} from './Ica.js';
import { Etelhordo } from './etelhordo.js';
import { Projectile } from './projectile.js';
import { WaveHandler } from './waveHandler.js';
export class GameHandler{
    constructor(ctx, width, height){
        this.ctx = ctx;
        this.enemies = [];
        this.Ica = new Ica(ctx, 0, 0, 128, 128, this);
        this.width = width;
        this.height = height;
        this.startGameLoop = this.startGameLoop.bind(this);
        this.GameStarted = true;
        this.etelhordok= [];
        
        this.projectiles = [];
        this.waveHandler = new WaveHandler(this);
        this.waveHandler.firstWave();
        this.previousTime = performance.now();
        this.deltaTime = 0;

    }
    startGameLoop(){
        if(!this.GameStarted){
            return;
        }
        this.calculateDeltaTime();

        this.ctx.clearRect(0, 0, this.width, this.height);
        this.waveHandler.update();
        this.Ica.update();
        this.drawHitboxes();
        for (const etelhordo of this.etelhordok) {
            etelhordo.draw();
            
        }
        for (const projectile of this.projectiles) {
            projectile.update();
            projectile.draw();

            
        }
        this.Ica.draw();
        requestAnimationFrame(this.startGameLoop);
        
    }
    calculateDeltaTime(){
        let currentTime = performance.now();
        this.deltaTime =(currentTime - this.previousTime) / 1000;
        this.previousTime = currentTime;

    }
    drawHitboxes(){
        this.Ica.drawHitbox();
        this.Ica.Kanal.drawHitbox();
        this.Ica.drawHitRange();
        for (const etelhordo of this.etelhordok) {
            etelhordo.drawHitbox();
            
        }
    }
    gameOver(){
        this.GameStarted = false;
        this.ctx.font = "30px Arial";
        this.ctx.fillText("Game Over", 10, 50);
    }
    gameWin(){
        this.GameStarted = false;
        this.ctx.font = "30px Arial";
        this.ctx.fillText("You Win", 10, 50);
    }

    
}