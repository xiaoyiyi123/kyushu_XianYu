<?php
header('Content-Type:application/json; charset=utf-8');
header("Access-Control-Allow-OriGIN:*");
$parameter=$_POST['parameter'];
// $dbserver="192.168.10.149";
// $dbuser="pbl";
// $dbpwd="123456";
// $database="shopping";
$dbserver="192.168.10.149";
$dbuser="pbl";
$dbpwd="123456";
$database="shopping";
$conn=new mysqli($dbserver,$dbuser,$dbpwd,$database);
if ($conn->connect_error)
    die("连接失败: " . $conn->connect_error); 
//print_r("连接成功");
//print_r("\n");
//$sql="select * from Items where User_Name='".$name."' and Password='".$password."' ";
$sql="select * from Items order by Latest_Update desc";
$result = mysqli_query($conn,$sql);

$row=$result->fetch_assoc();
$arr1=array('Id1'=>$row["Item_Id"],'Name1'=>$row["Item_Name"],'Price1'=>$row["Item_Price"],'Description1'=>$row["Item_Description"],'Picture1'=>$row["Item_Picture"],'Campus1'=>$row["Campus"]);
//print_r($result);
$row=$result->fetch_assoc();
$arr2=array('Id2'=>$row["Item_Id"],'Name2'=>$row["Item_Name"],'Price2'=>$row["Item_Price"],'Description2'=>$row["Item_Description"],'Picture2'=>$row["Item_Picture"],'Campus2'=>$row["Campus"]);
$row=$result->fetch_assoc();
$arr3=array($arr,'Id3'=>$row["Item_Id"],'Name3'=>$row["Item_Name"],'Price3'=>$row["Item_Price"],'Description3'=>$row["Item_Description"],'Picture3'=>$row["Item_Picture"],'Campus3'=>$row["Campus"]);
$arr=array_merge($arr1, $arr2,$arr3);
$conn->close();
exit(json_encode($arr));
?>