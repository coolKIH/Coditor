(function() {
	// Production steps of ECMA-262, Edition 5, 15.4.4.18
	// Reference: http://es5.github.io/#x15.4.4.18
	if (!Array.prototype.forEach) {

	  Array.prototype.forEach = function(callback, thisArg) {

		var T, k;

		if (this === null) {
		  throw new TypeError(' this is null or not defined');
		}

		// 1. Let O be the result of calling toObject() passing the
		// |this| value as the argument.
		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get() internal
		// method of O with the argument "length".
		// 3. Let len be toUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If isCallable(callback) is false, throw a TypeError exception. 
		// See: http://es5.github.com/#x9.11
		if (typeof callback !== "function") {
		  throw new TypeError(callback + ' is not a function');
		}

		// 5. If thisArg was supplied, let T be thisArg; else let
		// T be undefined.
		if (arguments.length > 1) {
		  T = thisArg;
		}

		// 6. Let k be 0
		k = 0;

		// 7. Repeat, while k < len
		while (k < len) {

		  var kValue;

		  // a. Let Pk be ToString(k).
		  //    This is implicit for LHS operands of the in operator
		  // b. Let kPresent be the result of calling the HasProperty
		  //    internal method of O with argument Pk.
		  //    This step can be combined with c
		  // c. If kPresent is true, then
		  if (k in O) {

		    // i. Let kValue be the result of calling the Get internal
		    // method of O with argument Pk.
		    kValue = O[k];

		    // ii. Call the Call internal method of callback with T as
		    // the this value and argument list containing kValue, k, and O.
		    callback.call(T, kValue, k, O);
		  }
		  // d. Increase k by 1.
		  k++;
		}
		// 8. return undefined
	  };
	}
    var visualCodeWrapper = document.body.querySelector("div#visualCodeWrapper");
    var inputLoginAccount = document.querySelector("input.account.login");
    var inputLoginPsw = document.querySelector("input.psw.login");
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
	$("a#toRegister").click(function() {
		$("div.formBlock.signup").css("display", "flex");
		$("div.formBlock.login").css("display","none");
		$("a.welcomeLogin").text("欢迎注册")
	})
	$("a#toLogin").click(function() {
		$("div.formBlock.login").css("display","flex");
		$("div.formBlock.signup").css("display", "none");
		$("a.welcomeLogin").text("欢迎登录")
	})

	var inputSignUpUsername = document.querySelector("input.username.signup")
	var inputSignUpEmail = document.querySelector("input.email.signup")
	var inputSignUpPsw = document.querySelector("input.psw.signup")

	var signUpButton = document.querySelector("button.submit.signup")

	signUpButton.addEventListener("click", controlFuncs.tryToSignUp)
	inputSignUpPsw.addEventListener("keydown", function(e) {
		if(e.code == "Enter" || e.code == "NumpadEnter") {
			controlFuncs.tryToSignUp();
		}
	})
})();
