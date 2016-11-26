<?php
/**
 * Created by PhpStorm.
 * User: hao
 * Date: 16-11-25
 * Time: 下午10:15
 */
session_start();
$account = $_POST["account"];
$psw = $_POST["psw"];
$response = array("check"=>"ok","username"=>"Hao");
$_SESSION["user"] = "Hao";
$jsonRes = json_encode($response);
echo $jsonRes;
?>