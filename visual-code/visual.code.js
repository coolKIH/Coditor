(function(){
    var textareas = document.querySelectorAll('textarea');
    var runCodeButton = document.querySelector('button.submitCode');
    var saveCodeButton = document.querySelector('button.saveCode');
    var textareaHTML = null;
    if (textareas) {
        textareas.forEach(function(ta){
            editorFuncs.setAttributes.call(ta,editorValues.textAreaAttrs);
            editorFuncs.addEventListenerConsiderate.call(ta,'keydown',editorFuncs.keydownEventListener);
            if(ta.className.indexOf("html")>-1) {
                textareaHTML = ta;
            }
        });
    }
    var newPageOpener = document.querySelector('button.runInNewPage');
    if(runCodeButton) {
        editorFuncs.addEventListenerConsiderate.call(runCodeButton,'click',editorFuncs.runCode().runCodeHTML);
    }
    if(newPageOpener) {
        newPageOpener.addEventListener('click',function() {
            var newPageWindow = controlFuncs.openNewWindow('','','');
            var iframe = editorFuncs.getIFrame();
            var iframeContent = '<!DOCTYPE html><html><head>'+iframe.contentWindow.document.head.innerHTML +
                '</head><body>' + iframe.contentWindow.document.body.innerHTML + '</body></html>';
            console.log(iframeContent);
            newPageWindow.document.write(iframeContent);
            newPageWindow.focus();
        });
    }
    if(saveCodeButton) {
        saveCodeButton.addEventListener('click',editorFuncs.saveCode);
    }

})();