export class Kanal {
    constructor(ctx, width, height, x, y, ica, gameHandler) {
        
        this.context = ctx;
        this.image = new Image();
        this.image.src = "assets/kanal.png";
        this.width = width;
        this.height = height;
        this.angle = 0;
        this.centerX = 0;
        this.centerY = 0;
        this.basePositionX = x;
        this.basePositionY = y;
        this.rotateSpeed = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.ica = ica;
        this.directionX = 1;
        this.directionY = 1;
        this.Isidle = true;
        this.gameHandler = gameHandler;
        this.hitCooldown = 30;
        this.hitCooldownCounter = 0;
        this.speed = 10;
        this.destinationX = 0;
        this.destinationY = 0;
        this.IsAttacking = false;
        document.addEventListener('click', (event) => {
            console.log('hehehe');
            this.handleClicked(event);
        });
        this.hittedEnemys = [];

  
        
    }
    
    draw() {
        this.context.save();
        this.context.translate(this.centerX, this.centerY);
        this.context.rotate((this.angle * Math.PI) / 180);
        this.context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        this.context.restore();
        // this.drawHitbox();
        
    }
    
    
    
    update(){
        this.angle += this.rotateSpeed;
        if(this.hitCooldownCounter <= 0){
            this.checkCollision();
        }
        else if (this.IsAttacking){
            this.checkCollision();
        }
        else{
            this.hitCooldownCounter--;
        }
        if(this.Isidle){
            const xDistance = this.basePositionX - this.centerX;
            const yDistance = this.basePositionY - this.centerY;
            const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
            const xSpeed = xDistance / distance * this.speed;
            const ySpeed = yDistance / distance * this.speed;
            
            if(Math.abs(xDistance) > Math.abs(xSpeed) || Math.abs(yDistance) > Math.abs(ySpeed)){
                this.centerX += xSpeed;
                this.centerY += ySpeed;
                
            }
            else{
                this.rotateSpeed = 1;
                this.speed = 10;   
                this.IsAttacking = false; 
                this.hittedEnemys = [];
            }
            
            
        }
        else{
            this.moveToDestination();
        }
    }
    moveToDestination(){
        const xDistance = this.destinationX - this.centerX;
        const yDistance = this.destinationY - this.centerY;
        const distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
        const xSpeed = xDistance / distance * this.speed;
        const ySpeed = yDistance / distance * this.speed;
        if(Math.abs(xDistance) < Math.abs(xSpeed) && Math.abs(yDistance) < Math.abs(ySpeed)){
            this.centerX = this.destinationX;
            this.centerY = this.destinationY;
            this.Isidle = true;
            this.speed = 40;
            this.hittedEnemys = [];
            return;
        }
        this.centerX += xSpeed;
        this.centerY += ySpeed;
    }
    checkCollision(){
        const hitRange = {x: this.centerX - this.width/2, y: this.centerY - this.height/2, endX: this.centerX + this.width/2, endY: this.centerY + this.height/2}
        this.gameHandler.etelhordok.forEach(etelhordo => {
            const etelhordoHitbox = {x: etelhordo.hitBoxStartX, y: etelhordo.hitboxStartY, endX: etelhordo.hitBoxEndX, endY: etelhordo.hitboxEndY};
            // console.log(etelhordoHitbox, hitRange);
            if(etelhordoHitbox.x <= hitRange.endX 
                && etelhordoHitbox.endX >= hitRange.x 
                && etelhordoHitbox.endY >= hitRange.y 
                && etelhordoHitbox.y <= hitRange.endY){
                    if(this.IsAttacking){
                        if(this.hittedEnemys.includes(etelhordo)) return;
                        this.hittedEnemys.push(etelhordo);
                        etelhordo.getHit();
                    }
                    else{
                        etelhordo.getHit();
                        this.hitCooldownCounter = this.hitCooldown;
                        }
            }
            
        });
    }

    get hitbox(){
        return {
            x: this.centerX - this.width/2,
            y: this.centerY - this.height/2,
            width: this.width,
            height: this.height,
        }
    }
    drawHitbox(){
        const hitbox = this.hitbox;
        this.context.save();
        this.context.translate(this.centerX, this.centerY);
        // this.context.rotate((this.angle * Math.PI) / 180);
        this.context.beginPath();
        this.context.rect(-this.width/2, -this.height/2, this.width, this.height);
        this.context.strokeStyle = "red";
        this.context.stroke();
        this.context.restore();
    }
    handleClicked(event){
        if(this.IsAttacking) return;
        console.log(event);
        const x = event.offsetX;
        const y = event.offsetY;
        this.destinationX = x;
        this.destinationY = y;
        this.Isidle = false;
        this.speed = 15;
        this.rotateSpeed = 20;
        this.IsAttacking = true;
    }
    
  }
  