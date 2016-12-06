<?php session_start() ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Coditor</title>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <link rel="icon" href="media/imgs/favicon.ico"/>
    <link rel="stylesheet" href="home.css"/>
    <link rel="stylesheet" href="visual-code/visual.code.css"/>
</head>
<body>
<div id="popupWrapper">
    <?php include ("popupWindows/popupWrapper.inc"); ?>
</div>
<div id="onTopNote">保存成功</div>
<?php
if(isset( $_SESSION["user"] )) {
    include ("navs/nav.logged.in.inc");
} else {
    include ("navs/nav.visitors.inc");
}
?>
<!--
<div id="headerWrapper">
    <div class="logo">
        <img alt="logo" src="media/imgs/logo.png"/>
        <h1 class="brand">Coditor</h1>
    </div>
    <div class="slogan"><h1>即时代码编辑器</h1></div>
</div>
-->
<div id="headerWrapper">
    <div class="logo">
        <img alt="logo" src="media/imgs/logo.png"/>
    </div>
    <div class="slogan"><h1>即时代码编辑器</h1></div>
</div>