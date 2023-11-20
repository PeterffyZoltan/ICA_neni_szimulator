import { HealthBar } from "./healthbar.js";
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
        this.clang = new Audio('./assets/metalclang.mp3');
        this.hitBoxStartX = this.x+this.sizeX/5;
        this.hitBoxEndX = this.x+this.sizeX/1.33;
        this.hitboxStartY = this.y+this.sizeY/6;
        this.hitboxEndY=this.y+sizeY/1.15; 
        this.gameHandler = Gamehandler;
        this.spriteWidth =100;
        this.spriteHeight = 20;
        this.sX = 0;
        this.sY=0;        
        this.destroyed = false;
    }
    
    draw(){
        this.ctx.drawImage(this.img, this.x, this.y, this.sizeX,this.sizeY);
        this.healthbar.draw();
        this.healthbar.update();
        if (this.healthbar.health<=0) { 
            if (this.sX!=9 &&this.sY!=7) {          
                this.gameHandler.ctx.drawImage(this.spriteImage, this.sX * this.spriteWidth, this.sY  * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.sizeX, this.sizeY);         
                this.sX++;
                if (this.sX==9) {
                    this.sX=0;
                    this.sY++;
                }
                this.destroyed=true;
            }      
            
            else{
                this.gameHandler.etelhordok.splice(this.gameHandler.etelhordok.indexOf(this), 1);
                
            }
        }
    }
    getHit(){
        this.clang.play();
        console.log("Ica successfully szétbaszta az ételhordót")
        let damage = 10;
        if (!this.destroyed) {
            this.healthbar.health-=damage;
            this.healthbar.update();
            
        }


    }
    drawHitbox(){
        this.ctx.beginPath();
        this.ctx.rect(this.hitBoxStartX, this.hitboxStartY, this.hitBoxEndX-this.hitBoxStartX, this.hitboxEndY-this.hitboxStartY);
        this.ctx.strokeStyle = "red";
        this.ctx.stroke();
    }
    drawAnimation(){

        this.gameHandler.ctx.drawImage(this.spriteImage, this.sX * this.spriteWidth, this.sY  * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.sizeX, this.sizeY);

    }


}
