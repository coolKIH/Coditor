<nav id="onTopNav">
    <ul id="navMenu">
        <li><a href="#">码酷</a></li>
        <li><a href="#">编辑器</a></li>
        <li><a href="#">关于</a> </li>
        <li id="userConsole">
            <a id="navUser" href="#"><?php echo $_SESSION["user"] ?></a>
            <ul>
                <li><a href="#">个人中心</a></li>
                <li><a href="#" id="logout">退出</a></li>
            </ul>
        </li>
    </ul>
</nav>