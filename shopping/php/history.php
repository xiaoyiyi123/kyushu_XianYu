<?php
header('Content-Type:application/json; charset=utf-8');
header("Access-Control-Allow-OriGIN:*");
$parameter=$_POST['parameter'];
$dbserver="192.168.10.149";
$dbuser="pbl3";
$dbpwd="123456";
$database="shopping";
$usename=$_POST['usename'];
$id=$_POST['id'];
$conn=new mysqli($dbserver,$dbuser,$dbpwd,$database);
if ($conn->connect_error)
    die("defeat: " . $conn->connect_error);

if($parameter==0){
    $sql="SELECT * from History where User_Name='$_COOKIE[my_cookie]' order by `Date` DESC";
    $result = mysqli_query($conn,$sql);
    $num=$result->num_rows;
    $row=array();
    for($i =0;$i<$num;$i++){
        $temp=$result->fetch_assoc();
        //$new=array('Id'=>$temp["Item_Id"],'Name'=>$temp["Item_Name"],'Price'=>$temp["Item_Price"],'Picture'=>$temp["Item_Picture"],'User'=>$temp["User_Name"],'Campus'=>$temp["Campus"]);
        $newitem=$temp["Item_Id"];
        $sql2="SELECT * from Items where Item_id='$newitem'";
        $result2 = mysqli_query($conn,$sql2);
        $temp2=$result2->fetch_assoc();
        $new=array('Id'=>$temp2["Item_Id"],'Name'=>$temp2["Item_Name"],'Price'=>$temp2["Item_Price"],'Picture'=>$temp2["Item_Picture"],'User'=>$temp2["User_Name"],'Campus'=>$temp2["Campus"],'Date'=>$temp['Date']);
    
        $sql3="SELECT Date from History where Item_id='$newitem'";
        $result3 = mysqli_query($conn,$sql3);
        $temp3=$result3->fetch_assoc();
        $date= $temp3["Date"];
    
    
        array_push($row,$new);
    }
    $msg=array(
        "Num"=>$num,
        "Content"=>$row
    );
    $return = 1;
}

if($parameter==1){

    $sql="DELETE from History where `Item_Id`='".$id."'";
    mysqli_query($conn,$sql);
    $sql="SELECT * from History where `Item_Id`='".$id."'";
    $result = mysqli_query($conn,$sql);
    if($result->num_rows==0){
        $msg="Success";
    }
    else{
        $msg="faild";
    }
}

//echo $row;
$conn->close();
exit(json_encode($msg));
?>