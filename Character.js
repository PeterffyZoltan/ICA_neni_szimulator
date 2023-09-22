export class Character{
    constructor(ctx, x, y, width, height, spriteSrc, spriteWidth, spriteHeight, spriteAnimationFrames){
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
        this.CurrentAnimationFrameY = 0;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
    }

    draw(){
        this.ctx.drawImage(this.sprite, this.CurrentAnimationFrameX * this.spriteWidth, this.CurrentAnimationFrameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}