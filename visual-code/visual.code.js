(function(){
    var textareas = document.querySelectorAll('textarea');
    var resultarea = document.querySelector('div.viewer.preContainer');
    var resultContainer = resultarea.querySelector('pre');
    var runCodeButton = document.querySelector('button.submitCode');
    var textareaHTML = null;
    textareas.forEach(function(ta){
        editorFuncs.setAttributes.call(ta,editorValues.textAreaAttrs);
            editorFuncs.addEventListenerConsiderate.call(ta,'keydown',editorFuncs.keydownEventListener);
        if(ta.className.indexOf("html")>-1) {
            textareaHTML = ta;
            editorFuncs.addEventListenerConsiderate.call(ta,'input',inputToOutputEventListener);
        }
    })
    resultarea.className += " green";

    textareaHTML.lastKey = '';

    function inputToOutputEventListener(e) {
        editorFuncs.writeHTML(resultContainer,this.value);
    }
    editorFuncs.setAttributes.call(textareaHTML,editorValues.textAreaAttrs);
    editorFuncs.addEventListenerConsiderate.call(runCodeButton,'click',editorFuncs.runCode().runCodeHTML)

})();