window.onload = (function(){
    var pairCharData = {
        "{": "}",
        "(": ")",
        "}": "{",
        ")": "("
    };
    function setAttributes(attrsObj){
        for(var attr in attrsObj) {
            var property = attr;
            var value = attrsObj[property];
            this.setAttribute(property,value);
        }
    }
    function insertInside(char, originChar) {
        if(originChar){
            return this.value.substring(0,this.selectionStart) + originChar + char + this.value.substring(this.selectionEnd);
        }
        return this.value.substring(0,this.selectionStart) + char + this.value.substring(this.selectionEnd);
    }
    function autoPair(originChar) {
        var othHalf = pairCharData[originChar];
        this.value = insertInside.call(this,othHalf,originChar);
    }
    var textarea = document.body.querySelector('textarea.code');
    var resultarea = document.body.querySelector('div.viewer');
    var resultContainer = resultarea.querySelector('pre');
    textarea.lastKey = '';
    var attrsObj = {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        spellcheck: "false",
        autofocus: "autofocus"
    };
    setAttributes.call(textarea,attrsObj);
    textarea.addEventListener('input',function(e){
        resultContainer.innerHTML = this.value;
        console.log(this.value);
    });

    textarea.addEventListener('keydown',function(e){
        var key = e.key;
        var start = this.selectionStart;
        if(key === 'Tab'){
            this.value = insertInside.call(this,'\t');
            this.selectionStart = this.selectionEnd = start + 1;
            e.preventDefault();
        }
        else if(key === '(' || key === '{') {
            autoPair.call(this,key);
            this.selectionStart = this.selectionEnd = start + 1;
            e.preventDefault();
        }else if(key === 'Enter') {
            this.value = insertInside.call(this,'\n');
            this.selectionStart = this.selectionEnd = start + 1;
            var wrapNum = this.value.match(/\r|\r\n|\n/gi).length | 0;
            var lineNum = wrapNum + 1;
            e.preventDefault();
        }else if(key === ')' || key === '}') {
            var leftPair = pairCharData[key];
            if(this.lastKey === leftPair) {
            this.selectionStart = this.selectionEnd = start +1;
                e.preventDefault();
            }

        }
        if(key != 'Shift') {
            this.lastKey = key;
        }
    });

})();