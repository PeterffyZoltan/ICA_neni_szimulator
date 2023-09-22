import {Character} from './Character.js';
export class Ica extends Character{
    constructor(ctx, x, y, width, height){
        const spriteSrc = './assets/Ica_sprite.png';
        let spriteWidth = 64;
        let spriteHeight = 64;
        const spriteAnimationFrames = {
            run: {sXMax:9, sY:8},

        };


        super(ctx, x, y, width, height, spriteSrc, spriteWidth, spriteHeight, spriteAnimationFrames);
    }


}