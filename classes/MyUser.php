<?php

/**
 * Created by PhpStorm.
 * User: hao
 * Date: 16-12-7
 * Time: 下午12:36
 */
class MyUser
{
    protected $username, $email, $psw;
    public static function signUpUser($username, $email, $psw) {
        $q = "INSERT INTO myUser VALUES ('{$username}','$email',PASSWORD('{$psw}'),NULL)";

    }
}
?>