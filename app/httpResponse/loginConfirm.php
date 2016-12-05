<?php
/**
 * Created by PhpStorm.
 * User: hao
 * Date: 16-11-25
 * Time: 下午10:15
 */
session_start();
$account = $_POST["account"].trim();
$psw = $_POST["psw"].trim();
$response = [];
if($_SESSION["user"]) {
    $response["check"] = "ok";
} else {
    require_once ("../mysqli.connect.php");
    if(!$conn) {
        $response["check"] = "db not working";
    } else {
        $q = "SELECT username FROM myUser WHERE psw = PASSWORD('{$psw}') AND (username='{$account}' OR email='{$account}')";
        $r = mysqli_query($conn, $q);
        if(mysqli_num_rows($r) > 0) {
            $row = mysqli_fetch_array($r);
            $username = $row[0];
            $_SESSION["user"] = $username;
            $row = mysqli_fetch_array($r);
            $response["check"] = "ok";
            $response["username"] = $username;
        } else {
            $response["check"] = "not correctly matched";
        }
    }
}
$jsonRes = json_encode($response);
echo $jsonRes;
?>