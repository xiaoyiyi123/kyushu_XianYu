<?php
header('Content-Type:application/json; charset=utf-8');
header("Access-Control-Allow-OriGIN:*");
$dbserver="54.250.5.253";
$dbuser="pbl3";
$dbpwd="123456";
$database="shopping";
$gender=$_POST['Gender'];
$campus=$_POST['Campus'];
$introduction=$_POST['Introduction'];
$conn=new mysqli($dbserver,$dbuser,$dbpwd,$database);
if ($conn->connect_error)
    die("defeat: " . $conn->connect_error);

$sql ="UPDATE Users SET Gender='$gender',Campus='$campus',Introduction='$introduction' WHERE User_Name='".$_COOKIE["my_cookie"]."'";   
mysqli_query($conn,$sql);
$conn->close();
exit(json_encode($introduction))
?>