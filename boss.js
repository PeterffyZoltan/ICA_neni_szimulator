import { Projectile } from "./projectile.js";
import { HealthBar } from "./healthbar.js";
import { Kanal } from "./kanal.js";
import { Ica } from "./Ica.js";

export class Boss extends Projectile{
    constructor(gameHandler,  x, y, width, height, direction, rotation)
        {
            super(gameHandler, "./assets/nemTudomKiEz.png", x, y, width, height, direction, rotation);
            rotation = 0;
            this.speed = 400;
            this.damageFrequency = 100;
            this.damageScaling = 0.95;
            this.healthbar = new HealthBar(this.gameHandler.ctx, 200, 200, this.centerX - 50, this.centerY+this.height/2+10);
            this.isCollided = false;
            this.carryCollisionTime = 0;
        }
        draw(){
            this.update();
            super.draw();
            if(this.gameHandler.etelhordok.length > 1) return;
            this.healthbar.x = this.centerX - 50;
            this.healthbar.y = this.centerY+this.height/2+10;
            this.healthbar.draw();
            this.healthbar.update();
            if(this.healthbar.health <= 0){
                this.gameHandler.gameWin();
            }
            
        }

        dealPercentDamage(){
            const hp = this.gameHandler.Ica.healthbar;
            const hpDiff = (hp.maxHealth - Ica.defaultHP);
            let extraDamage = Math.pow(hpDiff / 10, this.damageScaling);

            hp.health -= extraDamage;
        }

        update(){
            this.centerX += this.Direction.x*this.gameHandler.deltaTime;
            this.centerY += this.Direction.y*this.gameHandler.deltaTime;
            this.angle += this.rotation*this.gameHandler.deltaTime;
           
            if(this.checkCollision(this.gameHandler.Ica)){
                if (this.isCollided) {
                    let loopCount = this.gameHandler.deltaTime*this.damageFrequency+this.carryCollisionTime;
                    for (let i = 0; i < this.gameHandler.deltaTime*this.damageFrequency; i++) {
                        this.gameHandler.Ica.gotHit();
                        this.dealPercentDamage();
                    }
                    this.carryCollisionTime = loopCount%1;
                }
                else{
                    this.gameHandler.Ica.gotHit();
                    this.dealPercentDamage();
                }
                this.isCollided = true;
                // this.gameHandler.projectiles.splice(this.gameHandler.projectiles.indexOf(this), 1);
            }
            else{
                this.isCollided = false;
                this.carryCollisionTime = 0;
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
            if (!this.destroyed) {
                this.healthbar.health-=Kanal.damage;
                this.healthbar.update();
                
            }
    
    
        }

}