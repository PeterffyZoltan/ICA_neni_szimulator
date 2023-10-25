export class InputHandler{
    constructor(usedKeys){
        this.pressedKeys = [];
        this.usedKeys = usedKeys;

        document.addEventListener('keydown', (event) => {
            if(this.usedKeys.includes(event.key)){
                this.pressedKeys.push(event.key);
            }
        }

        );
        document.addEventListener('keyup', (event) => {
            if(this.usedKeys.includes(event.key)){
                this.pressedKeys = this.pressedKeys.filter((key) => key != event.key);
            }
            
        }

        );
    }
    isPressed(key){
        return this.pressedKeys.includes(key);
    }
}


