<?php
//header('Content-Type:application/json; charset=utf-8');
header("Access-Control-Allow-OriGIN:*");
$parameter=$_GET['parameter'];
$dbserver="54.250.5.253";
$dbuser="pbl3";
$dbpwd="123456";
$database="shopping";
$conn=new mysqli($dbserver,$dbuser,$dbpwd,$database);
if ($conn->connect_error)
    die("defeat: " . $conn->connect_error);
if($parameter['search']==1){
    if($parameter["Campus"]=='0'){
        $sql="SELECT * from Items where Item_Name LIKE '%".$parameter["Text"]."%' AND Item_Price BETWEEN ".$parameter["Min"]." AND ".$parameter["Max"]."";
    }
    else if($parameter["Campus"]!='0'){
        $sql="SELECT * from Items where Campus='".$parameter["Campus"]."' and Item_Name LIKE '%".$parameter["Text"]."%' AND Item_Price BETWEEN ".$parameter["Min"]." AND ".$parameter["Max"]."";
    }
}
else if($parameter['search']==2){
    if($parameter["Campus"]=='0'){
        $sql="SELECT * from Purchase where goods LIKE '%".$parameter["Text"]."%' AND budget BETWEEN ".$parameter["Min"]." AND ".$parameter["Max"]."";
    }
    else if($parameter["Campus"]!='0'){
        $sql="SELECT * from Puechase where place='".$parameter["Campus"]."' and goods LIKE '%".$parameter["Text"]."%' AND budget BETWEEN ".$parameter["Min"]." AND ".$parameter["Max"]."";
    }
}

$result = mysqli_query($conn,$sql);
$num=$result->num_rows;
$row=array();
if($parameter['search']==1){
    for($i =0;$i<$num;$i++){
        $temp=$result->fetch_assoc();
        $new=array('Id'=>$temp["Item_Id"],'Name'=>$temp["Item_Name"],'Price'=>$temp["Item_Price"],'Picture'=>$temp["Item_Picture"],'User'=>$temp["User_Name"],'Campus'=>$temp["Campus"]);
        array_push($row,$new);
    }
}
else if($parameter['search']==2){
    for($i =0;$i<$num;$i++){
        $temp=$result->fetch_assoc();
        $new=array('Id'=>$temp["purchase_Id"],'Name'=>$temp["goods"],'Price'=>$temp["budget"],'Picture'=>$temp["img"],'User'=>$temp["user_Name"],'Campus'=>$temp["place"]);
        array_push($row,$new);
    }
}
//echo $row;
$conn->close();
exit(json_encode($row));
?>