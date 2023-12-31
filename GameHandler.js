import {Ica} from './Ica.js';
import { Etelhordo } from './etelhordo.js';
import { Projectile } from './projectile.js';
import { WaveHandler } from './waveHandler.js';
import { Text } from './text.js';
export class GameHandler{
    #texts = [];
    constructor(ctx, width, height){
        const urlParams = new URLSearchParams(window.location.search);

        this.timerText = undefined;
        if (urlParams.has("timer")) {
            const paramTimer = !!+urlParams.get("timer");
            if (paramTimer) {
                this.timerText = new Text(ctx, this, "Time: {0}", 0);
                this.#texts.push(this.timerText);
            }
        }

        let icaHP = undefined;
        this.maxHPText = undefined;
        if (urlParams.has("icahp")) {
            const paramHP = +urlParams.get("icahp");
            // GameOver only runs on 'GotHit', so HP == 0 is no-hit mode.
            if (Number.isSafeInteger(paramHP) && paramHP != Ica.defaultHP) {
                icaHP = paramHP < 0 ? 0 : paramHP;
            }
        }
        if (icaHP != undefined) {
            this.maxHPText = new Text(ctx, this, "MHP: {0}", icaHP);
            this.#texts.push(this.maxHPText);
        }

        this.timescale = 1;
        this.speedText = undefined;
        if (urlParams.has("speed")) {
            const paramSpeed = Math.round((+urlParams.get("speed"))*100)/100;
            if (Number.isFinite(paramSpeed) && paramSpeed != 1 && paramSpeed > 0) {
                this.timescale = Math.round(paramSpeed*100)/100;
                this.speedText = new Text(ctx, this, "Speed: {0}x", this.timescale);
                this.#texts.push(this.speedText);
            }
        }

        this.ctx = ctx;
        this.enemies = [];
        this.Ica = new Ica(ctx, 0, 0, 128, 128, this, icaHP);
        this.width = width;
        this.height = height;
        this.startGameLoop = this.startGameLoop.bind(this);
        this.GameStarted = true;
        this.etelhordok= [];
        
        this.projectiles = [];
        this.waveHandler = new WaveHandler(this);
        this.waveHandler.firstWave();
        this.previousTime = performance.now();
        this.startTime = this.previousTime;
        this.totalTime = 0;
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
        for (const etelhordo of this.etelhordok) {
            etelhordo.draw();
            
        }
        for (const projectile of this.projectiles) {
            projectile.update();
            projectile.draw();

            
        }
        this.Ica.draw();
        this.updateTimer();
        this.drawTexts();

        requestAnimationFrame(this.startGameLoop);
        
    }
    calculateDeltaTime(){
        let currentTime = performance.now();
        this.deltaTime =(currentTime - this.previousTime) / 1000 * this.timescale;
        this.totalTime += this.deltaTime;
    }
    drawHitboxes(){
        this.Ica.drawHitbox();
        this.Ica.Kanal.drawHitbox();
        this.Ica.drawHitRange();
        for (const etelhordo of this.etelhordok) {
            etelhordo.drawHitbox();
            
        }
    }
    updateTimer(){
        if (this.timerText == undefined) {
            return;
        }
        this.timerText.value = this.totalTime;
    }
    drawTexts(){
        let currentY = 0;
        for (let i = 0; i < this.#texts.length; i++) {
            const element = this.#texts[i];
            currentY += element.size;
            element.draw(10, currentY)
        }
    }
    gameOver(){
        window.open("./gameover.html", "_self");
    }
    gameWin(){
        window.open("./win.html", "_self");
    }
}