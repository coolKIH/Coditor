<?php
include ("primitives/header.inc");
require_once ("mysqli.connect.php");
require_once ("classes/MyCode.php");
require_once ("classes/MyProj.php");
MyCode::setConn($conn);
MyProj::setConn($conn);
?>

<script>document.querySelector("head title").innerText = "码酷"</script>
<div id="macodeWrapper">
    <?php
    $projects = MyProj::getAllProj();
    if(sizeof($projects) < 1) {
        //do something
    }
    foreach($projects as $project) {
        $projectId = $project->getProjId();
        $maker = $project->getUsername();
        echo
        "
        <div class='tinyVisualCode' id='{$projectId}'>
            <a href='index.php?maker={$maker}&view={$projectId}'>
                <iframe src='about:blank' ></iframe>
                <div class='overlay'></div>
            </a>
        </div>
        ";
    }
    ?>
</div>
<script src="main.utility.js"></script>
<script src="main.js"></script>
<script src="macode.js"></script>
<?php include ("primitives/footer.inc"); ?>