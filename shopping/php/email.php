<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
// header('Content-Type:application/json; charset=utf-8');
// header("Access-Control-Allow-OriGIN:*");
$dbserver="54.250.5.253";
$dbuser="pbl3";
$dbpwd="123456";
$database="shopping";
$a = $_POST['code'];
$email = $_POST['username'];
$language = $_POST['language'];
$conn=new mysqli($dbserver,$dbuser,$dbpwd,$database);
if ($conn->connect_error)
    die("defeat: " . $conn->connect_error);
$sql="SELECT * from Users where `Email`='$email'";
$result = mysqli_query($conn,$sql);
$num=$result->num_rows;
if($num==0)
{
// Load Composer's autoloader
require 'vendor/autoload.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'kyudaidaydayup@gmail.com';                     // SMTP username
    $mail->Password   = 'doubi123456';                               // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
    $mail->CharSet= 'UTF-8';
    //Recipients
    $mail->setFrom('kyudaidaydayup@gmail.com', 'daydayup');
   // $mail->addAddress('ftdg3w@yahoo.co.jp', 'Joe User');     // Add a recipient
    $mail->addAddress($email);               // Name is optional
   // $mail->addReplyTo('info@example.com', 'Information');
   // $mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');

    // Attachments
    //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    // Content
    $mail->isHTML(true);
    if($language==0)
    {                                      // Set email format to HTML
        $mail->Subject = '登録確認';
        $mail->Body    = "下記のコードを送りました。ーーー$a";
    }
    elseif($language==1)
    {
        $mail->Subject = '注册确认';
        $mail->Body    = "验证码已发送ーーー$a";
    }
    else
    {
        $mail->Subject = 'Registration confirmation';
        $mail->Body    = "We have sent the code below to youーーー$a";
    }
    //$mail->AltBody = '下記のコードを送りました。ーーー"."$a';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    $b=1;
    exit(json_encode($b));
}
}
else
{
    $b=0;
    exit(json_encode($b));
}
?>
