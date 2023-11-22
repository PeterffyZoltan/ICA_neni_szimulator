import { Projectile } from "./projectile.js";
import { HealthBar } from "./healthbar.js";

export class Boss extends Projectile{
    constructor(gameHandler,  x, y, width, height, direction, rotation)
        {
            super(gameHandler, "./assets/nemTudomKiEz.png", x, y, width, height, direction, rotation);
            rotation = 0;
            this.speed = 400;
            this.healthbar = new HealthBar(this.gameHandler.ctx, 100, 100, this.centerX - 50, this.centerY+this.height/2+10);
               
        }
        draw(){
            this.update();
            super.draw();
            if(this.gameHandler.etelhordok.length > 1) return;
            this.healthbar.x = this.hitbox.x- this.healthbar.maxHealth/2+ this.hitbox.width/2;
            this.healthbar.y = this.hitbox.y + this.hitbox.height + 5;
            this.healthbar.draw();
            this.healthbar.update();
            if(this.healthbar.health <= 0){
                this.gameHandler.gameWin();
            }
            
        }
        update(){
            this.centerX += this.Direction.x*this.gameHandler.deltaTime;
            this.centerY += this.Direction.y*this.gameHandler.deltaTime;
            this.angle += this.rotation*this.gameHandler.deltaTime;
           
            if(this.checkCollision(this.gameHandler.Ica)){
                this.gameHandler.Ica.gotHit();
                // this.gameHandler.projectiles.splice(this.gameHandler.projectiles.indexOf(this), 1);
            }



            
    
        }
        

        get hitBoxStartX(){
            return this.hitbox.x;
            
        }
        get hitBoxEndX(){
            return this.hitbox.x+this.hitbox.width;
        }
        get hitboxStartY(){
            return this.hitbox.y;
        }
        get hitboxEndY(){
            return this.hitbox.y+this.hitbox.height;
        }
        
        get Direction(){
            const xDistance = this.gameHandler.Ica.x + this.gameHandler.Ica.width/2  - this.centerX;
            const yDistance = this.gameHandler.Ica.y + this.gameHandler.Ica.height/2 - this.centerY;
            const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
            const xSpeed = xDistance / distance * this.speed;
            const ySpeed = yDistance / distance * this.speed;
            return {x: xSpeed, y: ySpeed};
        }
       
        getHit(){
            if(this.gameHandler.etelhordok.length > 1) return;
            let damage = 5;
            if (!this.destroyed) {
                this.healthbar.health-=damage;
                this.healthbar.update();
                
            }
    
    
        }

}