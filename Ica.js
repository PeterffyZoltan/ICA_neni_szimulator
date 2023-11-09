import {Character} from './Character.js';
import {InputHandler} from './inputHandler.js';
import {HealthBar} from './healthbar.js';
export class Ica extends Character{
    constructor(ctx, x, y, width, height, gameHandler){
        const spriteSrc = './assets/Ica_sprite.png';
        const speed = 10;
        const spriteAnimationFrames = {
            run: {sXMax:8, sY:8, stagger:3},
            hit: {sXMax:6, sY:12, stagger:3}


        };
        super(ctx, x, y, width, height, spriteSrc, spriteAnimationFrames, speed);
        this.range = 100;
        this.healthbar = new HealthBar(this.ctx, 100, 100, this.hitbox.x-this.hitbox.width/4, this.hitbox.y+this.hitbox.height+10);
        this.gameHandler = gameHandler;
        this.CurrentState = {...this.spriteAnimationFrames.run , speedX: 0, speedY: 0, sY : 0 ,running: false, hitting: false};
        this.inputHandler = new InputHandler(['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', ' ']);
    }
    draw(){
        this.drawHitbox();
        this.healthbar.draw();
        this.healthbar.update();
        super.draw();
    } 

    gotHit(){
        this.healthbar.health -= 10;
        
        console.log(this.healthbar.health);
        // if(this.healthbar.health <= 0){
        //     this.gameHandler.gameOver();
        // }

       
    }

    update(){
        
        this.handleInput();
        if(!this.CurrentState?.running)
        {
            if(!this.CurrentState?.hitting) return;
           
            
            
            
        }
        this.updateSprite();
        
        this.checkCollision();
        this.x += this.CurrentState.speedX;
        this.y += this.CurrentState.speedY;
        const hitbox = this.hitbox;
        this.healthbar.x = hitbox.x-hitbox.width/4;
        this.healthbar.y = hitbox.y + hitbox.height + 10;

    }

    checkCollision(){
        if(this.hitbox.x < 0 && this.CurrentState.speedX < 0 || this.hitbox.x + this.hitbox.width > this.ctx.canvas.width && this.CurrentState.speedX > 0)
        {
            this.CurrentState.speedX = 0;
        }
        if(this.hitbox.y < 0 && this.CurrentState.speedY < 0 || this.hitbox.y + this.hitbox.height > this.ctx.canvas.height && this.CurrentState.speedY > 0)
        {
            this.CurrentState.speedY = 0;
        }

        
        const hitbox = {x: this.hitbox.x, y: this.hitbox.y, endX: this.hitbox.x+this.hitbox.width, endY: this.hitbox.y+this.hitbox.height};
        hitbox.x += this.CurrentState.speedX;
        hitbox.y += this.CurrentState.speedY;
        hitbox.endX += this.CurrentState.speedX;
        hitbox.endY += this.CurrentState.speedY;
        this.gameHandler.etelhordok.forEach(etelhordo => {
            
            const etelhordoHitbox = {x: etelhordo.hitBoxStartX, y: etelhordo.hitboxStartY, endX: etelhordo.hitBoxEndX, endY: etelhordo.hitboxEndY};
            if(etelhordoHitbox.x <= hitbox.endX 
                && etelhordoHitbox.endX >= hitbox.x 
                && etelhordoHitbox.endY >= hitbox.y 
                && etelhordoHitbox.y <= hitbox.endY){
               //cant go through etelhordo
                console.log('colision')
                if(this.CurrentState.speedX >= 0 && hitbox.x <= etelhordoHitbox.x){
                    this.CurrentState.speedX = 0;
                }
                else if(this.CurrentState.speedX <= 0 && hitbox.endX >= etelhordoHitbox.endX){
                    this.CurrentState.speedX = 0;
                }

                if(this.CurrentState.speedY >= 0 && hitbox.y <= etelhordoHitbox.y){
                    this.CurrentState.speedY = 0;
                }
                else if(this.CurrentState.speedY <= 0 && hitbox.endY >= etelhordoHitbox.endY){
                    this.CurrentState.speedY = 0;
                }
            }
            

        });

    }
    handleInput(){
        
        if(this.CurrentState.hitting) return;
        
        if(this.inputHandler.isPressed(' ') ){
            
        
            this.CurrentState.hitting = true;
            this.CurrentState.sY = this.CurrentState.sY%4 + this.spriteAnimationFrames.hit.sY;
            this.CurrentState.sX = 0;
            this.CurrentState.sXMax = this.spriteAnimationFrames.hit.sXMax;
            this.CurrentState.stagger = this.spriteAnimationFrames.hit.stagger;
            this.CurrentState.speedX = 0;
            this.CurrentState.speedY = 0;
            this.checkHit();

            

        }
        else if(this.inputHandler.pressedKeys.length > 0){
            this.CurrentState.running = true;
            if(this.inputHandler.isPressed('ArrowRight')){
                this.CurrentState.speedX = this.speed;
                this.CurrentState.sY = this.spriteAnimationFrames.run.sY+3;
            }
            else if(this.inputHandler.isPressed('ArrowLeft')){
                this.CurrentState.speedX = -this.speed;
                this.CurrentState.sY = this.spriteAnimationFrames.run.sY+1;
            }
            else{
                this.CurrentState.speedX = 0;
            }
            if(this.inputHandler.isPressed('ArrowUp')){
                this.CurrentState.speedY = -this.speed;
                this.CurrentState.sY = this.spriteAnimationFrames.run.sY;
            }
            else if(this.inputHandler.isPressed('ArrowDown')){
                this.CurrentState.speedY = this.speed;
                this.CurrentState.sY = this.spriteAnimationFrames.run.sY+2;
            }
            else{
                this.CurrentState.speedY = 0;
            }
        }
        else{
            this.CurrentState.running = false;
            this.CurrentState.speedX = 0;
            this.CurrentState.speedY = 0;
        }
    }
    updateSprite(){
        this.staggerCounter++;
        if(this.staggerCounter == this.CurrentState.stagger){
            this.staggerCounter = 0;
            this.CurrentAnimationFrameX++;
            if(this.CurrentAnimationFrameX >= this.CurrentState.sXMax){
                this.CurrentAnimationFrameX = 0;
                if(this.CurrentState?.hitting){
                    this.CurrentState.hitting = false;
                }
            }
        }
    }
    
    checkHit(){
        //get the range of the hit if there is a character in that range, hit it
        console.log('hit');
        let hitRange = this.hitRange;
        // this.gameHandler.etelhordok.forEach(enemy => {
        //     if (
        //         hitRange.x < enemy.x + enemy.width &&
        //         hitRange.x + hitRange.width > enemy.x &&
        //         hitRange.y < enemy.y + enemy.height &&
        //         hitRange.y + hitRange.height > enemy.y

        //     )
        //     {
                
        //         enemy.hit();
        //     }
        // });
    }

    get hitRange(){
        const direction = this.CurrentState.sY%4;
        console.log(direction);

        
        
    }


    drawHitbox(){
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
    }
    get hitbox(){
        return {x: this.x+30, y: this.y+30, width: this.width-60, height: this.height-30};
    }

}