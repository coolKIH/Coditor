/**
 * Created by hao on 16-11-7.
 */
var controlValues = (function() {
    var errorMsgs = {
        accountMissing: "请输入用户名或者邮箱",
        pswMissing: "请输入密码"
    };
    var promptMsgs = {
        loggingin: "正在登录",
        loginSuccess: "登录成功",
        loginFailure: "用户名或密码错误，请重新登录"
    }
    return {
        errorMsgs: errorMsgs,
        promptMsgs: promptMsgs
    }
})();
var controlFuncs = (function(){
    var inputLoginAccount = document.getElementById("account");
    var inputLoginPsw = document.getElementById("psw");
    var labelAccount = document.getElementById("labelAccount");
    var labelPsw = document.getElementById("labelPsw");
    var buttonLogin = document.querySelector("button.submit.login");
    var loader = document.querySelector("div.loader");
    var navLogin = document.querySelector("a#navLogin");

    function sleep(interval) {
        var start = new Date().getTime();
        while(new Date().getTime() < start + interval);
    }
    function HttpRequestForTemplate(target, templatePath) {
        var httpRequest = null;
        if(window.XMLHttpRequest) {
            httpRequest = new XMLHttpRequest();
        } else if(window.ActiveXObject) {
            httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
        }
        httpRequest.onreadystatechange = function() {
            if(httpRequest.readyState === XMLHttpRequest.DONE) {
                if(httpRequest.status === 200) {
                    appendHTML(target,httpRequest.responseText);
                } else {
                    console.log("There is a problem with the request.");
                }
            }
        };
        httpRequest.open('GET',templatePath,true);
        httpRequest.send(null);
    }

    function appendHTML(target, strng) {
        var div = document.createElement('div');
        div.innerHTML = strng;
        while (div.children.length > 0) {
            target.appendChild(div.children[0]);
        }
    }
    function openNewWindow(url,title,attrs) {
        return window.open(url,title,attrs);
    }
    function tryToLogin() {
        var errors = {};

        var account = inputLoginAccount.value.trim();
        var psw = inputLoginPsw.value.trim();

        if(account=="") {
            labelPsw.innerText = controlValues.errorMsgs.pswMissing;
            errors.pswMissing = true;
            inputLoginPsw.focus();
        } else {
            labelPsw.innerText = "";
        }
        if(psw=="") {
            labelAccount.innerText = controlValues.errorMsgs.accountMissing;
            inputLoginAccount.focus();
            errors.accountMissing = true;
        } else {
            labelAccount.innerText = "";
        }
        if(Object.keys(errors).length == 0) {
            buttonLogin.value=controlValues.promptMsgs.loggingin;
            loader.style.display = "block";
            login(account, psw);
        }
    }
    function login(acc, psw) {
        var httpRequest = null;
        httpRequest = new XMLHttpRequest();
        if(!httpRequest) {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        httpRequest.onreadystatechange = function() {
            if(httpRequest.readyState == XMLHttpRequest.DONE)
                if(httpRequest.status == 200) {
                    loader.style.display="none";
                    var responseObj = JSON.parse(httpRequest.responseText);
                    if(responseObj["check"]==="ok") {
                        var username = responseObj["username"];
                        window.location.href="";
                    } else {
                        labelAccount.innerText = controlValues.promptMsgs.loginFailure;
                        console.log(responseObj)
                    }
                }
        }
        httpRequest.open("POST","httpResponse/loginConfirm.php", true);
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        httpRequest.send("account="+acc+"&psw="+psw);
    }
    function userLogout() {
        var httpRequest = new XMLHttpRequest();
        if(!httpRequest) {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        httpRequest.onreadystatechange = function() {
            if(httpRequest.readyState == XMLHttpRequest.DONE)
                if(httpRequest.status == 200) {
                    window.location.reload();
                }
        };
        httpRequest.open("POST", "httpResponse/logout.php", true);
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        httpRequest.send(null);
    }
    return {
        HttpRequestForTemplate: HttpRequestForTemplate,
        appendHTML: appendHTML,
        openNewWindow:openNewWindow,
        tryToLogin: tryToLogin,
        userLogout: userLogout
    }
})();
