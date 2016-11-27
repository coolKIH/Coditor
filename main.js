(function() {
    var visualCodeWrapper = document.body.querySelector("div#visualCodeWrapper");
    var inputLoginAccount = document.getElementById("account");
    var inputLoginPsw = document.getElementById("psw");
    var loginButton = document.querySelector("button.submit.login");
    var logoutAlias = document.querySelector("a#logout");

    if(inputLoginAccount && inputLoginPsw && loginButton) {
        loginButton.addEventListener("click", controlFuncs.tryToLogin)
    }
    if(logoutAlias) {
        logoutAlias.addEventListener("click", function() {
            controlFuncs.userLogout();
        })
    }
    inputLoginPsw.addEventListener("keydown", function(e) {
        if(e.code == "Enter" || e.code == "NumpadEnter") {
            controlFuncs.tryToLogin();
        }
    })
})();