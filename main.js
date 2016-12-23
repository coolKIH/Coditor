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
	var inputSearch = $('input.search');
	var searchToggle = $("div.searchToggleWrapper");

	function displayFilteredShowcase() {
		var wanted = inputSearch.val().trim();
		if(wanted) {
			document.querySelectorAll("div.tinyVisualCode").forEach(function(tinyVisualCode) {
				if(tinyVisualCode.className.toLowerCase().indexOf(wanted.toLowerCase()) < 0) {
					tinyVisualCode.style.display = "none";
				} else {
					tinyVisualCode.style.display = "block";
				}
			})
		} else {
			document.querySelectorAll("div.tinyVisualCode").forEach(function(tinyVisualCode) {
				tinyVisualCode.style.display = "block";
			})
		}
	}
	var timeoutId;
	inputSearch.on("keyup", function() {
		timeoutId = setTimeout(function() {
			displayFilteredShowcase()
		},500)
	})
	inputSearch.on("keydown", function(e) {
		clearTimeout(timeoutId)
		if(e.keyCode == 13) {
			displayFilteredShowcase();
		}
	})

	var topSearchWrapper = $("div.topSearchWrapper");
	var inputSearch = $('input.search');
	var toggleOn = false;
	searchToggle.click(function() {
		toggleOn = !toggleOn;
		topSearchWrapper.slideToggle("fast")
		inputSearch.focus()
	//	$("div.searchToggleWrapper span").toggleClass("blue orange")
	//	$("div.searchToggleWrapper span").toggleClass("origin")

	})
	$("div.likeit a.enabled").click(
		function() {
			if($("div.likeit a.enabled").hasClass("notliked")) {
                $.ajax({
                    type: "POST",
                    url: "httpResponse/like.php",
                    data: {
                        "projId": $('div#getProjId').text(),
                        "action": "add"
                    },
                    success: function(response) {
                        if(response == "success") {
                            $("div.likeit a").removeClass('notliked');
                            $("div.likeit a").addClass('liked');
                            $("strong.likeNum").text( parseInt($("strong.likeNum").text()) + 1);
                        }
                    }
                })
            } else {
                $.ajax({
                    type: "POST",
                    url: "httpResponse/like.php",
                    data: {
                        "projId": $('div#getProjId').text(),
                        "action": "remove"
                    },
                    success: function(response) {
                        if(response == "success") {
                            $("div.likeit a").removeClass('liked');
                            $("div.likeit a").addClass('notliked');
                            $("strong.likeNum").text( parseInt($("strong.likeNum").text()) - 1 );
                        }
                    }
                })
            }
		}
		)
    $("div.likeit a.disabled").click(function() {
        $("div#onTopNote").text("请登录之后点赞")
        $("div#onTopNote").slideToggle();
        $("div.likeit a.disabled").css("pointer-events", "none")
        setTimeout(function() {
            $("div#onTopNote").slideToggle("fast", "swing", function() {
                $("div#onTopNote").text("正在处理");
                $("div.likeit a.disabled").css("pointer-events", "auto")
            });
        }, 1000)
    })
	currentpage = $("div#currentpage").text();
	pagecount = $("div#pagecount").text();
	if(currentpage != pagecount) {
		$("div.switchPages.right").css("display", "block")
	}
	if(currentpage != 1) {
		$("div.switchPages.left").css("display", "block")
	}
})();
