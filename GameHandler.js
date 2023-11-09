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
        while (this.etelhordok.length<5) {
            let x = Math.random()*1500;
            let y = Math.random()*900;
            if(x>this.Ica.width+this.Ica.x&&y>this.Ica.height+this.Ica.y){
                this.etelhordok.push(new Etelhordo(this.ctx,x,y,100));
            }
            
        }
    


    }
    startGameLoop(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.Ica.update();
        this.Ica.draw();
        for (const etelhordo of this.etelhordok) {
            etelhordo.draw();
            etelhordo.update();
            etelhordo.drawHitbox();
        }
        this.etelhordok[0].draw();
        this.etelhordok[0].update();

        requestAnimationFrame(this.startGameLoop);
        
    }

    
}