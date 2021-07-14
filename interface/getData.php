<?php
    include('./library/conn.php');

    $sql = "select * from products";
    $data  =  $mysql->query($sql);
    $mysql->close();

    
    $arr = array();
    while ($row = $data->fetch_assoc()){
        array_push($arr,$row);
    }
    $json = json_encode($arr);
    echo $json;
?>