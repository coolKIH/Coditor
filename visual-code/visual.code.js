(function(){
    var textareas = document.querySelectorAll('textarea');
    var resultarea = document.querySelector('div.viewer');
    var resultContainer = resultarea.querySelector('pre');

    var textarea;
    textareas.forEach(function(ta){
        editorFuncs.setAttributes.call(ta,editorValues.textAreaAttrs);
        if(ta.className.indexOf("html")>-1) {
            textarea = ta;
        }
    })
    resultarea.className += " green";

    textarea.lastKey = '';

    function inputToOutputEventListener(e) {
        editorFuncs.writeHTML(resultContainer,this.value);
    }
    editorFuncs.setAttributes.call(textarea,editorValues.textAreaAttrs);
    if(textarea.addEventListener) {
        textarea.addEventListener('input',inputToOutputEventListener);
        textarea.addEventListener('keydown',editorFuncs.keydownEventListener);
    } else if(textarea.attachEvent) {
        textarea.attachEvent('input', inputToOutputEventListener);
        textarea.attachEvent('keydown',editorFuncs.keydownEventListener)
    }
})();