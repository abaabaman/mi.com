<?php
    header('content-type:text/html;charset=utf-8');
    
    // 配置
    $mysql_conf = array(
        'host' => 'localhost:3306', // 主机名和端口号
        'db_user' => 'root', // 数据库登陆用户名
        'db_pass' => 'root', // 数据库登陆密码
        'db' => 'mi.com' // 数据库名称
    );
    
    // 登陆(连接)数据库
    $mysql = @new mysqli($mysql_conf['host'],$mysql_conf['db_user'],$mysql_conf['db_pass']);

    if($mysql->connect_errno){  // 判断是否连接有错误
        // die 用于结束代码执行
        die('连接错误'.$mysql->connect_errno);
    }

    // 设置查询字符集
    $mysql->query('set names utf8');

    // 选择数据库
    $select_db = $mysql->select_db($mysql_conf['db']);

    if(!$select_db){ // 判断是否选择成功
        die('数据库选择错误'.$mysql->error);
    }
?>