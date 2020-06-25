<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
$email = $_POST['mail'];
$flag = $_POST['flag'];
$dbserver="54.250.5.253";
$dbuser="pbl3";
$dbpwd="123456";
$database="shopping";
$conn=new mysqli($dbserver,$dbuser,$dbpwd,$database);
if ($conn->connect_error)
    die("defeat: " . $conn->connect_error);
if($flag==1)   //email confirmation and mail sent
{
    
    $language = $_POST['language'];
   // $sql="SELECT * from Users where `User_Name`='".$_COOKIE['my_cookie']."' and `Email`='$email'";
    $sql="SELECT * from Users where `Email`='$email'";
    $result = mysqli_query($conn,$sql);
    $num=$result->num_rows;
    if($num==0)
    {
        $str=0;
        exit(json_encode($str));
    }
    else
    {
        $str = substr(md5(time()),0,4);
        require 'vendor/autoload.php';
        $mail = new PHPMailer(true);

    try {
        //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
        $mail->isSMTP();                                            // Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
        $mail->Username   = 'kyudaidaydayup@gmail.com';                     // SMTP username
        $mail->Password   = 'doubi123456';                               // SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
        $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
        $mail->CharSet= 'UTF-8';
        $mail->setFrom('kyudaidaydayup@gmail.com', 'daydayup');
        $mail->addAddress($email);               // Name is optional
        $mail->isHTML(true);
        if($language==0)
        {                                      // Set email format to HTML
            $mail->Subject = 'パスワード変更';
            $mail->Body    = "下記のコードを送りました。ーーー$str";
        }
        elseif($language==1)
        {
            $mail->Subject = '更改密码';
            $mail->Body    = "验证码已发送ーーー$str";
        }
        else
        {
            $mail->Subject = 'Password change confirmation';
            $mail->Body    = "We have sent the code below to youーーー$str";
        }
        $mail->send();
        //echo 'Message has been sent';
        } 
    catch (Exception $e) 
    {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
    exit($str);
    }
}
if($flag=2)
{
    $password = $_POST['pwd'];
    $sql ="UPDATE Users SET Password='$password' WHERE Email='$email'";   
    $result = mysqli_query($conn,$sql);
    if($result->num_rows==0){
        $b=0;
    }
    else{
        $b=1;
    }
    exit(json_encode($b));
}

?>