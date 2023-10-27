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
        this.healthbar= new HealthBar(this.ctx,100,100,this.x,this.y+this.sizeY);
        this.clang = new Audio('./assets/metalclang.mp3');
        this.hitBoxStartX = this.x-sizeX/2;
        this.hitBoxEndX = this.x+sizeX/2;
        this.hitboxStartY = this.y+sizeY/2;
        this.hitboxEndY=this.y-sizeY/2
    }
    
    draw(){
        this.ctx.drawImage(this.img, this.x, this.y, this.sizeX,this.sizeY);
        this.healthbar.draw();
    }
    update(){
        this.healthbar.update();
    }
    getHit(){
        this.clang.play();
        console.log("Ica successfully szétbaszta az ételhordót")

    }

}