<?php
$dbms='mysql';
$mysql_server_name='127.0.0.1';
$mysql_username='pbl3';
$mysql_password='123456';
$mysql_database='shopping';
$dsn="$dbms:host=$mysql_server_name;dbname=$mysql_database";
$db = mysqli_connect('127.0.0.1','pbl','123456','shopping');
print_r($con->connect_error);
$sql="SELECT * FROM Items";
$result = mysqli_query($db,$sql);
$rownum = mysqli_num_rows($result);//获取result的数据数量
$picturenum = $rownum*4;
$picturenum2 = $picturenum+1;
$picturenum3 = $picturenum2+1;
$picturenum4 = $picturenum3+1;
// 允许上传的图片后缀
$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["file1"]["name"]);
//echo $_FILES["file"]["size"];
$extension = end($temp);     // 获取文件后缀名
if ((($_FILES["file1"]["type"] == "image/gif")
|| ($_FILES["file1"]["type"] == "image/jpeg")
|| ($_FILES["file1"]["type"] == "image/jpg")
|| ($_FILES["file1"]["type"] == "image/pjpeg")
|| ($_FILES["file1"]["type"] == "image/x-png")
|| ($_FILES["file1"]["type"] == "image/png"))
&& ($_FILES["file1"]["size"] < 204800)   // 小于 200 kb
&& in_array($extension, $allowedExts))
{
	if ($_FILES["file1"]["error"] > 0)
	{
		echo "错误：: " . $_FILES["file1"]["error"] . "<br>";
	}
	elseif($_FILES["file1"]["type"] == "image/jpg")
	{
		$i=move_uploaded_file($_FILES["file1"]["tmp_name"], "upload/" . $picturenum . ".jpg");
		$graph1 = "upload/" . $picturenum . ".jpg";
	}
	elseif($_FILES["file1"]["type"] == "image/gif")
	{
		$i=move_uploaded_file($_FILES["file1"]["tmp_name"], "upload/" . $picturenum . ".gif");
		$graph1 = "upload/" . $picturenum . ".gif";
	}
	elseif($_FILES["file1"]["type"] == "image/jpeg")
	{
		$i=move_uploaded_file($_FILES["file1"]["tmp_name"], "upload/" . $picturenum . ".jpeg");
		$graph1 = "upload/" . $picturenum. ".jpeg";
	}
	elseif($_FILES["file1"]["type"] == "image/pjpeg")
	{
		$i=move_uploaded_file($_FILES["file1"]["tmp_name"], "upload/" . $picturenum . ".pjpeg");
		$graph1 = "upload/" . $picturenum . ".pjpeg";
	}
	elseif($_FILES["file1"]["type"] == "image/x-png")
	{
		$i=move_uploaded_file($_FILES["file1"]["tmp_name"], "upload/" . $picturenum . ".x-png");
		$graph1 = "upload/" . $picturenum . ".x-png";
	}
	else
	{
		$i=move_uploaded_file($_FILES["file1"]["tmp_name"], "upload/" . $picturenum . ".png");
		$graph1 = "upload/" . $picturenum . ".png";
	}
}
else
{
	echo "文件格式错误，请点击下面链接<a href=‘../shop/Chinese/userHomepage_upload_PBL2.html’>重新添加</a>";
}
$temp2 = explode(".", $_FILES["file2"]["name"]);
//echo $_FILES["file"]["size"];
$extension2 = end($temp2);     // 获取文件后缀名
if ((($_FILES["file2"]["type"] == "image/gif")
|| ($_FILES["file2"]["type"] == "image/jpeg")
|| ($_FILES["file2"]["type"] == "image/jpg")
|| ($_FILES["file2"]["type"] == "image/pjpeg")
|| ($_FILES["file2"]["type"] == "image/x-png")
|| ($_FILES["file2"]["type"] == "image/png"))
&& ($_FILES["file2"]["size"] < 204800)   // 小于 200 kb
&& in_array($extension2, $allowedExts))
{
	if ($_FILES["file2"]["error"] > 0)
	{
		echo "错误：: " . $_FILES["file2"]["error"] . "<br>";
	}
	elseif($_FILES["file2"]["type"] == "image/jpg")
	{
		$i=move_uploaded_file($_FILES["file2"]["tmp_name"], "upload/" . $picturenum2 . ".jpg");
		$graph2 = "upload/" . $picturenum2 . ".jpg";
	}
	elseif($_FILES["file2"]["type"] == "image/gif")
	{
		$i=move_uploaded_file($_FILES["file2"]["tmp_name"], "upload/" . $picturenum2 . ".gif");
		$graph2 = "upload/" . $picturenum2 . ".gif";
	}
	elseif($_FILES["file2"]["type"] == "image/jpeg")
	{
		$i=move_uploaded_file($_FILES["file2"]["tmp_name"], "upload/" . $picturenum2 . ".jpeg");
		$graph2 = "upload/" . $picturenum2 . ".jpeg";
	}
	elseif($_FILES["file2"]["type"] == "image/pjpeg")
	{
		$i=move_uploaded_file($_FILES["file2"]["tmp_name"], "upload/" . $picturenum2 . ".pjpeg");
		$graph2 = "upload/" . $picturenum2 . ".pjpeg";
	}
	elseif($_FILES["file2"]["type"] == "image/x-png")
	{
		$i=move_uploaded_file($_FILES["file2"]["tmp_name"], "upload/" . $picturenum2 . ".x-png");
		$graph2 = "upload/" . $picturenum2 . ".x-png";
	}
	else
	{
		$i=move_uploaded_file($_FILES["file2"]["tmp_name"], "upload/" . $picturenum2 . ".png");
		$graph2 = "upload/" . $picturenum2 . ".png";
	}
}
else
{
	echo "文件格式错误，请点击下面链接<a href=‘../shop/Chinese/userHomepage_upload_PBL2.html’>重新添加</a>\n";
	echo "ファイルエラー。<a href=‘../shop/Chinese/userHomepage_upload_PBL2.html’>こちら</a>でやり直してください\n";
	echo "Fileformat error, please click <a href=‘../shop/Chinese/userHomepage_upload_PBL2.html’ > here </a> to add it again";
}
$temp3 = explode(".", $_FILES["file3"]["name"]);
//echo $_FILES["file"]["size"];
$extension3 = end($temp3);     // 获取文件后缀名
if ((($_FILES["file3"]["type"] == "image/gif")
|| ($_FILES["file3"]["type"] == "image/jpeg")
|| ($_FILES["file3"]["type"] == "image/jpg")
|| ($_FILES["file3"]["type"] == "image/pjpeg")
|| ($_FILES["file3"]["type"] == "image/x-png")
|| ($_FILES["file3"]["type"] == "image/png"))
&& ($_FILES["file3"]["size"] < 204800)   // 小于 200 kb
&& in_array($extension3, $allowedExts))
{
	if ($_FILES["file3"]["error"] > 0)
	{
		echo "错误：: " . $_FILES["file3"]["error"] . "<br>";
	}
	elseif($_FILES["file3"]["type"] == "image/jpg")
	{
		$i=move_uploaded_file($_FILES["file3"]["tmp_name"], "upload/" . $picturenum3 . ".jpg");
		$graph3 = "upload/" . $picturenum3 . ".jpg";
	}
	elseif($_FILES["file3"]["type"] == "image/gif")
	{
		$i=move_uploaded_file($_FILES["file3"]["tmp_name"], "upload/" . $picturenum3 . ".gif");
		$graph3 = "upload/" . $picturenum3 . ".gif";
	}
	elseif($_FILES["file3"]["type"] == "image/jpeg")
	{
		$i=move_uploaded_file($_FILES["file3"]["tmp_name"], "upload/" . $picturenum3 . ".jpeg");
		$graph3 = "upload/" . $picturenum3 . ".jpeg";
	}
	elseif($_FILES["file3"]["type"] == "image/pjpeg")
	{
		$i=move_uploaded_file($_FILES["file3"]["tmp_name"], "upload/" . $picturenum3 . ".pjpeg");
		$graph3 = "upload/" . $picturenum3 . ".pjpeg";
	}
	elseif($_FILES["file3"]["type"] == "image/x-png")
	{
		$i=move_uploaded_file($_FILES["file3"]["tmp_name"], "upload/" . $picturenum3 . ".x-png");
		$graph3 = "upload/" . $picturenum3 . ".x-png";
	}
	else
	{
		$i=move_uploaded_file($_FILES["file3"]["tmp_name"], "upload/" . $picturenum3 . ".png");
		$graph3 = "upload/" . $picturenum3 . ".png";
	}
}
else
{
	echo "文件格式错误，请点击下面链接<a href=upload1.html>重新添加</a>\n";
	echo "ファイルエラー。<a href=‘../shop/Chinese/userHomepage_upload_PBL2.html’>こちら</a>でやり直してください\n";
	echo "Fileformat error, please click <a href=‘../shop/Chinese/userHomepage_upload_PBL2.html’ > here </a> to add it again";
}
$temp4 = explode(".", $_FILES["file4"]["name"]);
//echo $_FILES["file"]["size"];
$extension4 = end($temp4);     // 获取文件后缀名
if ((($_FILES["file4"]["type"] == "image/gif")
|| ($_FILES["file4"]["type"] == "image/jpeg")
|| ($_FILES["file4"]["type"] == "image/jpg")
|| ($_FILES["file4"]["type"] == "image/pjpeg")
|| ($_FILES["file4"]["type"] == "image/x-png")
|| ($_FILES["file4"]["type"] == "image/png"))
&& ($_FILES["file4"]["size"] < 204800)   // 小于 200 kb
&& in_array($extension4, $allowedExts))
{
	if ($_FILES["file4"]["error"] > 0)
	{
		echo "错误：: " . $_FILES["file4"]["error"] . "<br>";
		echo "エラー：: " . $_FILES["file4"]["error"] . "<br>";
		echo "error：: " . $_FILES["file4"]["error"] . "<br>";
	}
	elseif($_FILES["file4"]["type"] == "image/jpg")
	{
		$i=move_uploaded_file($_FILES["file4"]["tmp_name"], "upload/" . $picturenum4 . ".jpg");
		$graph4 = "upload/" . $picturenum4 . ".jpg";
	}
	elseif($_FILES["file4"]["type"] == "image/gif")
	{
		$i=move_uploaded_file($_FILES["file4"]["tmp_name"], "upload/" . $picturenum4 . ".gif");
		$graph4 = "upload/" . $picturenum4 . ".gif";
	}
	elseif($_FILES["file4"]["type"] == "image/jpeg")
	{
		$i=move_uploaded_file($_FILES["file4"]["tmp_name"], "upload/" . $picturenum4 . ".jpeg");
		$graph4 = "upload/" . $picturenum4 . ".jpeg";
	}
	elseif($_FILES["file4"]["type"] == "image/pjpeg")
	{
		$i=move_uploaded_file($_FILES["file4"]["tmp_name"], "upload/" . $picturenum4 . ".pjpeg");
		$graph4 = "upload/" . $picturenum4 . ".pjpeg";
	}
	elseif($_FILES["file4"]["type"] == "image/x-png")
	{
		$i=move_uploaded_file($_FILES["file4"]["tmp_name"], "upload/" . $picturenum4 . ".x-png");
		$graph4 = "upload/" . $picturenum4 . ".x-png";
	}
	else
	{
		$i=move_uploaded_file($_FILES["file4"]["tmp_name"], "upload/" . $picturenum4 . ".png");
		$graph4 = "upload/" . $picturenum4 . ".png";
	}
}
else
{
	echo "文件格式错误，请点击下面链接<a href=‘../shop/Chinese/userHomepage_upload_PBL2.html’>重新添加</a>\n";
	echo "ファイルエラー。<a href=‘../shop/Chinese/userHomepage_upload_PBL2.html’>こちら</a>でやり直してください\n";
	echo "Fileformat error, please click <a href=‘../shop/Chinese/userHomepage_upload_PBL2.html’ > here </a> to add it again";
}
$time=date("Y-m-d H:i:s");
//$user=$_COOKIE["user"];
$name=$_POST['goods'];
$describe=$_POST['descrebe'];
$price1=$_POST['price1'];
$price2=$_POST['price2'];
$state=$_POST['state'];
$school=$_POST['school'];
$category=$_POST['category'];
$item_id=$rownum+1;
$pdo=new PDO($dsn,$mysql_username,$mysql_password);
print_r($con->connect_error);
$graph1="../../php/".$graph1;
$graph2="../../php/".$graph2;
$graph3="../../php/".$graph3;
$graph4="../../php/".$graph4;
$sql2 ="INSERT INTO Items(Item_Name,Item_Price,Item_Description,Item_Picture,User_Name,Campus,Latest_Update,Original_Price,Item_Picture1,Item_Picture2,Item_Picture3,Status,If_Sold,Category) VALUES('$name',$price2,'$describe','$graph1','".$_COOKIE['my_cookie']."',$school,'$time',$price1,'$graph2','$graph3','$graph4','$state',0,'$category')";
$num=$pdo->exec($sql2);
echo "添加成功，如需继续添加请点击下面链接<a href='../shop/Chinese/userHomepage_upload_PBL2.html'>继续添加</a> \n";
echo "如无需继续添加，请点击下面链接<a href='../shop/Chinese/index_PBL2.html'>返回主页</a>\n";
echo "アップロード終わったら、<a href='../shop/Japanese/index_PBL2_J.html'>ホームページ</a>に戻ります。\n";
echo "Add successfully, if you want to continue adding, please click <a href='../shop/English/userHomepage_upload_PBL2_E.html'>here</a> to continue";
echo "Add successfully, if you don't want to continue adding, please click <a href='../shop/English/index_PBL2_E.html'>here</a> to continue";

?>
