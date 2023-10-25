import {Character} from './Character.js';
import {InputHandler} from './inputHandler.js';
export class Ica extends Character{
    constructor(ctx, x, y, width, height){
        const spriteSrc = './assets/Ica_sprite.png';
        const speed = 10;
        const spriteAnimationFrames = {
            run: {sXMax:8, sY:8, stagger:1},

        };



        super(ctx, x, y, width, height, spriteSrc, spriteAnimationFrames, speed);
        this.CurrentState = {...this.spriteAnimationFrames.run , speedX: this.speed, speedY: 0, sY :  this.spriteAnimationFrames.run.sY+3, running: false};
        this.inputHandler = new InputHandler(['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown']);
    }

    update(){
        if(this.inputHandler.pressedKeys.length > 0){
            this.CurrentState.running = true;
            if(this.inputHandler.isPressed('ArrowRight')){
                this.CurrentState.speedX = this.speed;
                this.CurrentState.speedY = 0;
                this.CurrentState.sY = this.spriteAnimationFrames.run.sY+3;
            }
            else if(this.inputHandler.isPressed('ArrowLeft')){
                this.CurrentState.speedX = -this.speed;
                this.CurrentState.speedY = 0;
                this.CurrentState.sY = this.spriteAnimationFrames.run.sY+1;
            }
            if(this.inputHandler.isPressed('ArrowUp')){
                this.CurrentState.speedX = 0;
                this.CurrentState.speedY = -this.speed;
                this.CurrentState.sY = this.spriteAnimationFrames.run.sY;
            }
            else if(this.inputHandler.isPressed('ArrowDown')){
                this.CurrentState.speedX = 0;
                this.CurrentState.speedY = this.speed;
                this.CurrentState.sY = this.spriteAnimationFrames.run.sY+2;
            }
        }
        else{
            this.CurrentState.running = false;
            this.CurrentState.speedX = 0;
            this.CurrentState.speedY = 0;
        }
        super.update();
    }


}