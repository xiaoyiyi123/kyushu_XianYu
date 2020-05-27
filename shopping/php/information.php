<?php
header('Content-Type:application/json; charset=utf-8');
header("Access-Control-Allow-OriGIN:*");
$dbserver="127.0.0.1";
$dbuser="pbl3";
$dbpwd="123456";
$database="shopping";
$usename=$_POST['username'];
$conn=new mysqli($dbserver,$dbuser,$dbpwd,$database);
if ($conn->connect_error)
    die("defeat: " . $conn->connect_error);
$row1=array();
$row2=array();
$row3=array();
$sql="SELECT * from Users where User_Name='$usename'";
$result = mysqli_query($conn,$sql);
$temp=$result->fetch_assoc();
$new=array('campus'=>$temp["Campus"],'photo'=>$temp["Photo"],'introduction'=>$temp["Introduction"]);
array_push($row1,$new);// get information of user

$sql2="SELECT * from Messages where Buyer='$usename'";
$result2 = mysqli_query($conn,$sql2);
$num=$result2->num_rows;
for($i =0;$i<$num;$i++){
    $temp=$result2->fetch_assoc();
    $newitem=$temp["Item_Id"];
    $sql3="SELECT * from Items where Item_id='$newitem'";
    $result3 = mysqli_query($conn,$sql3);
    $temp2=$result3->fetch_assoc();
    $new=array('Id'=>$temp2["Item_Id"],'Comment'=>$temp["Message_Contents"],'Time'=>$temp["Time"],'Name'=>$temp2["Item_Name"],'Price'=>$temp2["Item_Price"],'Picture'=>$temp2["Item_Picture"],'User'=>$temp2["User_Name"],'Campus'=>$temp2["Campus"],'Status'=>$temp2["If_Sold"]);
    array_push($row2,$new);
} // get information of items bought by user

$sql4="SELECT * from Items where User_Name='$usename'";
$result4 = mysqli_query($conn,$sql4);
$num2=$result4->num_rows;
for($i =0;$i<$num2;$i++){
          $temp=$result4->fetch_assoc();
          $new=array('Id'=>$temp["Item_Id"],'Name'=>$temp["Item_Name"],'Price'=>$temp["Item_Price"],'Picture'=>$temp["Item_Picture"],'User'=>$temp["User_Name"],'Campus'=>$temp["Campus"],'Time'=>$temp["Latest_Update"],'Command'=>$temp["Item_Description"],'Status'=>$temp["If_Sold"]);
          array_push($row3,$new);
}// get information of items sold by user
$msg=array
(
"User"=>$row1,
"Buy_Num"=>$num,
"Sell_Num"=>$num2,
"Sell"=>$row3,
"Buy"=>$row2
);
$conn->close();
exit(json_encode($msg));
?>