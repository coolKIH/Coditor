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
    public function __construct($codeText)
    {
        $this->codeText = $codeText;
        $this->codeId = $this->saveTextToDb();
    }

    /**
     * @param mixed $conn
     */
    public static function setConn($conn)
    {
        self::$conn = $conn;
    }
    protected function saveTextToDb() {
        if(!self::$conn) {
            return null;
        }
        $escCodeText = mysqli_real_escape_string(self::$conn, $this->codeText);
        $q = "INSERT INTO myCode VALUES (NULL, '{$escCodeText}')";
        $r = mysqli_query(self::$conn,$q);
        if($r) {
            return mysqli_insert_id(self::$conn);
        } else {
            return null;
        }
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
}
?>