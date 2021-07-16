<?php
    include('./library/conn.php');

    $getlist = $_REQUEST['getlist'];
    $sql = "select * from products where id in ($getlist)";
    $data  =  $mysql->query($sql);
    $mysql->close();

    $arr = array();
    while ($row = $data->fetch_assoc()){
        array_push($arr,$row);
    }
    $json = json_encode($arr);
    echo $json;
?>