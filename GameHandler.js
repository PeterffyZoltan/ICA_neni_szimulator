import {Ica} from './Ica.js';
import { Etelhordo } from './etelhordo.js';
export class GameHandler{
    constructor(ctx, width, height){
        this.ctx = ctx;
        this.enemies = [];
        this.Ica = new Ica(ctx, 0, 0, 128, 128, this);
        this.width = width;
        this.height = height;
        this.startGameLoop = this.startGameLoop.bind(this);
        this.GameStarted = false;
        this.etelhordok= [];
        for (let num = 0; num < 5; num++) {
            this.etelhordok.push(new Etelhordo(this.ctx,Math.random()*1500,Math.random()*900,100));
            
        }
    


    }
    startGameLoop(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.Ica.update();
        this.Ica.draw();
        for (const etelhordo of this.etelhordok) {
            etelhordo.draw();
            etelhordo.update();
        }
        this.etelhordok[0].draw();
        this.etelhordok[0].update();

        requestAnimationFrame(this.startGameLoop);
        
    }

    
}