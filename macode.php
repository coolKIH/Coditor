<?php
require_once ("primitives/header.inc");
require_once ("mysqli.connect.php");
require_once ("classes/MyCode.php");
require_once ("classes/MyProj.php");
MyCode::setConn($conn);
MyProj::setConn($conn);
?>

<script>document.querySelector("head title").innerText = "码酷"</script>
<div class="searchToggleWrapper"><span class="orange origin">&#9906;</span></div>
<div id="macodeWrapper">
    <?php
    $insearchme = false;
    if(isset($_SESSION['user']) && isset($_GET['search']) && $_GET['search'] == 'me' ) {
        $insearchme=true;
    }
    if($insearchme) {
        $pagecount = MyProj::getPageCount(10, $_SESSION['user']);
    } else {
        $pagecount = MyProj::getPageCount(10);
    }
    $currentPage = $_GET['page'];
    if(isset($currentPage)) {
        if(is_numeric($currentPage)) {
            if  (!( $currentPage > 0 && $currentPage <= $pagecount )) {
                $currentPage = 1;
            }
        } else {
            $currentPage = 1;
        }
    } else {
        $currentPage = 1;
    }
    $leftPage = $currentPage-1;
    $rightPage = $currentPage+1;
    if($insearchme == true ) {
        echo '<script>document.querySelector("head title").innerText = "我的码酷"</script>';
        $projects = MyProj::getAllProj("likes", $currentPage, 10, $_SESSION['user'] );
    } else {
        $projects = MyProj::getAllProj("likes", $currentPage, 10 );
    }
    foreach($projects as $project) {
        $projectId = $project->getProjId();
        $maker = $project->getUsername();
        $likes = $project->getLikeNum();
        echo
        "
        <div class='tinyVisualCode {$maker}' id='{$projectId}'>
            <a href='index.php?maker={$maker}&view={$projectId}'>
                <iframe src='about:blank' ></iframe>
                <div class='overlay'></div>
                <div class='tinyVisualCodeNote'>
                    <div class='maker'>
                        <span>By </span><span class='makername'>{$maker}</span><br />
                        <span>{$likes}</span>个<span class='heart'>&#9829;</span>
                    </div>
             </div>
            </a>
        </div>
        ";
    }
    ?>
</div>
    <?php
        if($insearchme) {
            echo "  <div class=\"switchPages left\">
                    <a href='macode.php?search=me&page={$leftPage}'> << </a>
                    </div>
                    <div class=\"switchPages right\">
                    <a href='macode.php?search=me&page={$rightPage}'> >> </a>
                    </div>";

        } else {
            echo "  <div class=\"switchPages left\">
                    <a href='macode.php?page={$leftPage}'> << </a>
                    </div>
                    <div class=\"switchPages right\">
                    <a href='macode.php?page={$rightPage}'> >> </a>
                    </div>";
        }
    ?>
<div id="currentpage" style="display: none;"><?php echo $currentPage; ?></div>
<div id="pagecount" style="display: none;"><?php echo $pagecount; ?></div>
<script src="jquery-3.1.1.min.js"></script>
<script src="main.utility.js"></script>
<script src="main.js"></script>
<script src="macode.js"></script>
<?php include ("primitives/footer.inc"); ?>