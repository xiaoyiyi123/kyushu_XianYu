<?php
// id=1&good=abc&budget=1111&note=123&place=1&category=book&status=募集中
$id=$_GET['id'];
$good=$_GET['good'];
$budget=$_GET['budget'];
$note=$_GET['note'];
$place=$_GET['place'];
$category=$_GET['category'];
echo $good;
$dbserver="54.250.5.253";
$dbuser="pbl3";
$dbpwd="123456";
$database="shopping";
$conn=new mysqli($dbserver,$dbuser,$dbpwd,$database);
if ($conn->connect_error){
    die("defeat: " . $conn->connect_error);
    header("Location: ../shop/Japanese/userHomepage_myGoodsList2_PBL2_J.html?success=false");
}
else{
    $sql="UPDATE Purchase SET goods='".$good."',budget='".$budget."',note='".$note."',place='".$place."',category='".$category."' WHERE (`purchase_Id`='".$id."');";
    mysqli_query($conn,$sql);
    $conn->close();
    header("Location: ../shop/Japanese/userHomepage_myGoodsList2_PBL2_J.html");
}

