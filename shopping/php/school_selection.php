<?php
header('Content-Type:application/json; charset=utf-8');
header("Access-Control-Allow-OriGIN:*");
$parameter=$_POST['parameter'];
$dbserver="192.168.10.149";
$dbuser="pbl";
$dbpwd="123456";
$database="shopping";
$conn=new mysqli($dbserver,$dbuser,$dbpwd,$database);
if ($conn->connect_error)
    die("defeat: " . $conn->connect_error); 
//print_r("success");
//print_r("\n");
//$sql="select * from Items where User_Name='".$name."' and Password='".$password."' ";
if($parameter==1){
    $sql="select * from Items where Campus=1 order by Latest_Update desc";
}
if($parameter==2){
    $sql="select * from Items order by Latest_Update desc where Campus=2";
}
if($parameter==3){
    $sql="select * from Items order by Latest_Update desc where Campus=3";
}
if($parameter==4){
    $sql="select * from Items order by Latest_Update desc where Campus=4";
}
$result = mysqli_query($conn,$sql);

$row=$result->fetch_assoc();
$arr1=array('Id1'=>$row["Item_Id"],'Name1'=>$row["Item_Name"],'Price1'=>$row["Item_Price"],'Description1'=>$row["Item_Description"],'Picture1'=>$row["Item_Picture"],'Campus1'=>$row["Campus"]);

$row=$result->fetch_assoc();
$arr2=array('Id2'=>$row["Item_Id"],'Name2'=>$row["Item_Name"],'Price2'=>$row["Item_Price"],'Description2'=>$row["Item_Description"],'Picture2'=>$row["Item_Picture"],'Campus2'=>$row["Campus"]);

$row=$result->fetch_assoc();
$arr3=array('Id3'=>$row["Item_Id"],'Name3'=>$row["Item_Name"],'Price3'=>$row["Item_Price"],'Description3'=>$row["Item_Description"],'Picture3'=>$row["Item_Picture"],'Campus3'=>$row["Campus"]);

$row=$result->fetch_assoc();
$arr4=array('Id4'=>$row["Item_Id"],'Name4'=>$row["Item_Name"],'Price4'=>$row["Item_Price"],'Description4'=>$row["Item_Description"],'Picture4'=>$row["Item_Picture"],'Campus4'=>$row["Campus"]);

$row=$result->fetch_assoc();
$arr5=array('Id5'=>$row["Item_Id"],'Name5'=>$row["Item_Name"],'Price5'=>$row["Item_Price"],'Description5'=>$row["Item_Description"],'Picture5'=>$row["Item_Picture"],'Campus5'=>$row["Campus"]);

$row=$result->fetch_assoc();
$arr6=array('Id6'=>$row["Item_Id"],'Name6'=>$row["Item_Name"],'Price6'=>$row["Item_Price"],'Description6'=>$row["Item_Description"],'Picture6'=>$row["Item_Picture"],'Campus6'=>$row["Campus"]);

$row=$result->fetch_assoc();
$arr7=array('Id7'=>$row["Item_Id"],'Name7'=>$row["Item_Name"],'Price7'=>$row["Item_Price"],'Description7'=>$row["Item_Description"],'Picture7'=>$row["Item_Picture"],'Campus7'=>$row["Campus"]);

$row=$result->fetch_assoc();
$arr8=array('Id8'=>$row["Item_Id"],'Name8'=>$row["Item_Name"],'Price8'=>$row["Item_Price"],'Description8'=>$row["Item_Description"],'Picture8'=>$row["Item_Picture"],'Campus8'=>$row["Campus"]);

$arr=array_merge($arr1,$arr2,$arr3,$arr4,$arr5,$arr6,$arr7,$arr8);
$conn->close();
exit(json_encode($arr));
?>