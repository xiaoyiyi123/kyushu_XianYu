<?php

header("Content-type:JSON;charset=utf-8");  //统一输出编码为utf-8
header("Access-Control-Allow-Origin:*");

//实现从主页跳转到对应商品的详情页面
//从数据库读取数据并保存城json文件

$servername = "54.250.5.253";
$username = "pbl3";
$password = "123456";
$mysqlname = "shopping"; 
$parameter=$_POST["parameter"];
if($parameter==0){
    $item_id=$_POST["item_id"];
    // 创建连接
    $conn = mysqli_connect($servername, $username, $password, $mysqlname);
    //query from mysql
    $sql = "SELECT * FROM Items where Item_Id ='".$item_id."'";
    //$result = $conn->query($sql);
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $msg=array('Name'=>$row['Item_Name'],'Price'=>$row['Item_Price'],'Description'=>$row['Description'],'Picture'=>$row['Item_Picture'],
    'smallPicture1'=>$row['Item_Picture1'],'smallPicture2'=>$row['Item_Picture2'],'smallPicture3'=>$row['Item_Picture3'],'newPrice'=>$row['Original_Price'],
    'status'=>$row['Status'],'campus'=>$row['Campus'],'note'=>$row['Item_Description'],'userName'=>$row['User_Name'],'category'=>$row['Category']
    );
    $item_Name = $row['Item_Name'];
    $user_Name = $row['User_Name'];
    $photo = "SELECT Photo FROM Users where User_Name ='".$user_Name."'";
    $result2 = $conn->query($photo);
    $row2 = $result2->fetch_assoc();
    $photo_P = $row2['Photo'];

    $message = "SELECT * FROM Messages where Item_Id = '".$item_id."' order by `Time` desc";
    $message_result = $conn->query($message);
    $message_row1 = $message_result->fetch_assoc();
    $message_M1 = array('contents'=>$message_row1['Message_Contents'],'seller'=>$message_row1['Seller'],'buyer'=>$message_row1['Buyer'],
    'time'=>$message_row1['Time'],'item'=>$message_row1['Item']);
    $message_row2 = $message_result->fetch_assoc();
    $message_M2 = array('contents'=>$message_row2['Message_Contents'],'seller'=>$message_row2['Seller'],'buyer'=>$message_row2['Buyer'],
    'time'=>$message_row2['Time'],'item'=>$message_row2['Item']);
    $message_row3 = $message_result->fetch_assoc();
    $message_M3 = array('contents'=>$message_row3['Message_Contents'],'seller'=>$message_row3['Seller'],'buyer'=>$message_row3['Buyer'],
    'time'=>$message_row3['Time'],'item'=>$message_row3['Item']);

    $return=array
    (
        "information"=>$msg,
        "photo"=>$photo_P,
        "message1"=>$message_M1,
        "message2"=>$message_M2,
        "message3"=>$message_M3
    );
}
if($parameter==1)
{
    $conn = mysqli_connect($servername, $username, $password, $mysqlname);
    $date=$_POST["date"];
    $item_id=$_POST["item_id"];
    $new_message=$_POST["message"];

    $sql="INSERT INTO Messages(Item_Id,Message_Contents,Buyer,`Time`) VALUES ('".$item_id."','".$new_message."','".$_COOKIE["my_cookie"]."','".$date."')";
    mysqli_query($conn,$sql);
    
}

if($parameter==2)
{
    $conn = mysqli_connect($servername, $username, $password, $mysqlname);
    $user=$_COOKIE["my_cookie"];
    $item_id=$_POST["item_id"];
    $cllDate=$_POST["cllDate"];

    $r= "select * from Collections where Item_Id = '".$item_id."' and User_Name = '".$user."'";
    $r1= $conn->query($r);
    $nums =$r1->num_rows;
    if($nums == 0){
        $sql="INSERT INTO Collections(Item_Id,`User_Name`,`Date`) VALUES ('".$item_id."','".$user."','".$cllDate."')";
        mysqli_query($conn,$sql);
        $return=0;
    }
    else{
        $return=2;
    }
    
}
if($parameter==3){
    $conn = mysqli_connect($servername, $username, $password, $mysqlname);
    $item_id=$_POST["item_id"];
    $cllDate=$_POST["cllDate"];
    $sql="select * from History where Item_Id = '".$item_id."' and User_Name = '".$_COOKIE['my_cookie']."'";
    $result= $conn->query($sql);
    $num=$result->num_rows;
    if($num==0){
        if($_COOKIE['my_cookie']!=null)
        {
            $sql="INSERT INTO History(Item_Id,`User_Name`,`Date`) VALUES ('".$item_id."','".$_COOKIE['my_cookie']."','".$cllDate."')";
            mysqli_query($conn,$sql);
        }
    }
    else{
        $sql="UPDATE `History` SET `Date` = '".$cllDate."' WHERE (`Item_Id` = '".$item_id."' and `User_Name`='".$_COOKIE['my_cookie']."')";
        
        mysqli_query($conn,$sql);
    }
    $return=3;
}

if($parameter==4){//newadd
    $whose=$_POST["whose"];
    $conn = mysqli_connect($servername, $username, $password, $mysqlname);
    $sql="SELECT * FROM Friends where (User1 = '".$whose."' and User2 = '".$_COOKIE['my_cookie']."') or (User2 = '".$whose."' and User1 = '".$_COOKIE['my_cookie']."')";
    $result= $conn->query($sql);
    $num=$result->num_rows;
    if($num==0 && $_COOKIE['my_cookie'] !=null){
        $sql="INSERT INTO Friends(User1,User2) VALUES ('".$_COOKIE['my_cookie']."','".$whose."')";
    }
    mysqli_query($conn,$sql);
}
exit(json_encode($return));



//$sql2 = "INSERT INTO Messages(Item_Id,Item,Message_Contents,Buyer,Time) VALUES ($item_id,$user,$message,$date,$item_Name)";
//$result3 = mysqli_query($conn,$sql2);

