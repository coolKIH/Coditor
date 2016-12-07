<?php
/**
 * Created by PhpStorm.
 * User: hao
 * Date: 16-12-6
 * Time: 下午9:43
 */
$projId = $_POST["projId"];
require_once ("../mysqli.connect.php");
require_once ("../classes/MyCode.php");
require_once ("../classes/MyProj.php");
if(!$conn) exit(0);
MyCode::setConn($conn);
MyProj::setConn($conn);
$project = new MyProj($projId);
$projTitle = $project->getTitle();
$htmlId = $project->getHtmlId();
$htmlCode = (new MyCode($htmlId))->getCodeText();
$cssId = $project->getCssId();
$cssCode = (new MyCode($cssId))->getCodeText();
$jsId = $project->getJsId();
$jsCode = (new MyCode($jsId))->getCodeText();
$code = [];
$code["htmlCode"] = $htmlCode;
$code["cssCode"] = $cssCode;
$code["jsCode"] = $jsCode;
$code["projTitle"] = $projTitle;

$response = json_encode($code);
echo $response;
?>