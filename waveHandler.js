import {Etelhordo} from "./etelhordo.js";
import { Projectile } from "./projectile.js";

export class WaveHandler {
    constructor(gameHandler)
    {
        this.gameHandler = gameHandler;
        this.nextWave = this.firstWave;
        this.projectileFrequency;
        this.updateCurrentWave = null;
        
        
    }
    update(){
       
        if(this.isWaveCleared ){
            if(!this.nextWave){
                this.gameHandler.gameWin();
            }
            this.nextWave();
        }
        this.updateCurrentWave();
        

    }
    get isWaveCleared(){
        return this.gameHandler.etelhordok.length == 0;
    }
    firstWave(){
        this.projectileFrequency = 1000;
        this.gameHandler.etelhordok = [];   
        this.gameHandler.projectiles = [];
        while (this.gameHandler.etelhordok.length<5) {
            let x = Math.random()*1500;
            let y = Math.random()*900;
            let etelhordo = new Etelhordo(this.gameHandler.ctx,x,y,100);
            if(x>this.gameHandler.Ica.width+this.gameHandler.Ica.x
                &&y>this.gameHandler.Ica.height+this.gameHandler.Ica.y
                &&etelhordo.sizeX+x<this.gameHandler.width
                &&etelhordo.sizeY+y<this.gameHandler.height){
                    
                this.gameHandler.etelhordok.push(etelhordo);
            }
            
        }
        this.updateCurrentWave = this.updateFirstWave;
        this.nextWave = this.secondWave;
    }

    updateFirstWave(){
        if(this.gameHandler.projectiles.length < 5){
            let x = this.gameHandler.width;
            let y = Math.random()*this.gameHandler.height;
            let direction = {x: -1000, y: 0};
            let rotation = Math.random()*5;
            let projectile = new Projectile(this.gameHandler, "./assets/foodcarrier.png", x, y, 50, 50, direction, rotation);
            this.gameHandler.projectiles.push(projectile);    
        }
    }
    secondWave(){
        console.log("Win")
        this.nextWave = null;
    }
    
}