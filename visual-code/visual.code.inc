<div class="projectTitleWrapper">
    <button id="titleDisplayer">无标题项目</button>
    <div id="projectTitleWriter">
        <form id="projectTitleForm" method="post">
            <input name="projectTitle" type="text" /><br/>
            <input type="submit" style="position: absolute; left: -9999px"/>
        </form>
    </div>
   <?php if(isset($_GET['maker']) && $_SESSION['user'] && $_GET['maker']==$_SESSION['user'])
    echo " <button class=\"deleteProj\">从代码库删除</button>"
   ?>
</div>
<?php
    if(isset($_GET['maker']) && isset($_GET['view'])) {
        require_once ("mysqli.connect.php");
        echo "
            <div class='moreinfo'>
                <span class='pale'>By {$_GET['maker']}</span>
            </div>
            <div class='likeit'>
                <a href='#' ";
        if(!isset($_SESSION['user'])) {
            echo "class='disabled'";
        } else {
            if(isset($conn)) {
                $q = "select * from myLike where username='{$_SESSION['user']}' and projId='{$_GET['view']}'";
                $r = mysqli_query($conn, $q);
                if(mysqli_num_rows($r) > 0) {
                    echo "class='enabled liked'";
                } else {
                    echo "class='enabled notliked'";
                }
            }
        }
        echo "
             >&#9829;</a>
             <span>";
        $q = "select * from myLike where projId='{$_GET['view']}'";
        $r = mysqli_query($conn, $q);
        $likeNum = mysqli_num_rows($r);
        echo "<strong class='likeNum'>{$likeNum}</strong>";
        echo "个赞</span></div>
            ";
    }
?>
<div class="editor">
    <textarea class="code html" placeholder="HTML"></textarea>
    <textarea class="code css" placeholder="CSS"></textarea>
    <textarea class="code js" placeholder="Javascript"></textarea>
</div>
<div class="buttonsWrapper">
    <button class="submitCode">运行</button>
    <button id="saveCode" class="<?php echo ( isset($_GET['maker']) && isset($_SESSION['user']) && $_SESSION['user']==$_GET['maker'])?'update':'create'; ?>">加载中...</button>
</div>
<div class="viewer iframeContainer">
    <iframe id="resulting-frame"  src="resulting-frame/resulting.frame.html">
        <p>Iframe not supported</p>
    </iframe>
</div>
<div class="buttonsWrapper">
    <button class="runInNewPage">在新窗口打开</button>
</div>
