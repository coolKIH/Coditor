<?php
/**
 * Created by PhpStorm.
 * User: hao
 * Date: 16-11-26
 * Time: 下午4:59
 */
session_start();
$result = [];
$uname = $_SESSION["user"];
if(!isset($uname)) {
    $result["check"] = "not allowed";
} else {
    $result["check"] = "ok";
    $codeObjStr = $_POST["codeObjStr"];
    if (isset($codeObjStr)) {
        $codeObj = json_decode($codeObjStr);
        $html = $codeObj->html;
        $css = $codeObj->css;
        $js = $codeObj->js;
        $title = $codeObj->title;
        require_once ("../mysqli.connect.php");
        require_once ("../classes/MyProj.php");
        require_once "../classes/MyCode.php";
        MyProj::setConn($conn);
        MyCode::setConn($conn);
        $myProj = new MyProj($uname,$title,$html,$css,$js);
        $result["title"] = $title;
    } else {
        $result["check"] = "empty content";
    }
}
echo json_encode($result);
?>