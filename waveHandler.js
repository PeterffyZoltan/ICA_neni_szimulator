import {Etelhordo} from "./etelhordo.js";
import { Projectile } from "./projectile.js";
import {Boss} from "./boss.js";


export class WaveHandler {
    constructor(gameHandler)
    {
        this.gameHandler = gameHandler;
        this.nextWave = this.firstWave;
        this.projectileFrequency;
        this.projectileTypes;
        this.updateCurrentWave = null;
        
            this.projectileTypes = [
                {"src":"assets/plate.png"},
                {"src": "assets/slipper_grey.png", "size": {"x":30,"y":50}},
                {"src": "assets/slipper_red.png", "size": {"x":30,"y":50}},
                {"src": "assets/slipper_white.png", "size": {"x":30,"y":50}},
                

                
            
            
            ];
        
        
        
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
        if(!this.projectileTypes) return;
        this.updateCurrentWave();
        

    }
    get isWaveCleared(){
        return this.gameHandler.etelhordok.length == 0;
    }
    createProjectile(x,y,direction,proj){
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
        
        let projFinal = proj || this.projectileTypes[Math.floor(Math.random()*this.projectileTypes.length)];
        const size = projFinal?.size || {x: 50, y: 50};
        let projectile = new Projectile(this.gameHandler, projFinal.src, x, y, size.x, size.y, finalDirection, rotation);
        this.gameHandler.projectiles.push(projectile);
    }
    createEtelhordo(num){
        while (this.gameHandler.etelhordok.length<num) {
            let x = Math.random()*1500;
            let y = Math.random()*900;
            let etelhordo = new Etelhordo(this.gameHandler,x,y,100);
            if(!this.collideWithIca({x: etelhordo.hitBoxStartX , y: etelhordo.hitboxStartY, endX: etelhordo.hitBoxEndX, endY: etelhordo.hitboxEndY})
                &&etelhordo.sizeX+x<this.gameHandler.width
                &&etelhordo.sizeY+y<this.gameHandler.height){
                    
                this.gameHandler.etelhordok.push(etelhordo);
            }
            
        }
    }
    createProjectileWall(x,y,gapSize,projectile){
        let projectileSize = projectile.size || 50;
        if(x === -1){
            let projectileGapStart;
                projectileGapStart = Math.floor(Math.random() * (this.gameHandler.width/projectileSize));
                //checks if gap is too far from ica
            
            
            for (let i = 0; i < this.gameHandler.width/projectileSize; i++) {
                if(i < projectileGapStart || i > projectileGapStart+gapSize){
                    let x = i*projectileSize;
                    let yy = y*this.gameHandler.height;
                    this.createProjectile(x,yy,{x: 0, y: 1-y*2}, projectile);
                }
                
            }

        }
        else if(y === -1){
            let projectileGapStart = Math.floor(Math.random() * (this.gameHandler.height/projectileSize));
            for (let i = 0; i < this.gameHandler.height/projectileSize; i++) {
                if(i < projectileGapStart || i > projectileGapStart+gapSize){
                    let y = i*projectileSize;
                    let xx = x*this.gameHandler.width;
                    this.createProjectile(xx,y,{x: 1-x*2, y: 0}, projectile);
                }
                
            }
        }
    }
    createProjectileRing(gapSize,projectile){
        const icaPosition = {x: this.gameHandler.Ica.x + this.gameHandler.Ica.width/2,
        y: this.gameHandler.Ica.y + this.gameHandler.Ica.height/2 };
        let projectileSize = projectile.size || 50;
        let projectileGapStart = Math.floor(Math.random() * (this.gameHandler.height/projectileSize));
        let radius = 700;
        for (let i = 0; i < 360; i+=10) {
            if(i < projectileGapStart || i > projectileGapStart+gapSize){
                let x = this.gameHandler.Ica.x+Math.cos(i)*radius;
                let y = this.gameHandler.Ica.y+Math.sin(i)*radius;
                let direction = {
                    x: icaPosition.x - x,
                    y: icaPosition.y - y
                };
                this.createProjectile(x,y,{x: direction.x, y: direction.y}, projectile);
            }
            
        }
    }



    collideWithIca(hitbox){
        const icaHitbox = this.gameHandler.Ica.hitbox;
        icaHitbox.endX = icaHitbox.x+icaHitbox.width;
        icaHitbox.endY = icaHitbox.y+icaHitbox.height;
        if(hitbox.endX > icaHitbox.x
            && hitbox.x < icaHitbox.endX
            && hitbox.endY > icaHitbox.y
            && hitbox.y < icaHitbox.endY){
                return true;
            }
        return false;

    }
    createProjectiles(max){
        if(!this.projectileTypes) return;
        const icaPosition = {x: this.gameHandler.Ica.x + this.gameHandler.Ica.width/2,
        y: this.gameHandler.Ica.y + this.gameHandler.Ica.height/2 };
        if(this.gameHandler.projectiles.length < max){
            
            let staticPos = Math.floor(Math.random() * 2);
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
    firstWave(){
        this.projectileFrequency = 1000;
        this.gameHandler.etelhordok = [];   
        this.gameHandler.projectiles = [];
        this.createEtelhordo(5);
       
        this.updateCurrentWave = this.updateFirstWave;
        this.nextWave = this.secondWave;
    }
    
    updateFirstWave(){
        
        this.createProjectiles(5);
       
        
        
    }
    
    secondWave(){
        this.gameHandler.etelhordok = [];   
        this.createEtelhordo(8);
        this.updateCurrentWave = this.updateSecondWave;
        this.nextWave = this.thirdWave;
        this.createProjectileWall(1,-1,5,this.projectileTypes[0]);
    }
    updateSecondWave(){
        if(this.gameHandler.projectiles.length == 0){

            this.createProjectileWall(1,-1,5,this.projectileTypes[0]);
            this.createProjectileWall(0,-1,5,this.projectileTypes[0]);
        }
        
    }
    thirdWave(){
        this.gameHandler.etelhordok = [];   
        this.createEtelhordo(3);
        this.updateCurrentWave = this.updateThirdWave;
        this.nextWave = this.fourthWave;
    }
    updateThirdWave(){
        if(this.gameHandler.projectiles.length == 0){
            this.createProjectileRing(1,this.projectileTypes[0]);
        }
        
    }
    fourthWave(){
        this.gameHandler.etelhordok = [];   
         this.createEtelhordo(7);
        this.updateCurrentWave = this.updateThirdWave;
        this.nextWave = null;
        this.gameHandler.projectiles = [];
        let bossX = this.gameHandler.Ica.x>this.gameHandler.width/2? 0: this.gameHandler.width;
        let bossY = this.gameHandler.Ica.y>this.gameHandler.height? 0: this.gameHandler.height;
        let Vazso = new Boss(this.gameHandler,bossX,bossY,100,100, {x: 0, y: 0},0);
        this.gameHandler.etelhordok.push(Vazso);
        this.updateCurrentWave = this.updateFourthWave;

    }
    updateFourthWave(){
        if(this.gameHandler.etelhordok.length >1){
            return;
        }
        this.createProjectiles(6);
        
        
    }
    
}