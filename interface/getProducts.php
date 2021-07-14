<?php
    include('./library/conn.php');

    $id = $_REQUEST['id'];
    $sql = "select * from products where id = $id";
    $data  =  $mysql->query($sql);
    $mysql->close();

    echo json_encode($data->fetch_assoc());
?>