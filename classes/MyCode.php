<?php

/**
 * Created by PhpStorm.
 * User: hao
 * Date: 16-11-28
 * Time: 上午11:56
 */
class MyCode
{
    protected $codeId, $codeText;
    protected static $conn;
    public function __construct($codeId)
    {
        $this->setCodeId($codeId);
        $this->fetchCodeFromId();
    }

    /**
     * @param mixed $conn
     */
    public static function setConn($conn)
    {
        self::$conn = $conn;
    }

    /**
     * @return null
     */
    public function getCodeId()
    {
        return $this->codeId;
    }

    /**
     * @return mixed
     */
    public function getCodeText()
    {
        return $this->codeText;
    }
    public static function saveCodeToDb($code) {
        if(!self::$conn) {
            return null;
        }
        $escCodeText = mysqli_real_escape_string(self::$conn, $code);
        $q = "INSERT INTO myCode VALUES (NULL, '{$escCodeText}')";
        $r = mysqli_query(self::$conn,$q);
        if($r) {
            return mysqli_insert_id(self::$conn);
        } else {
            return null;
        }
    }

    /**
     * @param mixed $codeId
     */
    public function setCodeId($codeId)
    {
        $this->codeId = $codeId;
    }

    /**
     * @param mixed $codeText
     */
    public function setCodeText($codeText)
    {
        $this->codeText = $codeText;
    }
    protected function fetchCodeFromId() {
        if(self::$conn) {
            $q = "SELECT codeText FROM myCode WHERE codeId = '{$this->codeId}'";
            $r = mysqli_query(self::$conn, $q);
            if(mysqli_num_rows($r) > 0) {
                $row = mysqli_fetch_row($r);
                $this->setCodeText($row[0]);
            }
        }
    }
    public static function updateCode($codeId, $codeText) {
        $escapeCodeText = mysqli_real_escape_string(self::$conn, $codeText);
        $q = "UPDATE myCode SET codeText = '{$escapeCodeText}' WHERE codeId = {$codeId}";
        $r = mysqli_query(self::$conn, $q);
        return $r;
    }

    /**
     * @return mixed
     */
    public static function getConn()
    {
        return self::$conn;
    }
}
?>