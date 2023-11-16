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
            else{
                this.nextWave();
            }
        }
        if(!this.updateCurrentWave){
            return;
        }
        this.updateCurrentWave();
        

    }
    get isWaveCleared(){
        return this.gameHandler.etelhordok.length == 0;
    }
    createProjectile(x,y,direction){
        // Calculate the length of the direction vector
        let length = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
        
        // Normalize the direction vector
        let normalizedDirection = {
            x: direction.x / length,
            y: direction.y / length
        };
        let speed = 500; // Change this to the desired speed
        
        // Multiply the normalized direction vector by the speed
        let finalDirection = {
            x: normalizedDirection.x * speed,
            y: normalizedDirection.y * speed
        };
        let rotation = Math.random()*5;
        let projectile = new Projectile(this.gameHandler, "./assets/foodcarrier.png", x, y, 50, 50, finalDirection, rotation);
        this.gameHandler.projectiles.push(projectile);
    }
    createEtelhordo(num){
        while (this.gameHandler.etelhordok.length<num) {
            let x = Math.random()*1500;
            let y = Math.random()*900;
            let etelhordo = new Etelhordo(this.gameHandler,x,y,100);
            if(x>this.gameHandler.Ica.width+this.gameHandler.Ica.x
                &&y>this.gameHandler.Ica.height+this.gameHandler.Ica.y
                &&etelhordo.sizeX+x<this.gameHandler.width
                &&etelhordo.sizeY+y<this.gameHandler.height){
                    
                this.gameHandler.etelhordok.push(etelhordo);
            }
            
        }
    }
    firstWave(){
        this.projectileFrequency = 1000;
        this.gameHandler.etelhordok = [];   
        this.gameHandler.projectiles = [];
        this.createEtelhordo(5);
        this.updateCurrentWave = this.updateFirstWave;
        this.nextWave = this.firstWave;
    }
    
    updateFirstWave(){
        const icaPosition = {x: this.gameHandler.Ica.x + this.gameHandler.Ica.width/2,
        y: this.gameHandler.Ica.y + this.gameHandler.Ica.height/2 };
        
        if(this.gameHandler.projectiles.length < 5){
            
            let staticPos = Math.floor(Math.random() * 2);
            console.log(staticPos)
            if(Math.random() < 0.2){
                let x = this.gameHandler.width*staticPos;
                let y = Math.random()*this.gameHandler.height;
                let direction = {
                    x: icaPosition.x - x,
                    y: icaPosition.y - y
                };
                if(Math.abs(direction.y) < 200){
                    
                    
                    return;
                }
                this.createProjectile(x,y,direction)
                
            }
            else{
                let x = Math.random()*this.gameHandler.width;
                let y = this.gameHandler.height*staticPos;
                let direction = {
                    x: icaPosition.x - x,
                    y: icaPosition.y - y
                };
                if(Math.abs(direction.y) < 200){
                    
                    
                    return;
                }
                this.createProjectile(x,y,direction)
                
                
            }
        }
    }
    secondWave(){
        console.log("Win")
        this.nextWave = null;
        this.updateCurrentWave = null;
    }
}