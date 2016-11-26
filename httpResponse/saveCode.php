<?php
/**
 * Created by PhpStorm.
 * User: hao
 * Date: 16-11-26
 * Time: 下午4:59
 */
session_start();
$result = [];
$username = $_SESSION["user"];
if(!isset($username)) {
    $result["check"] = "not allowed";
    echo json_encode($result);
    exit(0);
} else {
    $result["check"] = "ok";
    $codeObjStr = $_POST["codeObjStr"];
    if (isset($codeObjStr)) {
        $codeObj = json_decode($codeObjStr);
        require_once ("../mysqli.connect.php");
        echo json_encode($result);
    } else {
        $result["check"] = "empty content";
        echo json_encode($result);
        exit(1);
    }
}
?>