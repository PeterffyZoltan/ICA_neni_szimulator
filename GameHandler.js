import {Ica} from './Ica.js';
import { Etelhordo } from './etelhordo.js';
import { Projectile } from './projectile.js';
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
        this.projectiles = [];
        // for (let index = 0; index < 5; index++) {
        //     //starting from outside of the screen
        //     let x = this.width;
        //     let y = Math.random()*900;
        //     //direction is a vector
        //     let direction = {x: -10, y: 0};
        //     //rotation is in degrees
        //     let rotation = Math.random()*5;
        //     //creating the projectile
        //     let projectile = new Projectile(this, "./assets/foodcarrier.png", x, y, 50, 50, direction, rotation);
        //     //adding it to the array
        //     this.projectiles.push(projectile);    
        // }
    
        // this.projectileInterval = setInterval(() => {
        //     //starting from outside of the screen
        //     let x = this.width;
        //     let y = Math.random()*900;
        //     //direction is a vector
        //     let direction = {x: -10, y: 0};
        //     //rotation is in degrees
        //     let rotation = Math.random()*5;
        //     //creating the projectile
        //     let projectile = new Projectile(this, "./assets/foodcarrier.png", x, y, 50, 50, direction, rotation);
        //     //adding it to the array
        //     this.projectiles.push(projectile);    
        // }, 200);

    }
    startGameLoop(){
        if(!this.GameStarted){
            return;
        }

        this.ctx.clearRect(0, 0, this.width, this.height);
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

    
}