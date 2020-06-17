<?php
header('Content-Type:application/json; charset=utf-8');
header("Access-Control-Allow-OriGIN:*");
$parameter=$_POST['parameter'];
  $dbserver="54.250.5.253";
  $dbuser="pbl3";
  $dbpwd="123456";
  $database="shopping";
  $conn=new mysqli($dbserver,$dbuser,$dbpwd,$database);
  if($conn->connect_error)
  {
    die("连接失败: " . $conn->connect_error);
  }
//$msg=date('Y-m-d h:i:s', time());
//$sql="select message from Chats where Time>'".$stime."'";
if($parameter==0){
  $opposite=$_POST['opposite'];
  //$sql="select * from Chats where Status=0 and From = '".$opposite."'";
  $sql="SELECT * from Chats where `Status`=0 and `From`='".$opposite."'";
  $sql1="SELECT distinct `From` FROM Chats where `Status`=0 and `From`!= '".$_COOKIE["my_cookie"]."'";
  $result = mysqli_query($conn,$sql);
  $result1 = mysqli_query($conn,$sql1);
  $row=$result->fetch_assoc();
  for($i=0;$i<$result1->num_rows;$i++)
  {
    $red=array();
    $get=$result1->fetch_assoc();
    array_push($red,$get["From"]);}
  
  $msg=array('Id'=>$row["Chat_Id"],'From'=>$row["From"],'To'=>$row["To"],'Content'=>$row["Content"],'Time'=>$row["Time"],'Status'=>$row["Status"],'New'=>$red);
  $id=$row["Chat_Id"];
  mysqli_query($conn,"UPDATE Chats SET `Status` = 1 WHERE Chat_Id = $id");
  
}
if($parameter==1){
  $sql="SELECT * from Friends where User1='".$_COOKIE["my_cookie"]."' or User2='".$_COOKIE["my_cookie"]."'";
  $result = mysqli_query($conn,$sql);
  $num=$result->num_rows;
  $msg=array();
  for($i=0;$i<$num;$i++){
    $row=$result->fetch_assoc();
    $arr=array('User1'=>$row["User1"],'User2'=>$row["User2"]);
    if($row["User1"]==$_COOKIE["my_cookie"])
    {
      array_push($msg,$row["User2"]);
    }
    else if($row["User2"]==$_COOKIE["my_cookie"])
    {
      array_push($msg,$row["User1"]);
    }
  }
}
if($parameter==2){
  $content=$_POST['text'];
  $opposite=$_POST['opposite'];
  $time=date('Y-m-d h:i:s', time());
  mysqli_query($conn,"insert into `Chats` (`From`, `To`, `Content`, `Time`, `Status`) VALUES ('".$_COOKIE["my_cookie"]."', '".$opposite."', '".$content."', '$time', '0')");
}
if($parameter==3){
  $opposite=$_POST['opposite'];
  $sql="SELECT * from Chats where (Status=1 and ((`From`='".$opposite."' and `To`='".$_COOKIE["my_cookie"]."') or (`From`='".$_COOKIE["my_cookie"]."' and `To`='".$opposite."'))) or (Status=0 and `From`='".$_COOKIE["my_cookie"]."' and `To`='".$opposite."') order by Time desc limit 5";
  $result = mysqli_query($conn,$sql);
  $row=$result->fetch_assoc();
  $arr1=array('From'=>$row["From"],'To'=>$row["To"],'Content'=>$row["Content"],'Time'=>$row["Time"]);
  $row=$result->fetch_assoc();
  $arr2=array('From'=>$row["From"],'To'=>$row["To"],'Content'=>$row["Content"],'Time'=>$row["Time"]);
  $row=$result->fetch_assoc();
  $arr3=array('From'=>$row["From"],'To'=>$row["To"],'Content'=>$row["Content"],'Time'=>$row["Time"]);
  $row=$result->fetch_assoc();
  $arr4=array('From'=>$row["From"],'To'=>$row["To"],'Content'=>$row["Content"],'Time'=>$row["Time"]);
  $row=$result->fetch_assoc();
  $arr5=array('From'=>$row["From"],'To'=>$row["To"],'Content'=>$row["Content"],'Time'=>$row["Time"]);
  $msg=array
  (
      "From"=>array
      (
        $arr1["From"],
        $arr2["From"],
        $arr3["From"],
        $arr4["From"],
        $arr5["From"]
      ),
      "To"=>array
      (
        $arr1["To"],
        $arr2["To"],
        $arr3["To"],
        $arr4["To"],
        $arr5["To"]
      ),
      "Content"=>array
      (
        $arr1["Content"],
        $arr2["Content"],
        $arr3["Content"],
        $arr4["Content"],
        $arr5["Content"]
      ),
      "Time"=>array
      (
        $arr1["Time"],
        $arr2["Time"],
        $arr3["Time"],
        $arr4["Time"],
        $arr5["Time"]
      )
  );
}

$conn->close();
exit(json_encode($msg));
?>