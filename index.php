<?php include ("primitives/header.inc"); ?>
<div style="display:none" id="getProjId"><?php echo isset($_GET["view"])?$_GET["view"]:''; ?></div>
<div id="visualCodeWrapper">
    <?php include ("visual-code/visual.code.inc");?>
</div>
    <script src="jquery-3.1.1.min.js"></script>
    <script src="main.utility.js"></script>
    <script src="main.js"></script>
    <script src="visual-code/visual.code.utility.js"></script>
    <script src="visual-code/visual.code.js"></script>
<?php include ("primitives/footer.inc"); ?>