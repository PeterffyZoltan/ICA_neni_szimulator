export class Etelhordo{
    constructor(ctx,x,y,health,sizeX=100,sizeY=100){
        this.ctx = ctx;
        this.imagePath = "assets/foodcarrier.png";
        this.x = x;
        this.y = y;
        this.health = health;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.img = new Image();
        this.img.src =this.imagePath;

    }
    
    draw(){
        this.ctx.drawImage(this.img, this.x, this.y, this.sizeX,this.sizeY);
    }
    update(){
        
    }

}