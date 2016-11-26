(function() {
    var visualCodeWrapper = document.body.querySelector("div#visualCodeWrapper");
    /*if('import' in document.createElement('link')) {
        var content = document.querySelector('link[rel="import"]').import;
        var divs = content.querySelectorAll("div");
        divs.forEach(function(div){
            visualCodeWrapper.appendChild(div.cloneNode(true));
        })
    } else {
        console.log("link import not supported");
        controlFuncs.HttpRequestForTemplate(visualCodeWrapper,"visual-code/visual.code.html");
    }*/
    /*if (typeof InstallTrigger !== 'undefined') {
        var onTopNote = document.querySelector('div#onTopNote');
        onTopNote.innerText = "我们检测到你现在使用的是火狐浏览器。本在线编辑器暂时无法在此正常运作，请转而使用最新版本的Google Chrome， Opera等浏览器。";
        onTopNote.style.display = 'block';
        onTopNote.style.position = 'relative';
    }*/

    var inputLoginAccount = document.getElementById("account");
    var inputLoginPsw = document.getElementById("psw");
    var loginButton = document.querySelector("button.submit.login");
    if(inputLoginAccount && inputLoginPsw && loginButton) {
        loginButton.addEventListener("click", controlFuncs.tryToLogin)
    }
})();