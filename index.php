<?php session_start() ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Coditor</title>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <link rel="icon" href="media/imgs/favicon.ico"/>
    <link rel="stylesheet" href="home.css"/>
    <link rel="stylesheet" href="visual-code/visual.code.css"/>
    <link rel="import" href="visual-code/visual.code.html"/>
</head>
<body>
<div id="popupWrapper">
    <div id="contentWindow">
        <div id="topController">
            <div class="titleWrapper">
                <a class="welcomeLogin" href="#popupWrapper">欢迎登录</a>
            </div>
            <div class="toggleWrapper">
                <a class="toggle" href="#">&#9932;</a>
            </div>
        </div>
        <div id="formBlock">
            <div id="formContentWrapper">
                <input id="account" type="text" name="account" placeholder="用户名或者邮箱" autocomplete="off"
                       autofocus="autofocus" spellcheck="false" autocapitalize="off" autocorrect="off"/>
                <br />
                <label id="labelAccount" for="account" class="error"></label>
                <br />
                <input id="psw" type="password" name="psw" placeholder="密码" autocomplete="false" spellcheck="false"
                       autocapitalize="off" autocorrect="off"/>
                <br />
                <label id="labelPsw" for="psw" class="error"></label>
                <br/>
                <button class="submit login">登录</button>
                <div class="loader"></div>
            </div>
        </div>
        <div id="bottomController">
            <div class="titleWrapper">
                <a id="toRegister" href="#popupWrapper">还没有帐号？马上注册！&#8594;</a>
            </div>
            </div>
        </div>
    </div>
</div>
<div id="onTopNote">保存成功</div>
<?php
    if(isset( $_SESSION["user"] )) {
        include ("navs/nav.logged.in.inc");
    } else {
        include ("navs/nav.visitors.inc");
    }
?>
<div id="headerWrapper">
    <div class="logo">
        <img alt="logo" src="media/imgs/logo.png"/>
        <h1 class="brand">Coditor</h1>
    </div>
    <div class="slogan"><h1>即时代码编辑器</h1></div>
</div>
<div id="visualCodeWrapper">
    <?php include ("visual-code/visual.code.html");?>
</div>

<script src="main.utility.js"></script>
<script src="main.js"></script>
<script src="visual-code/visual.code.utility.js"></script>
<script src="visual-code/visual.code.js"></script>
</body>
</html>