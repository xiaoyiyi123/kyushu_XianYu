<?php

header("Content-type:JSON;charset=utf-8");
header("Access-Control-Allow-Origin:*");


$servername = "127.0.0.1";
$username = "pbl3";
$password = "123456";
$mysqlname = "shopping"; 
$item_name=$_POST["goodName"];
$budget=$_POST["budget"];
$note=$_POST["note"];
$campus=$_POST["campus"];
$category=$_POST["category"];

$conn = mysqli_connect($servername, $username, $password, $mysqlname);
$sql = "INSERT INTO Purchase(goods,budget,note,place,category) VALUES ('".$item."','".$budget."','".$node."','".$campus."','".$category."')";
mysqli_query($conn,$sql);
exit(json_encode($note));
?>