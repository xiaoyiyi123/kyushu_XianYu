<?php
header('Content-Type:application/json; charset=utf-8');
header("Access-Control-Allow-OriGIN:*");
$dbserver="54.250.5.253";
$dbuser="pbl3";
$dbpwd="123456";
$database="shopping";
$conn=new mysqli($dbserver,$dbuser,$dbpwd,$database);
if ($conn->connect_error)
    die("defeat: " . $conn->connect_error);

$sql="SELECT * from Users where `User_Name`='".$_COOKIE["my_cookie"]."'";
    
$result = mysqli_query($conn,$sql);

$row=$result->fetch_assoc();
$arr=array('Name'=>$row["User_Name"],'Email'=>$row["EMail"],'Gender'=>$row["Gender"],'Campus'=>$row["Campus"],'Photo'=>$row["Photo"],'Introduction'=>$row["Introduction"]);

$conn->close();
exit(json_encode($arr));
?>