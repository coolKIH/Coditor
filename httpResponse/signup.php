<?php
session_start();
require_once ("../mysqli.connect.php");
/**
 * Created by PhpStorm.
 * User: hao
 * Date: 16-12-7
 * Time: 下午4:06
 */
$result = [];
$result["check"] = "ok";
$username = mysqli_real_escape_string($conn, $_POST["username"].trim(' '));
$email = mysqli_real_escape_string($conn, $_POST["email"].trim(' '));
$password = mysqli_real_escape_string($conn, $_POST["password"].trim(' '));
if($conn) {
    $q = "SELECT * FROM myUser WHERE username='{$username}'";
    $r = mysqli_query($conn, $q);
    if(mysqli_num_rows($r) > 0) {
        $result["check"] = "failure";
        $result["username"] = "用户名已存在";
    }
    $q = "SELECT * FROM myUser WHERE email='{$email}'";
    $r = mysqli_query($conn, $q);
    if(mysqli_num_rows($r) > 0) {
        $result["check"] = "failure";
        $result["email"] = "邮箱地址已存在";
    }
    if($result["check"] == "ok") {
        $q = "INSERT INTO myUser VALUES ('{$username}','{$email}',PASSWORD('{$password}'),NULL)";
        $r= mysqli_query($conn, $q);
        if(!$r) {
            $result["check"] = "server error";
        }
    }
}
echo json_encode($result);
?>