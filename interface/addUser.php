<?php
    include('./library/conn.php');

    $regAddr = $_REQUEST['regAddr'];
    $regPrefix = $_REQUEST['regPrefix'];
    $regPhone = $_REQUEST['regPhone'];
    $regCode = $_REQUEST['regCode'];
    echo "国籍$regAddr 手机前缀$regPrefix 手机号$regPhone 密码$regCode";

    $sql = "select phone from `users` where phone=$regPhone";
    $res = $mysql->query($sql)->num_rows;
    if($res>0){
        echo '已经有了';
        $mysql->close();
        die;
    }

    // $sql = "INSERT INTO `users` (`id`, `name`, `caseword`, `phone`, `frequency`) VALUES (NULL, 'wangdefa', '123456', '123456', '1');";

    // $data  =  $mysql->query($sql);
    // $mysql->close();
?>