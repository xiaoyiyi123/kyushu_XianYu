<?php
$dbserver="54.250.5.253";
$dbuser="pbl3";
$dbpwd="123456";
$database="shopping";
$usename=$_COOKIE["my_cookie"];
echo $usename;
$conn=new mysqli($dbserver,$dbuser,$dbpwd,$database);
if ($conn->connect_error)
    die("defeat: " . $conn->connect_error);
$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["file"]["name"]);
$extension = end($temp);     // 获取文件后缀名
if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png"))
&& ($_FILES["file"]["size"] < 2048000)   // 小于 200 kb
&& in_array($extension, $allowedExts))
{
          if ($_FILES["file"]["error"] > 0)
          {
                    echo "错误：: " . $_FILES["file"]["error"] . "<br>";
          }
          elseif($_FILES["file"]["type"] == "image/jpg")
          {
                    $i=move_uploaded_file($_FILES["file"]["tmp_name"], "../images/head/" . $usename . ".jpg");
                    $graph1 = "../../images/head/" . $usename . ".jpg";
                    echo "文件存储在: " . $graph1;
          }
          elseif($_FILES["file"]["type"] == "image/gif")
          {
                    $i=move_uploaded_file($_FILES["file"]["tmp_name"], "../images/head/" . $usename . ".gif");
                    $graph1 = "../../images/head/" . $usename . ".gif";
                    echo "文件存储在: " . $graph1;
          }
          elseif($_FILES["file"]["type"] == "image/jpeg")
          {
                    $i=move_uploaded_file($_FILES["file"]["tmp_name"], "../images/head/" . $usename . ".jpeg");
                    $graph1 = "../../images/head/" . $usename. ".jpeg";
                    echo "文件存储在: " . $graph1;
          }
          elseif($_FILES["file"]["type"] == "image/pjpeg")
          {
                    $i=move_uploaded_file($_FILES["file"]["tmp_name"], "../images/head/" . $usename . ".pjpeg");
                    $graph1 = "../../images/head/" . $usename . ".pjpeg";
                    echo "文件存储在: " . $graph1;
          }
          elseif($_FILES["file"]["type"] == "image/x-png")
          {
                    $i=move_uploaded_file($_FILES["file"]["tmp_name"], "../images/head/" . $usename . ".x-png");
                    $graph1 = "../../images/head/" . $usename . ".x-png";
                    echo "文件存储在: " . $graph1;
          }
          else
          {
                    $i=move_uploaded_file($_FILES["file"]["tmp_name"], "../images/head/" . $usename . ".png");
                    $graph1 = "../../images/head/" . $usename . ".png";
                    echo "文件存储在: " . $graph1;
          }
}
else
{
          echo "非法的文件格式";
}
$sql ="update Users SET Photo='$graph1' WHERE User_Name='$usename'";
$result = mysqli_query($conn,$sql);
echo "如无需继续添加，请点击下面链接<a href='../shop/Japanese/userHomepage_inform_PBL2_J.html'>返回主页</a>";
?>