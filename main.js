(function() {
    var visualCodeWrapper = document.body.querySelector("div#visualCodeWrapper");
    var inputLoginAccount = document.getElementById("account");
    var inputLoginPsw = document.getElementById("psw");
    var loginButton = document.querySelector("button.submit.login");
    if(inputLoginAccount && inputLoginPsw && loginButton) {
        loginButton.addEventListener("click", controlFuncs.tryToLogin)
    }
})();