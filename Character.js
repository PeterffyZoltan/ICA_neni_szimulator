export class Character{
    constructor(ctx, x, y, width, height, spriteSrc, spriteAnimationFrames,speed, spriteWidth=64, spriteHeight=64){
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
        this.speed = speed;
        this.CurrentState = null;
        this.staggerCounter = 0;
    }

    draw(){
        this.ctx.drawImage(this.sprite, this.CurrentAnimationFrameX * this.spriteWidth, this.CurrentState?.sY  * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }

    update(){
        if(!this.CurrentState?.running)
        {
            return;
        }
        this.staggerCounter++;
        if(this.staggerCounter == this.CurrentState.stagger){
            this.staggerCounter = 0;
            this.CurrentAnimationFrameX++;
            if(this.CurrentAnimationFrameX == this.CurrentState.sXMax){
                this.CurrentAnimationFrameX = 0;
            }
        }
        this.x += this.CurrentState.speedX;
        this.y += this.CurrentState.speedY;
    }
}