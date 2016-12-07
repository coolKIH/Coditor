/**
 * Created by hao on 16-11-7.
 */
var controlValues = (function() {
    var errorMsgs = {
        accountMissing: "请输入用户名或者邮箱",
        pswMissing: "请输入密码",
        usernameMissing: "请输入用户名",
        emailMissing: "请输入邮箱",
        emailNotGood: "请输入有效的邮箱地址",
        usernameExisting: "用户名已经存在",
        emailExisting: "邮箱已经被注册了"
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
    var inputLoginAccount = document.querySelector("input.account.login");
    var inputLoginPsw = document.querySelector("input.psw.login");
    var labelAccount = document.querySelector("label.labelAccount.login");
    var labelPsw = document.querySelector("label.labelPsw.login")
    var buttonLogin = document.querySelector("button.submit.login");
    var loginLoader = document.querySelector("div.loader.login");

    var inputSignUpUsername = document.querySelector("input.username.signup")
    var inputSignUpEmail = document.querySelector("input.email.signup")
    var inputSignUpPsw = document.querySelector("input.psw.signup")
    var signUpButton = document.querySelector("button.submit.signup")
    var labelSignUpUsername = document.querySelector("label.labelUsername.signup");
    var labelSignUpEmail = document.querySelector("label.labelEmail.signup")
    var labelSignUpPsw = document.querySelector("label.labelPsw.signup")
    var signUpLoader = document.querySelector("div.loader.signup")

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
            loginLoader.style.display = "block";
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
                    loginLoader.style.display="none";
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
    function tryToSignUp() {
        var username = inputSignUpUsername.value.trim()
        var email = inputSignUpEmail.value.trim()
        var psw = inputSignUpPsw.value.trim()
        var errors = {}
        if(!username) {
            labelSignUpUsername.innerText = controlValues.errorMsgs.usernameMissing
            errors.usernameMissing = true
            inputSignUpUsername.focus()
        } else {
            labelSignUpUsername.innerText = ""
        }
        if(!email) {
            labelSignUpEmail.innerText = controlValues.errorMsgs.emailMissing
            errors.emailMissing = true
            inputSignUpEmail.focus()
        } else {
            labelSignUpEmail.innerText = ""
            if(!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                labelSignUpEmail.innerText = controlValues.errorMsgs.emailNotGood
                errors.emailNotGood = true
                inputSignUpEmail.focus()
            }
        }
        if(!psw) {
            labelSignUpPsw.innerText = controlValues.errorMsgs.pswMissing
            errors.pswMissing = true
            inputSignUpPsw.focus()
        } else {
            labelSignUpPsw.innerText = ""
        }
        if(Object.keys(errors).length < 1) {
            $.ajax({
                type: "POST",
                url: "httpResponse/signup.php",
                data: {
                    username: username,
                    email: email,
                    password: psw
                },
                success: function(response) {
                    if(response) {
                        var response = JSON.parse(response)
                        var errors = {}
                        if(response["check"] == "ok") {
                            $("div.formBlock.login").css("display","flex");
                            $("div.formBlock.signup").css("display", "none");
                            $("a.welcomeLogin").text("欢迎登录");
                        } else {
                            if(response["username"]) {
                                labelSignUpUsername.innerText = controlValues.errorMsgs.usernameExisting;
                                inputSignUpUsername.focus()
                            } else {
                                labelSignUpUsername.innerText = ""
                            }
                            if(response["email"]) {
                                labelSignUpEmail.innerText = controlValues.errorMsgs.emailExisting;
                                inputSignUpEmail.focus()
                            } else {
                                labelSignUpEmail.innerText = ""
                            }
                        }
                    }
                }
            })
        }

    }
    return {
        HttpRequestForTemplate: HttpRequestForTemplate,
        appendHTML: appendHTML,
        openNewWindow:openNewWindow,
        tryToLogin: tryToLogin,
        userLogout: userLogout,
        tryToSignUp: tryToSignUp
    }
})();
