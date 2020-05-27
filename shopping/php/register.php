<?php
header('Content-Type:application/json; charset=utf-8');
header("Access-Control-Allow-OriGIN:*");
$dbserver="54.250.5.253";
$dbuser="pbl3";
$dbpwd="123456";
$database="shopping";
$usename=$_POST['nickname'];
$pwd=$_POST['pwd'];
$email=$_POST['email'];
$conn=new mysqli($dbserver,$dbuser,$dbpwd,$database);
if ($conn->connect_error)
    die("defeat: " . $conn->connect_error);
$sql ="INSERT INTO Users(User_Name,Password,Email) VALUES('$usename','$pwd','$email')";
$resut01 = mysqli_query($conn,$sql);
$arr=array();
array_push($arr,"{status:".$resut01."}");
print_r(json_encode($arr));
$conn->close();
?>