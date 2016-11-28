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

    var titleDisplayer = document.querySelector("button#titleDisplayer");
    var projectTitleWriter = document.querySelector("div#projectTitleWriter");
    var projectTitleForm = document.querySelector("form#projectTitleForm");
    var projectTitleInput = document.querySelector("input[name='projectTitle']");

    function projecTitleButtonListener() {
        this.style.display = "none";
        projectTitleWriter.style.display = "block";
        projectTitleInput.value = this.innerText.trim();
        projectTitleInput.focus();
        projectTitleInput.setSelectionRange(0, projectTitleInput.value.length);
    }
    function showProjectTitle() {
        projectTitleWriter.style.display = "none";
        titleDisplayer.innerText = projectTitleInput.value.trim() || "无标题项目";
        titleDisplayer.style.display = "block";
    }
    titleDisplayer.onclick = projecTitleButtonListener;
    projectTitleInput.addEventListener("focusout", showProjectTitle);
    projectTitleInput.addEventListener("keydown", function (e) {
        if(e.code == "Enter" || e.code == "NumpadEnter") {
            showProjectTitle()
        }
    })

    titleDisplayer.addEventListener("mouseover", projecTitleButtonListener);
    projectTitleForm.onsubmit = function() {
        showProjectTitle();
        return false;
    }

})();