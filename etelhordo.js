import { HealthBar } from "./healthbar.js";
import { Kanal } from "./kanal.js";
export class Etelhordo{
    constructor(Gamehandler,x,y,health,sizeX=100,sizeY=100,healthBar){
        this.ctx = Gamehandler.ctx;
        this.imagePath = "assets/foodcarrier.png";
        this.x = x;
        this.y = y;
        this.health = health;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.img = new Image();
        this.spriteImage = new Image();
        let randomIndex = Math.floor((Math.random()*10)/2)+1;
        this.spriteImage.src= `assets/boom${randomIndex}.png`;
        this.img.src =this.imagePath;
        this.healthbar= new HealthBar(this.ctx,100,100,this.x,this.y+this.sizeY-10);
        this.clang = new Audio('./assets/Etelhordo_hang.mp3');
        this.hitBoxStartX = this.x+this.sizeX/5;
        this.hitBoxEndX = this.x+this.sizeX/1.33;
        this.hitboxStartY = this.y+this.sizeY/6;
        this.hitboxEndY=this.y+sizeY/1.15; 
        this.gameHandler = Gamehandler;
        this.spriteWidth =100;
        this.spriteHeight = 20; 
        this.destroyed = false;
        this.deathTime = 0;
        this.triggeredDeathAnimation = false;
        this.deathTimeFrequency = 0.02;
    }
    
    draw(){
        this.ctx.drawImage(this.img, this.x, this.y, this.sizeX,this.sizeY);
        this.healthbar.draw();
        this.healthbar.update();
        if (this.healthbar.health<=0) {
            //currentFrame => x, y
            //
            //0 => 0, 0
            //1 => 1, 0
            //...
            //8 => 8, 0
            //9 => 0, 1 => same result as original code
            const currentFrame = Math.floor(this.deathTime / this.deathTimeFrequency);
            const currentX = currentFrame % 9;
            const currentY = Math.floor(currentFrame / 9);
            if (currentY<7) {
                // this check ensures that the deltaTime of the frame BEFORE the actual death of this object isn't counted.
                if (this.destroyed) {
                    this.deathTime += this.gameHandler.deltaTime;
                }
                this.drawAnimation(currentX, currentY)
                this.destroyed = true;
            }
            else{
                this.gameHandler.etelhordok.splice(this.gameHandler.etelhordok.indexOf(this), 1);
                
            }
        }
    }
    getHit(){
        this.clang.play();
        if (!this.destroyed) {
            this.healthbar.health-=Kanal.damage;
            this.healthbar.update();
            
        }
    }
    drawHitbox(){
        this.ctx.beginPath();
        this.ctx.rect(this.hitBoxStartX, this.hitboxStartY, this.hitBoxEndX-this.hitBoxStartX, this.hitboxEndY-this.hitboxStartY);
        this.ctx.strokeStyle = "red";
        this.ctx.stroke();
    }
    drawAnimation(currentX, currentY){
        this.gameHandler.ctx.drawImage(this.spriteImage, currentX * this.spriteWidth, currentY  * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.sizeX, this.sizeY);
    }


}
