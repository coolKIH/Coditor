<?php
session_start();
/**
 * Created by PhpStorm.
 * User: hao
 * Date: 16-12-7
 * Time: 上午9:32
 */
if($_SESSION['user']) {
    require_once ("../mysqli.connect.php");
    if($conn) {
        $htmlCode = $_POST['html'];
        $cssCode = $_POST['css'];
        $jsCode = $_POST['js'];
        $projTitle = $_POST['projTitle'];

        $newCodeSet = [];
        $newCodeSet['htmlCode'] = $htmlCode;
        $newCodeSet['cssCode'] = $cssCode;
        $newCodeSet['jsCode'] = $jsCode;
        $newCodeSet['projTitle'] = $projTitle;

        $projId = $_POST['projId'];
        require_once ("../classes/MyCode.php");
        require_once ("../classes/MyProj.php");
        MyCode::setConn($conn);
        MyProj::setConn($conn);
        $myProj = new MyProj($projId);
        if($myProj) {
            $myProj->updateCodeSet($newCodeSet);
        }
    }
}
?>