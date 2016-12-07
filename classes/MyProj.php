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
    public function __construct()
    {
        $argv = func_get_args();
        switch( func_num_args() ) {
            case 1:
                self::__construct1($argv[0]);
                break;
            case 5:
                self::__construct2($argv[0], $argv[1], $argv[2], $argv[3], $argv[4]);
        }
    }
    public function __construct1($projId) {
        $this->setProjId($projId);
        $this->fetchAllFromProjId();
    }
    public function __construct2($username, $title, $htmlCode, $cssCode, $jsCode) {
        $this->title = $title;
        $this->username = $username;
        $this->htmlId = MyCode::saveCodeToDb($htmlCode);
        $this->cssId = MyCode::saveCodeToDb($cssCode);
        $this->jsId = MyCode::saveCodeToDb($jsCode);
        $this->projId = $this->saveProjToDb();
    }
    protected function fetchAllFromProjId() {
        if($this->projId) {
            $q = "SELECT * FROM myProj WHERE projId = '{$this->projId}'";
            if(self::$conn) {
                $r = mysqli_query(self::$conn, $q);
                if(mysqli_num_rows($r) > 0) {
                    $row = mysqli_fetch_array($r);
                    $this->setTitle($row["title"]);
                    $this->setUsername($row["username"]);
                    $this->setLastEdTime($row["lastEdTime"]);
                    $this->setHtmlId($row["htmlId"]);
                    $this->setCssId($row["cssId"]);
                    $this->setJsId($row["jsId"]);
                }
            }
        }
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

    /**
     * @return mixed
     */
    public function getCssId()
    {
        return $this->cssId;
    }

    /**
     * @return mixed
     */
    public function getJsId()
    {
        return $this->jsId;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @return mixed
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @return mixed
     */
    public function getLastEdTime()
    {
        return $this->lastEdTime;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @param null $cssId
     */
    public function setCssId($cssId)
    {
        $this->cssId = $cssId;
    }

    /**
     * @param null $htmlId
     */
    public function setHtmlId($htmlId)
    {
        $this->htmlId = $htmlId;
    }

    /**
     * @param null $jsId
     */
    public function setJsId($jsId)
    {
        $this->jsId = $jsId;
    }

    /**
     * @param mixed $lastEdTime
     */
    public function setLastEdTime($lastEdTime)
    {
        $this->lastEdTime = $lastEdTime;
    }

    /**
     * @param int|null|string $projId
     */
    public function setProjId($projId)
    {
        $this->projId = $projId;
    }

    /**
     * @param mixed $username
     */
    public function setUsername($username)
    {
        $this->username = $username;
    }
    public static function getAllProj() {
        $projects = [];
        if(self::$conn) {
            $q = "select projId from myProj";
            $r = mysqli_query(self::$conn, $q);
            if(mysqli_num_rows($r) > 0) {
                while ($row = mysqli_fetch_array($r)) {
                    $project = new MyProj($row[0]);
                    array_push($projects, $project);
                }
            }
        }
        return $projects;
    }
    public function updateCodeSet($codeSet) {
        $htmlCode = $codeSet["htmlCode"];
        $cssCode = $codeSet["cssCode"];
        $jsCode = $codeSet["jsCode"];
        $projTitle = $codeSet["projTitle"];

        if(!MyCode::getConn()) {
            MyCode::setConn(self::$conn);
        }

        $this->updateProjTitle($projTitle);

        MyCode::updateCode($this->htmlId, $htmlCode);
        MyCode::updateCode($this->cssId, $cssCode);
        MyCode::updateCode($this->jsId, $jsCode);

    }
    protected function updateProjTitle($title) {
        $title = mysqli_real_escape_string(self::$conn, $title);

        $q = "UPDATE myProj SET title = '{$title}' WHERE projId = '{$this->projId}'";
        echo $q;
        $r = mysqli_query(self::$conn, $q);
        return $r;
    }
}
?>