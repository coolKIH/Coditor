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
<div id="pageWrapper">
<div id="onTopNote">正在处理...</div>
<div class="topSearchWrapper">
    <input class="search" placeholder="输入作者筛选" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
</div>
<?php
if(isset( $_SESSION["user"] )) {
    include ("navs/nav.logged.in.inc");
} else {
    include ("navs/nav.visitors.inc");
}
?>
<div id="headerWrapper">
    <div class="logo">
        <img alt="logo" src="media/imgs/coditor1.png"/>
    </div>
    <div class="slogan"><h1>即时代码编辑器</h1></div>
</div>