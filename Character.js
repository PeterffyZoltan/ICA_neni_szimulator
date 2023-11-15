export class Character{
    constructor(ctx, x, y, width, height, spriteSrc, spriteAnimationFrames,speed,gameHandler, spriteWidth=64, spriteHeight=64){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.spriteSrc = spriteSrc;
        this.sprite = new Image();
        this.sprite.src = this.spriteSrc;
        this.spriteAnimationFrames = spriteAnimationFrames;
        this.CurrentAnimationFrameX = 0;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.baseSpeed = speed;
        this.CurrentState = null;
        this.staggerCounter = 0;
        this.gameHandler = gameHandler;
    }

    draw(){
        this.ctx.drawImage(this.sprite, this.CurrentAnimationFrameX * this.spriteWidth, this.CurrentState?.sY  * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
       
    }
    get speed(){
        return this.gameHandler.deltaTime * this.baseSpeed
    }
    set speed(value){
        this.baseSpeed = value;
    }

}