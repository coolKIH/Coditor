/**
 * Created by hao on 16-11-6.
 */
var editorValues = (function(){
    var pairCharData = {
        "{": "}",
        "(": ")",
        "\"":"\"",
        "'":"'"
    };
    var pairCharDataReverse = {
        "}": "{",
        ")": "(",
        "\"":"\"",
        "'":"'"
    };
    var skippedKeys = ["Shift"];
    var textAreaAttrs = {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        spellcheck: "false",
        autofocus: "autofocus"
    };
    return {
        pairCharData:pairCharData,
        pairCharDataReverse: pairCharDataReverse,
        skippedKeys:skippedKeys,
        textAreaAttrs:textAreaAttrs
    };
}());
var editorFuncs = (function(){
    var pairCharData = editorValues.pairCharData;
    var pairCharDataReverse = editorValues.pairCharDataReverse;
    var skippedKeys = editorValues.skippedKeys;
    function insertInside(char, originChar) {
        if(originChar){
            return this.value.substring(0,this.selectionStart) + originChar + char + this.value.substring(this.selectionEnd);
        }
        return this.value.substring(0,this.selectionStart) + char + this.value.substring(this.selectionEnd);
    }
    function autoPair(originChar) {
        var othHalf = pairCharData[originChar];
        this.value = insertInside.call(this, othHalf, originChar);
    }
    function keydownEventListener(e) {
        var key = e.key;
        var start = this.selectionStart;
        if(key === 'Tab'){
            this.value = insertInside.call(this,'\t');
            this.selectionStart = this.selectionEnd = start + 1;
            e.preventDefault();
        }
        else if(key in pairCharData) {
            autoPair.call(this,key);
            this.selectionStart = this.selectionEnd = start + 1;
            e.preventDefault();
        }else if(key === 'Enter') {
            this.value = insertInside.call(this,'\n');
            this.selectionStart = this.selectionEnd = start + 1;
            var wrapNum = this.value.match(/\r|\r\n|\n/gi).length | 0;
            var lineNum = wrapNum + 1;
            e.preventDefault();
        }else if(key in pairCharDataReverse) {
            console.log(key,this.lastKey);
            var leftPair = pairCharDataReverse[key];
            if(this.lastKey === leftPair) {
                this.selectionStart = this.selectionEnd = start +1;
                e.preventDefault();
            }

        }
        if(skippedKeys.indexOf(key) < 0) {
            this.lastKey = key;
        }
    }
    function writeHTML(target,value) {
        target.innerHTML = value;
    }
    function setAttributes(attrsObj){
        for(var attr in attrsObj) {
            var property = attr;
            var value = attrsObj[property];
            this.setAttribute(property,value);
        }
    }
    return {
        insertInside:insertInside,
        autoPair:autoPair,
        keydownEventListener:keydownEventListener,
        writeHTML:writeHTML,
        setAttributes:setAttributes
    }
}());