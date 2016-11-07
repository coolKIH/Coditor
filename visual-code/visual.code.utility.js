/**
 * Created by hao on 16-11-6.
 */
var editorValues = (function(){
    var pairCharData = {
        "{": "}",
        "(": ")",
        "\"":"\"",
        "'":"'",
        "<":">"
    };
    var pairCharDataReverse = {
        "}": "{",
        ")": "(",
        "\"":"\"",
        "'":"'",
    };
    var skippedKeys = ["Shift"];
    var textAreaAttrs = {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        spellcheck: "false",
        autofocus: "autofocus"
    };
    var warningMessages = {
       emptyContent: "内容为空. 请输入代码"
    };
    return {
        pairCharData:pairCharData,
        pairCharDataReverse: pairCharDataReverse,
        skippedKeys:skippedKeys,
        textAreaAttrs:textAreaAttrs,
        warningMessages:warningMessages
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
    function backToPure() {
        //make sure every is new to the users.
        this.open();
        this.write("");
        this.close();
    }
    function runCodeHTML(e) {
        var codeHTML = getCodeHTML();
        var codeJs = getCodeJs();
        var codeCSS = getCodeCSS();
        if(!hasContent([codeCSS,codeJs,codeHTML])) {
            alert(editorValues.warningMessages.emptyContent);
            return;
        }
        var iframe = getIframe();
        //This below not working...
        // iframe.src='../resulting-frame/resulting.frame.html';

        var iframeDocument = iframe.contentWindow.document;

        putCSS.call(iframeDocument,codeCSS);
        putHTML.call(iframeDocument,codeHTML);
        putJs.call(iframeDocument,codeJs);
    }
    function putHTML(toInsertCodeHTML) {
        this.querySelector('body').innerHTML = toInsertCodeHTML;
    }
    function putCSS(toInsertCodeCSS) {
        var head = this.head || this.querySelector('head');
        var style = this.createElement('style');
        style.type='text/css';
        style.innerText = toInsertCodeCSS;
        console.log(style)
        head.appendChild(style);
    }
    function putJs(toInsertJs) {
        var jscript = this.createElement('script');
        jscript.type='text/javascript';
        jscript.innerText=toInsertJs;
        this.querySelector('body').appendChild(jscript);
    }
    function getIframe() {
        return document.querySelector('iframe#resulting-frame');
    }
    function hasContent(parameter_arr) {
        if(!parameter_arr) {
            return false;
        }
        var hasContent = false;
        parameter_arr.forEach(function(para) {
            if(para) {
                hasContent = true;
            }
        });
        return hasContent;
    }
    function runCode() {
        return {
            runCodeHTML: runCodeHTML
        };
    }
    function getCodeHTML() {
        return document.querySelector('textarea.code.html').value;
    }
    function getCodeJs() {
        var codeJs =  document.querySelector('textarea.code.js').value;
        return removeBreakChars(codeJs);
    }
    function getCodeCSS() {
        var codeCSS = document.querySelector('textarea.code.css').value;
        return removeBreakChars(codeCSS);

    }
    function removeBreakChars(origin) {
        return origin.replace(/\n|\r|\r\n/g,"");
    }
    function addEventListenerConsiderate(event,listener) {
        if(this.addEventListener) {
            this.addEventListener(event,listener);
        } else if(this.attachEvent) {
            this.attachEvent((event,listener));
        }
    }
    return {
        insertInside:insertInside,
        autoPair:autoPair,
        keydownEventListener:keydownEventListener,
        writeHTML:writeHTML,
        setAttributes:setAttributes,
        runCode: runCode,
        addEventListenerConsiderate: addEventListenerConsiderate
    };
}());