<?php
header('Content-Type:application/json; charset=utf-8');
header("Access-Control-Allow-OriGIN:*");
$parameter=$_POST['parameter'];
$id=$_POST['id'];
$dbserver="192.168.10.149";
$dbuser="pbl";
$dbpwd="123456";
$database="shopping";
$conn=new mysqli($dbserver,$dbuser,$dbpwd,$database);
if ($conn->connect_error)
    die("defeat: " . $conn->connect_error);

if($parameter==0){
    $sql="SELECT * from Items where `User_Name`='".$_COOKIE["my_cookie"]."'";
    $arr=array();
    $result = mysqli_query($conn,$sql);
    $nums=$result->num_rows;
    for($i=0;$i<$nums;$i++){
        $row=$result->fetch_assoc();
        array_push($arr,array('Id'=>$row["Item_Id"],'Name'=>$row["Item_Name"],'Price'=>$row["Item_Price"],'Date'=>$row["Latest_Update"],'Picture'=>$row["Item_Picture"],'Description'=>$row["Item_Description"],'Sold'=>$row["If_Sold"]));
    }
$msg=array
  (
      "Num"=>$nums,
      "Content"=>$arr
  );
}
if($parameter==1){
    $sql="DELETE from Items where `Item_Id`='".$id."'";
    mysqli_query($conn,$sql);
    $sql2="DELETE from Messages where `Item_Id`='".$id."'";
    mysqli_query($conn,$sql2);
    $sql3="DELETE from History where `Item_Id`='".$id."'";
    mysqli_query($conn,$sql3);
    $sql="SELECT * from Items where `Item_Id`='".$id."'";
    $result = mysqli_query($conn,$sql);
    if($result->num_rows==0){
        $msg="Success";
    }
    else{
        $msg="faild";
    }
}

$conn->close();
exit(json_encode($msg));
?>