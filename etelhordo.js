import { HealthBar } from "./healthbar.js";
export class Etelhordo{
    constructor(Gamehandler,x,y,health,sizeX=100,sizeY=100,healthBar){
        this.ctx = Gamehandler.ctx;
        this.imagePath = "assets/foodcarrier.png";
        this.demolotionPath = "/assets/boom/boom1.png";
        this.x = x;
        this.y = y;
        this.health = health;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.img = new Image();
        this.img.src =this.imagePath;
        this.healthbar= new HealthBar(this.ctx,100,100,this.x,this.y+this.sizeY-10);
        this.clang = new Audio('./assets/metalclang.mp3');
        this.hitBoxStartX = this.x+this.sizeX/5;
        this.hitBoxEndX = this.x+this.sizeX/1.33;
        this.hitboxStartY = this.y+this.sizeY/6;
        this.hitboxEndY=this.y+sizeY/1.15; 
        this.gameHandler = Gamehandler;
    }
    
    draw(){
        this.ctx.drawImage(this.img, this.x, this.y, this.sizeX,this.sizeY);
        this.healthbar.draw();
        this.healthbar.update();
    }
    getHit(){
        this.clang.play();
        console.log("Ica successfully szétbaszta az ételhordót")
        let damage = 10;
        this.healthbar.health-=damage;
        this.healthbar.update();
        if (this.healthbar.health<=damage) {
            this.gameHandler.etelhordok.splice(this.gameHandler.etelhordok.indexOf(this), 1);
        }

    }
    drawHitbox(){
        this.ctx.beginPath();
        this.ctx.rect(this.hitBoxStartX, this.hitboxStartY, this.hitBoxEndX-this.hitBoxStartX, this.hitboxEndY-this.hitboxStartY);
        this.ctx.strokeStyle = "red";
        this.ctx.stroke();
    }

}