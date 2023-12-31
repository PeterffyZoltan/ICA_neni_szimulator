export class Text{
    static defaultSize = 30;
    static defaultMeasure = "px";
    static defaultFont = "monospace"
    size = Text.defaultSize;
    measure = Text.defaultMeasure;
    font = Text.defaultFont;
    #formatString = "";
    #value = "";
    #fullText = "";

    get fullFont(){
        return `${this.size}${this.measure} ${this.font}`;
    }

    static get fullDefaultFont(){
        return `${Text.defaultSize}${Text.defaultMeasure} ${Text.defaultFont}`
    }
    
    get formatString(){
        return this.#formatString;
    }
    set formatString(value){
        if (value == this.#formatString) {
            return;
        }
        const isFormattable = Text.IsFormattableWithCount(value, 1);
        if (isFormattable == null) {
            throw new Error("The value was not a valid formattable string");
        }
        if (isFormattable == false) {
            throw new Error("The value was not formattable with 1 element");
        }
        this.#formatString = value;
        this.#updateFullText();
    }

    get value(){
        return this.#value;
    }
    set value(value){
        if (this.#value == value) {
            return;
        }
        this.#value = value;
        this.#updateFullText();
    }

    get fullText(){
        return this.#fullText;
    }
    #updateFullText(){
        this.#fullText = Text.Format(this.#formatString, this.#value);
    }

    draw(x,y){
        this.ctx.font = this.fullFont;
        this.ctx.fillText(this.#fullText, x, y)
    }

    constructor(ctx, gameHandler, formatString, value){
        this.ctx = ctx;
        this.gameHandler = gameHandler;
        this.formatString = formatString;
        this.value = value;
    }
    static IsNullOrWhitespace(string){
        return !string || !string.replace(/\s/g, '').length
    }
    /// If invalid: returns null
    /// Returns whether the string is formattable with the given number of arguments
    static IsFormattableWithCount(string, count){
        if (typeof(string) !== typeof("")) {
            throw new Error(`Parameter '${Object.keys({string})[0]}' was not a string!`)
        }
        if (typeof(count) !== typeof(0) || !Number.isSafeInteger(count)) {
            throw new Error(`Parameter '${Object.keys({count})[0]}' was not a safe integer!`)
        }
        let usedArgs = {};
        
        let readingArgIndex = "";
        let readingArgIndexState = -1; // -1: not parsing, 0: got '{', 1: got a different character than '{'
        // special case: 2: got a '}' while not parsing (wait for next character)
        for (let i = 0; i < string.length; i++) {
            const char = string[i];
            switch (char) {
                case "{":
                    switch (readingArgIndexState) {
                        case -1:
                            readingArgIndexState++;
                            break;
                        case 0:
                            readingArgIndexState = -1;
                            break;
                        case 1:
                        case 2:
                            return false;
                        default:
                            return false;
                    }
                    break;
                case "}":
                    switch (readingArgIndexState) {
                        case -1:
                            readingArgIndexState++;
                            break;
                        case 0:
                            return false;
                        case 1:
                            if (Text.IsNullOrWhitespace(readingArgIndex)) {
                                return false;
                            }
                            const idx = +readingArgIndex;
                            if (!Number.isSafeInteger(idx) || idx < 0) {
                                return false;
                            }
                            if (idx >= count) {
                                return false;
                            }
                            usedArgs[idx]=0;
                            readingArgIndexState = -1;
                            break;
                        case 2:
                            readingArgIndexState = -1;
                            break;
                        default:
                            return false;
                    }
                    break;
                default:
                    switch (readingArgIndexState) {
                        case -1:
                            break;
                        case 0:
                            readingArgIndexState++;
                            readingArgIndex += char;
                            break;
                        case 1:
                            readingArgIndex += char;
                            break;
                        case 2:
                            return false;
                        default:
                            return false;
                    }
                    break;
            }
        }
        if (Object.keys(usedArgs).length != count) {
            return false;
        }
        return true;
    }

    static Format(string){
        let args = [];
        for (var i = 0; i < arguments.length; ++i) args[i] = arguments[i];
        args = args.splice(1, args.length-1);
        let usedArgs = {};
        if (typeof(string) !== typeof("")) {
            throw new Error(`Parameter '${Object.keys({string})[0]}' was not a string!`);
        }
        
        let readingArgIndex = "";
        let readingArgIndexState = -1; // -1: not parsing, 0: got '{', 1: got a different character than '{'
        // special case: 2: got a '}' while not parsing (wait for next character)
        let result = "";
        for (let i = 0; i < string.length; i++) {
            const char = string[i];
            switch (char) {
                case "{":
                    switch (readingArgIndexState) {
                        case -1:
                            readingArgIndexState++;
                            break;
                        case 0:
                            readingArgIndexState = -1;
                            result += char;
                            break;
                        case 1:
                        case 2:
                            throw new Error(`Unexpected opening braces at position ${i}`);
                        default:
                            throw new Error("Unhandled index state (complain to developer)");
                    }
                    break;
                case "}":
                    switch (readingArgIndexState) {
                        case -1:
                            readingArgIndexState++;
                            break;
                        case 0:
                            throw new Error(`Unexpected closing braces at position ${i}`);
                        case 1:
                            if (Text.IsNullOrWhitespace(readingArgIndex)) {
                                throw new Error(`Missing argument index (whitespace only) at position ${i}`);
                            }
                            const idx = +readingArgIndex;
                            if (!Number.isSafeInteger(idx) || idx < 0) {
                                throw new Error(`Invalid argument index at position ${i}`);
                            }
                            if (idx >= args.length) {
                                throw new Error(`Argument index out of range at position ${i}`);
                            }
                            result += String(args[idx]);
                            usedArgs[idx]=0;
                            readingArgIndexState = -1;
                            break;
                        case 2:
                            readingArgIndexState = -1;
                            result += char;
                            break;
                        default:
                            throw new Error("Unhandled index state (complain to developer)");
                    }
                    break;
                default:
                    switch (readingArgIndexState) {
                        case -1:
                            result += char;
                            break;
                        case 0:
                            readingArgIndexState++;
                            readingArgIndex += char;
                            break;
                        case 1:
                            readingArgIndex += char;
                            break;
                        case 2:
                            throw new Error(`Unexpected closing braces at position ${i-1}`);
                        default:
                            throw new Error("Unhandled index state (complain to developer)");
                    }
                    break;
            }
        }
        if (Object.keys(usedArgs).length != args.length) {
            throw new Error("Unused formatting arguments");
        }
        return result;
    }
}