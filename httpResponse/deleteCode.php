<?php
/**
 * Created by PhpStorm.
 * User: hao
 * Date: 16-12-22
 * Time: 上午11:03
 */
session_start();
require_once ("../mysqli.connect.php");
require_once ('../classes/MyProj.php');
MyProj::setConn($conn);
if(isset($_SESSION['user'])) {
    $projId = $_POST['projId'];
    $project = new MyProj($projId);
    if(isset($project)) {
        if($project->remove() == true) {
            echo "success";
        } else {
            echo 'failure';
        }
    }
}
?>