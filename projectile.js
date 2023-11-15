export class Projectile{
    constructor(gameHandler, imageSource, x, y, width, height, direction, rotation){
        this.ctx = gameHandler.ctx;
        this.gameHandler = gameHandler;
        this.direction = direction;
        this.imageSource = imageSource;
        this.rotation = rotation*100;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = this.imageSource;
        this.centerX = x;
        this.centerY = y;
        this.angle = 0;
        
    }
    get hitbox(){
        return {
            x: this.centerX - this.width/2,
            y: this.centerY - this.height/2,
            width: this.width,
            height: this.height,
        }
    }
    draw() {
        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate((this.angle * Math.PI) / 180);
        this.ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        this.ctx.restore();
         this.drawHitbox();
        
    }
    update(){
        this.centerX += this.direction.x*this.gameHandler.deltaTime;
        this.centerY += this.direction.y*this.gameHandler.deltaTime;
        this.angle += this.rotation*this.gameHandler.deltaTime;
        if(this.isOutOfScreen){
            this.gameHandler.projectiles.splice(this.gameHandler.projectiles.indexOf(this), 1);
        }
        if(this.checkCollision(this.gameHandler.Ica)){
            this.gameHandler.Ica.gotHit();
            this.gameHandler.projectiles.splice(this.gameHandler.projectiles.indexOf(this), 1);
        }

    }
    get isOutOfScreen(){
        if(this.centerX < 0 || this.centerX > this.ctx.canvas.width || this.centerY < 0 || this.centerY > this.ctx.canvas.height){
            return true;
        }
        return false;
    }
    drawHitbox(){
        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);
        
        this.ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
        this.ctx.restore();
    }
    checkCollision(other){
        const hitbox = {x : this.centerX - this.width/2, y: this.centerY - this.height/2, endX: this.centerX + this.width/2, endY: this.centerY + this.height/2};
        // const hitbox = {x: this.hitbox.x, y: this.hitbox.y, endX: this.hitbox.x+this.hitbox.width, endY: this.hitbox.y+this.hitbox.height};
        const otherHitbox = {x: other.hitbox.x, y: other.hitbox.y, endX: other.hitbox.x+other.hitbox.width, endY: other.hitbox.y+other.hitbox.height};
        if(hitbox.x < otherHitbox.endX && hitbox.endX > otherHitbox.x && hitbox.y < otherHitbox.endY && hitbox.endY > otherHitbox.y){
            return true;
        }
        return false;
    }



}