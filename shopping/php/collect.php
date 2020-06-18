<?php

//header("Content-type:JSON;charset=utf-8");
//header();
//header("Access-Control-Allow-Origin:*");
// echo $_FILES["file"];
$picturenum = date("Ymdhis");
$allowedExts = array("gif", "jpeg", "jpg", "png");
//echo $_FILES["file"];
$temp = explode(".", $_FILES["file"]["name"]);
//echo $_FILES["file"]["size"];
$extension = end($temp);     // 获取文件后缀名

if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png"))
&& ($_FILES["file"]["size"] < 204800)   // 小于 200 kb
&& in_array($extension, $allowedExts))
{
    echo $_FILES["file"]["tmp_name"];  
	if ($_FILES["file"]["error"] > 0)
	{
		echo "错误：: " . $_FILES["file"]["error"] . "<br>";
	}
	elseif($_FILES["file"]["type"] == "image/jpg")
	{
        $path = "upload/collect/" . $picturenum . ".jpg";
	}
	elseif($_FILES["file"]["type"] == "image/gif")
	{
        $path = "upload/collect/" . $picturenum . ".gif";
	}
	elseif($_FILES["file"]["type"] == "image/jpeg")
	{
        $path = "upload/collect/" . $picturenum. ".jpeg";
	}
	elseif($_FILES["file"]["type"] == "image/pjpeg")
	{
        $path = "upload/collect/" . $picturenum . ".pjpeg";
	}
	elseif($_FILES["file"]["type"] == "image/x-png")
	{
        $path = "upload/collect/" . $picturenum . ".x-png";
	}
	elseif($_FILES["file"]["type"] == "image/png")
	{
        $path = "upload/collect/" . $picturenum . ".png";
        
    }

    $i=move_uploaded_file($_FILES["file"]["tmp_name"], $path);
    $goods=$_POST['goods'];
    $budget=$_POST['price2'];
    $note=$_POST['descrebe'];
    $place=$_POST['school'];
    $category=$_POST['category'];
    $dbserver="54.250.5.253";
    $dbuser="pbl3";
    $dbpwd="123456";
    $database="shopping";
    $conn=new mysqli($dbserver,$dbuser,$dbpwd,$database);
    if ($conn->connect_error){
        die("defeat: " . $conn->connect_error);
        header("Location: ../shop/Japanese/userHomepage_upload2_PBL2_J.html?success=connectionError");
    }
    else{
        $sql="INSERT INTO Purchase(goods,budget,note,place,category,img,`user_Name`) VALUES ('".$goods."',".$budget.",'".$note."','".$place."','".$category."','".$path."','".$_COOKIE["my_cookie"]."')";
        mysqli_query($conn,$sql);
        $conn->close();
        if($i){
            header("Location: ../shop/Japanese/userHomepage_myGoodsList2_PBL2_J.html");
        }
    }
    
}
else
{
	header("Location: ../shop/Japanese/userHomepage_upload2_PBL2_J.html?success=fileError");
}


// $servername = "54.250.5.253";
// $username = "pbl3";
// $password = "123456";
// $mysqlname = "shopping"; 
// $item_name=$_POST["goodName"];
// $budget=$_POST["budget"];
// $note=$_POST["note"];
// $campus=$_POST["campus"];
// $category=$_POST["category"];
// $user_Name=$_POST["userName"];

// $conn = mysqli_connect($servername, $username, $password, $mysqlname);
// $sql = "INSERT INTO Purchase(goods,budget,note,place,category,user_Name) VALUES ('".$item."','".$budget."','".$node."','".$campus."','".$category."','".$user_Name."')";
// mysqli_query($conn,$sql);
// exit(json_encode($note));
?>