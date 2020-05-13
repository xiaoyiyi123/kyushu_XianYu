<?php
header('Content-Type:application/json; charset=utf-8');
header("Access-Control-Allow-OriGIN:*");
$name=$_POST['username'];
$password=$_POST['password'];
if(!empty($_POST)&&$name&&$password)
{
  $dbserver="127.0.0.1";
  $dbuser="root";
  $dbpwd="123456";
  $database="db_test";
  $conn=new mysqli($dbserver,$dbuser,$dbpwd,$database);
  if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
//print_r("连接成功");
  $sql="select * from Users where Username='".$name."' and Password='".$password."' ";
  //3执行sql 返回结果
  //$result=$conn->query($sql);
  $result = mysqli_query($conn,$sql);
}

if($result->num_rows==1)
{
  //print_r("找到");
  $status=array("status"=>1,"msg"=>"登录成功");
  setcookie('my_cookie',$name,time()+600,'/');
  $status=array_merge($status,$_COOKIE);
  //echo $_COOKIE["user"];
  //print_r($_COOKIE);

  //print_r("{ status:1,msg:'登录成功'}");
}else{
  //print_r("没找到");
  $status=array("status"=>0,"msg"=>"登录失败，用户名或密码错误！");
  //print_r("{ status:0,msg:'登录失败，用户名或密码错误！'}");
}

//4 关闭联机
$conn->close();
exit(json_encode($status));
?>