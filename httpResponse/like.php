<?php
/**
 * Created by PhpStorm.
 * User: hao
 * Date: 16-12-21
 * Time: 下午6:03
 */
session_start();
require_once ("../mysqli.connect.php");
if(isset($_SESSION['user'])) {
    $username = $_SESSION['user'];
    if(isset($_POST['projId'])) {
        $projId = $_POST['projId'];
        if($_POST["action"] == "add") {
            $q = "insert into myLike VALUES ('{$username}', '{$projId}')";
            $r = mysqli_query($conn, $q);
            if($r == true) {
                echo "success";
                exit(1);
            }
        } else if($_POST["action"] == "remove") {
            $q = "delete from myLike where username='{$username}' and projId='{$projId}'";
            $r = mysqli_query($conn, $q);
            if($r == 1) {
                echo "success";
                exit(1);
            }
        }

    }
}
echo "failure";
?>