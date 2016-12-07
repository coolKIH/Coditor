(function(){
    var textareas = document.querySelectorAll('textarea');
    var runCodeButton = document.querySelector('button.submitCode');
    var saveCodeButton = document.querySelector('button#saveCode');
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
            newPageWindow.document.write(iframeContent);
            newPageWindow.focus();
        });
    }
    if(saveCodeButton) {
        saveCodeButton.addEventListener('click',editorFuncs.saveCode);
        if(saveCodeButton.className=="update") {
            saveCodeButton.innerText = "更新代码"
        } else if(saveCodeButton.className == "create") {
            saveCodeButton.innerText = "保存代码"
        }
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
            showProjectTitle();
        }
    });
    titleDisplayer.addEventListener("mouseenter", function() {
        var self = this;
        window.countdown = setTimeout(function () {
            self.click();
        }, 1000);
    });
    titleDisplayer.addEventListener("mouseleave", function() {
            if(window.countdown) {
                clearTimeout(window.countdown);
            }
    })
    projectTitleForm.onsubmit = function() {
        showProjectTitle();
        return false;
    }
    var projId = document.querySelector("div#getProjId").innerText;
    if(projId) {
        $.ajax(
            {
                type: "POST",
                url: "httpResponse/getCode.php",
                data: {
                    projId: projId
                },
                success: function(result) {
                    var codeSet = JSON.parse(result);
                    var htmlCode = codeSet["htmlCode"];
                    var cssCode = codeSet["cssCode"];
                    var jsCode = codeSet["jsCode"];
                    var projTitle = codeSet["projTitle"]
                    $("textarea.code.html").val(htmlCode)
                    $("textarea.code.css").val(cssCode)
                    $("textarea.code.js").val(jsCode)
                    $("button#titleDisplayer").text(projTitle)
                }
            }
        )
    }

})();