<?php
header('Content-Type:application/json; charset=utf-8');
header("Access-Control-Allow-OriGIN:*");
$campus=$_POST['campus'];
// $dbserver="192.168.10.149";
// $dbuser="pbl";
// $dbpwd="123456";
// $database="shopping";
$dbserver="54.250.5.253";
$dbuser="pbl3";
$dbpwd="123456";
$database="shopping";
$conn=new mysqli($dbserver,$dbuser,$dbpwd,$database);
if ($conn->connect_error)
    die("defeat: " . $conn->connect_error);
//print_r("success");
//print_r("\n");
//$sql="select * from Items where User_Name='".$name."' and Password='".$password."' ";
if($campus!=0){
    $sql1="select * from Items where Campus=".$campus." order by Latest_Update desc";
    $sql2="select * from Purchase where place=".$campus." order by purchase_id desc";
}
elseif($campus==0){
    $sql1="select * from Items order by Latest_Update desc";
    $sql2="select * from Purchase order by purchase_id desc";
}

$result = mysqli_query($conn,$sql1);
$item=array();
for($i=0;$i<8;$i++){
    $row=$result->fetch_assoc();
    array_push($item,array('Id'=>$row["Item_Id"],'Name'=>$row["Item_Name"],'Price'=>$row["Item_Price"],'Description'=>$row["Item_Description"],'Picture'=>$row["Item_Picture"],'Campus'=>$row["Campus"]));
}

$result = mysqli_query($conn,$sql2);
$collect=array();
for($i=0;$i<8;$i++){
    $row=$result->fetch_assoc();
    array_push($collect,array('Id'=>$row["purchase_Id"],'Name'=>$row["goods"],'Price'=>$row["budget"],'Campus'=>$row["place"],'Picture'=>$row["img"]));
}

$sql="select * from History where User_Name = '".$_COOKIE["my_cookie"]."' order by Date desc";
$result = mysqli_query($conn,$sql);
$history=array();
for($i=0;$i<8;$i++){
    $temp=$result->fetch_assoc();
    $itemid=$temp["Item_ID"];
    $sql2="SELECT * from Items where Item_id='".$itemid."'";
    $result2 = mysqli_query($conn,$sql2);
    $temp2=$result2->fetch_assoc();
    
    array_push($history,array('Id'=>$temp2["Item_Id"],'Name'=>$temp2["Item_Name"],'Price'=>$temp2["Item_Price"],'Description'=>$temp2["Item_Description"],'Picture'=>$temp2["Item_Picture"],'Campus'=>$temp2["Campus"]));
    
}
$arr=array(
    'item'=>$item,
    'collect'=>$collect,
    'history'=>$history
);


$conn->close();
exit(json_encode($arr));
?>