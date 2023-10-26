import {Character} from './Character.js';
import {InputHandler} from './inputHandler.js';
export class Ica extends Character{
    constructor(ctx, x, y, width, height){
        const spriteSrc = './assets/Ica_sprite.png';
        const speed = 10;
        const spriteAnimationFrames = {
            run: {sXMax:8, sY:8, stagger:3},
            hit: {sXMax:6, sY:12, stagger:3}


        };



        super(ctx, x, y, width, height, spriteSrc, spriteAnimationFrames, speed);
        this.CurrentState = {...this.spriteAnimationFrames.run , speedX: this.speed, speedY: 0, sY :  this.spriteAnimationFrames.run.sY+3, running: false, hitting: false};
        this.inputHandler = new InputHandler(['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', ' ']);
    }

    update(){
        this.handleInput();
        if(!this.CurrentState?.running && !this.CurrentState?.hitting)
        {
            return;
        }
        
        this.x += this.CurrentState.speedX;
        this.y += this.CurrentState.speedY;
        this.updateSprite();
    }
    handleInput(){
        if(this.CurrentState.hitting) return;
        if(this.inputHandler.isPressed(' ') ){
            
            console.log('hit');
        
            this.CurrentState.hitting = true;
            this.CurrentState.sY = this.CurrentState.sY%4 + this.spriteAnimationFrames.hit.sY;
            this.CurrentState.sX = 0;
            this.CurrentState.sXMax = this.spriteAnimationFrames.hit.sXMax;
            this.CurrentState.stagger = this.spriteAnimationFrames.hit.stagger;
            this.CurrentState.speedX = 0;
            this.CurrentState.speedY = 0;

            

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
            if(this.CurrentAnimationFrameX == this.CurrentState.sXMax){
                this.CurrentAnimationFrameX = 0;
                if(this.CurrentState?.hitting){
                    this.CurrentState.hitting = false;
                }
            }
        }
    }
    

}