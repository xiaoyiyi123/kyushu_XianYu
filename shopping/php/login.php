<?php
header("Content-type:text/html;charset=utf-8");
header("Access-Control-Allow-OriGIN:*");
error_reporting(0);
//session_start();
$un=$_POST['u_name'];
$pwd=$_POST['u_pwd'];
$dbms='mysql';
$mysql_server_name='127.0.0.1';
$mysql_username='pbl3';
$mysql_password='123456';
$mysql_database='shopping';
$dsn="$dbms:host=$mysql_server_name;dbname=$mysql_database";
$pdo=new PDO($dsn,$mysql_username,$mysql_password);
print_r($con->connect_error);
$sql="SELECT * from Users where `User_Name`='$un' and `Password`='$pwd'";
foreach($pdo->query($sql) as $row)
// {
//   print $row['sex'] . "\t";
// }
if($row)
{  //$_SESSION["username"]=$_POST['username'];
   //echo "ログイン成功！下記のリンクをクリックしてください<a href=index.php>";
    setcookie('my_cookie',$row["User_Name"],time()+2400,'/');
    $arr=array("status"=>1,"msg"=>"登录成功");
    print_r("{ status:1,msg:'登录成功'}");
}  

else
    print_r("{ status:0,msg:'登录失败，用户名或密码错误！'}");
  //echo "ログイン失败！下記のリンクをクリックしてください<a href=login.html>";
?>
