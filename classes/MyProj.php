<?php

/**
 * Created by PhpStorm.
 * User: hao
 * Date: 16-11-28
 * Time: 下午12:16
 */
class MyProj
{
    protected $projId, $title, $username, $htmlId, $cssId, $jsId, $lastEdTime;
    protected static $conn;
    public function __construct($username, $title, $htmlCode, $cssCode, $jsCode)
    {
        $this->title = $title;
        $this->username = $username;
        $myCode = new MyCode($htmlCode);
        $this->htmlId = $myCode->getCodeId();
        $myCode = new MyCode($cssCode);
        $this->cssId = $myCode->getCodeId();
        $myCode = new MyCode($jsCode);
        $this->jsId = $myCode->getCodeId();
        $this->projId = $this->saveProjToDb();
    }

    /**
     * @param mixed $conn
     */
    public static function setConn($conn)
    {
        self::$conn = $conn;
    }
    protected function saveProjToDb() {
        if(!self::$conn) {
            return null;
        }
        $title = mysqli_real_escape_string(self::$conn, $this->title);
        $username = mysqli_real_escape_string(self::$conn,$this->username);
        $q = "INSERT INTO myProj VALUES ('{$title}','{$username}', NULL ,
              '{$this->htmlId}', '{$this->cssId}', '{$this->jsId}', NULL )";
        $r = mysqli_query(self::$conn, $q);
        if($r) {
            return mysqli_insert_id(self::$conn);
        } else {
            return null;
        }
    }

    /**
     * @return int|null|string
     */
    public function getProjId()
    {
        return $this->projId;
    }

    /**
     * @return null
     */
    public function getHtmlId()
    {
        return $this->htmlId;
    }
}
?>