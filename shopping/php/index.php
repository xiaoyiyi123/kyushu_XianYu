<?php
header('Content-Type:application/json; charset=utf-8');
header("Access-Control-Allow-OriGIN:*");
$parameter=$_POST['parameter'];
// $dbserver="192.168.10.149";
// $dbuser="pbl";
// $dbpwd="123456";
// $database="shopping";
$dbserver="54.250.5.253";
$dbuser="pbl3";
$dbpwd="123456";
$database="shopping";
$conn=new mysqli($dbserver,$dbuser,$dbpwd,$database);
if ($conn->connect_error)
    die("defeat: " . $conn->connect_error);
//print_r("success");
//print_r("\n");
//$sql="select * from Items where User_Name='".$name."' and Password='".$password."' ";
if($parameter!=6){
    if($parameter==0){
        $sql="select * from Items order by Latest_Update desc";
    } 
    if($parameter==1){
        $sql="select * from Items where Campus=1 order by Latest_Update desc";
    }
    if($parameter==2){
        $sql="select * from Items where Campus=2 order by Latest_Update desc";
    }
    if($parameter==3){
        $sql="select * from Items where Campus=3 order by Latest_Update desc";
    }
    if($parameter==4){
        $sql="select * from Items where Campus=4 order by Latest_Update desc";
    }
        
    $result = mysqli_query($conn,$sql);

    $row=$result->fetch_assoc();
    $arr1=array('Id1'=>$row["Item_Id"],'Name1'=>$row["Item_Name"],'Price1'=>$row["Item_Price"],'Description1'=>$row["Item_Description"],'Picture1'=>$row["Item_Picture"],'Campus1'=>$row["Campus"]);

    $row=$result->fetch_assoc();
    $arr2=array('Id2'=>$row["Item_Id"],'Name2'=>$row["Item_Name"],'Price2'=>$row["Item_Price"],'Description2'=>$row["Item_Description"],'Picture2'=>$row["Item_Picture"],'Campus2'=>$row["Campus"]);

    $row=$result->fetch_assoc();
    $arr3=array('Id3'=>$row["Item_Id"],'Name3'=>$row["Item_Name"],'Price3'=>$row["Item_Price"],'Description3'=>$row["Item_Description"],'Picture3'=>$row["Item_Picture"],'Campus3'=>$row["Campus"]);

    $row=$result->fetch_assoc();
    $arr4=array('Id4'=>$row["Item_Id"],'Name4'=>$row["Item_Name"],'Price4'=>$row["Item_Price"],'Description4'=>$row["Item_Description"],'Picture4'=>$row["Item_Picture"],'Campus4'=>$row["Campus"]);

    $row=$result->fetch_assoc();
    $arr5=array('Id5'=>$row["Item_Id"],'Name5'=>$row["Item_Name"],'Price5'=>$row["Item_Price"],'Description5'=>$row["Item_Description"],'Picture5'=>$row["Item_Picture"],'Campus5'=>$row["Campus"]);

    $row=$result->fetch_assoc();
    $arr6=array('Id6'=>$row["Item_Id"],'Name6'=>$row["Item_Name"],'Price6'=>$row["Item_Price"],'Description6'=>$row["Item_Description"],'Picture6'=>$row["Item_Picture"],'Campus6'=>$row["Campus"]);

    $row=$result->fetch_assoc();
    $arr7=array('Id7'=>$row["Item_Id"],'Name7'=>$row["Item_Name"],'Price7'=>$row["Item_Price"],'Description7'=>$row["Item_Description"],'Picture7'=>$row["Item_Picture"],'Campus7'=>$row["Campus"]);

    $row=$result->fetch_assoc();
    $arr8=array('Id8'=>$row["Item_Id"],'Name8'=>$row["Item_Name"],'Price8'=>$row["Item_Price"],'Description8'=>$row["Item_Description"],'Picture8'=>$row["Item_Picture"],'Campus8'=>$row["Campus"]);
    $arr=array_merge($arr1,$arr2,$arr3,$arr4,$arr5,$arr6,$arr7,$arr8);
}
if($parameter==6){
    $sql="select * from History where User_Name = '".$_COOKIE["my_cookie"]."' order by Date desc";
    $result = mysqli_query($conn,$sql);
    $row=array();
    for($i =0;$i<8;$i++){
        $temp=$result->fetch_assoc();
        $newitem=$temp["Item_Id"];
        $sql2="SELECT * from Items where Item_id='".$newitem."'";
        $result2 = mysqli_query($conn,$sql2);
        $temp2=$result2->fetch_assoc();
        $new=array('Item_Id'=>$temp2["Item_Id"],'Item_Name'=>$temp2["Item_Name"],'Item_Price'=>$temp2["Item_Price"],'Item_Description'=>$temp2["Item_Description"],'Item_Picture'=>$temp2["Item_Picture"],'Campus'=>$temp2["Campus"]);
        array_push($row,$new);
        
    }
    $arr=$row;
    // $arr1=array('Id1'=>$row[1]["Item_Id"],'Name1'=>$row[1]["Item_Name"],'Price1'=>$row[1]["Item_Price"],'Description1'=>$row[1]["Item_Description"],'Picture1'=>$row[1]["Item_Picture"],'Campus1'=>$row[1]["Campus"]);
    // $arr2=array('Id2'=>$row[2]["Item_Id"],'Name2'=>$row[2]["Item_Name"],'Price2'=>$row[2]["Item_Price"],'Description2'=>$row[2]["Item_Description"],'Picture2'=>$row[2]["Item_Picture"],'Campus2'=>$row[2]["Campus"]);
    // $arr3=array('Id3'=>$row[3]["Item_Id"],'Name3'=>$row[3]["Item_Name"],'Price3'=>$row[3]["Item_Price"],'Description3'=>$row[3]["Item_Description"],'Picture3'=>$row[3]["Item_Picture"],'Campus3'=>$row[3]["Campus"]);
    // $arr4=array('Id4'=>$row[4]["Item_Id"],'Name4'=>$row[4]["Item_Name"],'Price4'=>$row[4]["Item_Price"],'Description4'=>$row[4]["Item_Description"],'Picture4'=>$row[4]["Item_Picture"],'Campus4'=>$row[4]["Campus"]);
    // $arr5=array('Id5'=>$row[5]["Item_Id"],'Name5'=>$row[5]["Item_Name"],'Price5'=>$row[5]["Item_Price"],'Description5'=>$row[5]["Item_Description"],'Picture5'=>$row[5]["Item_Picture"],'Campus5'=>$row[5]["Campus"]);
    // $arr6=array('Id6'=>$row[6]["Item_Id"],'Name6'=>$row[6]["Item_Name"],'Price6'=>$row[6]["Item_Price"],'Description6'=>$row[6]["Item_Description"],'Picture6'=>$row[6]["Item_Picture"],'Campus6'=>$row[6]["Campus"]);
    // $arr7=array('Id7'=>$row[7]["Item_Id"],'Name7'=>$row[7]["Item_Name"],'Price7'=>$row[7]["Item_Price"],'Description7'=>$row[7]["Item_Description"],'Picture7'=>$row[7]["Item_Picture"],'Campus7'=>$row[7]["Campus"]);
    // $arr8=array('Id8'=>$row[8]["Item_Id"],'Name8'=>$row[8]["Item_Name"],'Price8'=>$row[8]["Item_Price"],'Description8'=>$row[8]["Item_Description"],'Picture8'=>$row[8]["Item_Picture"],'Campus8'=>$row[8]["Campus"]);
}


$conn->close();
exit(json_encode($arr));
?>