<nav id="onTopNav">
    <ul id="navMenu">
        <li><a href="macode.php">码酷</a></li>
        <li><a href="index.php">编辑器</a></li>
        <li id="userConsole">
            <a id="navUser" href="#"><?php echo $_SESSION["user"] ?></a>
            <ul>
                <li><a href="macode.php?search=me">我的码酷</a></li>
                <li><a href="#" id="logout">退出</a></li>
            </ul>
        </li>
    </ul>
</nav>