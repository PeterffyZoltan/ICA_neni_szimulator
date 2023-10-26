export class HealthBar{
    constructor(ctx,health,maxHealth,x,y){
        this.ctx = ctx;
        this.maxHealth = maxHealth;
        this.health = health;
        this.x = x;
        this.y = y;
    }


    draw(){
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, 100, 10);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
    }
    update(){

    }
}