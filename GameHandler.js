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
            let etelhordo = new Etelhordo(this.ctx,x,y,100);
            if(x>this.Ica.width+this.Ica.x
                &&y>this.Ica.height+this.Ica.y
                &&etelhordo.sizeX+x<this.width
                &&etelhordo.sizeY+y<this.height){
                    
                this.etelhordok.push(etelhordo);
            }
            
        }
    


    }
    startGameLoop(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        for (const etelhordo of this.etelhordok) {
            etelhordo.draw();
            etelhordo.drawHitbox();
        }
        
        this.Ica.update();
        this.Ica.draw();
        requestAnimationFrame(this.startGameLoop);
        
    }

    
}