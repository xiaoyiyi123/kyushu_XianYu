<?php

error_reporting(0);
$a = $_POST['code'];
$email = $_POST['username'];
if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/",$email)) {
  $emailErr = "非法邮箱格式"; 
}
// $dbms='mysql';
//   $mysql_server_name='192.168.10.149';
//   $mysql_username='pbl';
//   $mysql_password='123456';
//   $mysql_database='shopping';
//   $dsn="$dbms:host=$mysql_server_name;dbname=$mysql_database";
//   $pdo=new PDO($dsn,$mysql_username,$mysql_password);
//   print_r($con->connect_error);
//   $sql="select sex from student where name='$email'";
//   foreach($pdo->query($sql) as $row)
//  {
//   print $row['sex'] . "\t";
// } 
// if($row)
// {  
//    echo "メールは使用されました、下記のリンクをクリックして<a href=index.php>新しいメールを使用してください</a>";
// }  
// else
// {
  $subject = "登録確認";
  $message ="下記のコードを送りました。ーーー"."$a";
  $send=mail($email,$subject,$message);
// }
?>