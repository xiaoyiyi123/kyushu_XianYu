<?php
header('Content-Type:application/json; charset=utf-8');
header("Access-Control-Allow-OriGIN:*");
$parameter=$_POST['parameter'];
$id=$_POST['id'];
$dbserver="54.250.5.253";
$dbuser="pbl3";
$dbpwd="123456";
$database="shopping";
$usename=$_POST['username'];
$conn=new mysqli($dbserver,$dbuser,$dbpwd,$database);
if($parameter==0){
    $sql="SELECT * from Purchase where `user_Name`='".$_COOKIE["my_cookie"]."'";
    $arr=array();
    $result = mysqli_query($conn,$sql);
    $nums=$result->num_rows;
    for($i=0;$i<$nums;$i++){
        $row=$result->fetch_assoc();
        array_push($arr,array('purchase_Id'=>$row["purchase_Id"],'goods'=>$row["goods"],'budget'=>$row["budget"],'note'=>$row["note"],'category'=>$row["category"],'place'=>$row["place"]));
    }
    $msg=array
    ( 
      "Num"=>$nums,
      "Content"=>$arr
    );
}
if($parameter==1){
    $sql="DELETE from Purchase where `purchase_Id`='".$id."'";
    mysqli_query($conn,$sql);
    $sql="SELECT * from Purchase where `purchase_Id`='".$id."'";
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