import { HealthBar } from "./healthBar.js";
export class Etelhordo{
    constructor(ctx,x,y,health,sizeX=100,sizeY=100,healthBar){
        this.ctx = ctx;
        this.imagePath = "assets/foodcarrier.png";
        this.x = x;
        this.y = y;
        this.health = health;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.img = new Image();
        this.img.src =this.imagePath;
        this.healthbar= new HealthBar(this.ctx,health,100,this.x,this.y+this.sizeY)

    }
    
    draw(){
        this.ctx.drawImage(this.img, this.x, this.y, this.sizeX,this.sizeY);
        this.healthbar.draw();
    }
    update(){
        
    }
    getHit(){
        console.log("Ica successfully szétbaszta az ételhordót")
    }

}