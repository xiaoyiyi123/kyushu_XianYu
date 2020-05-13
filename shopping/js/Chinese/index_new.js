var camp= {
    '0':'未知校区',
    '1':'伊都校区',
    '2':'大桥校区',
    '3':'筑紫校区',
    '4':'病院校区'
}
$(document).ready(function(){
    var get_user=get_cookie();
    //console.log(get_user);
    if(get_user!=null){
        $("a","#1","#nav_bar").text(get_user);
        $("a","#1","#nav_bar").click(function(){
            window.open("../../shop/Chinese/userHomepage_inform_PBL2.html");
        });
    }
    if(get_user==null){
        $("a","#1","#nav_bar").click(function(){
            window.open("../../shop/Chinese/login.html");
        });
    }

    $.ajax({
        url:"../../php/index.php",
        type:"POST",
        data:{parameter:6},

        success: function(msg){
            console.log(msg);
            for(var i=0;i<8;i++){
                $("#history"+String(i+1)+"_pic").attr({"src":msg[i].Item_Picture});
                $("#history"+String(i+1)+"_a").attr({"href":"./detail_PBL2.html?id="+msg[i].Item_Id});
                $("#history"+String(i+1)+"_camp").text(camp[msg[i].Campus]);
                $("#history"+String(i+1)+"_price").text(msg[i].Item_Price);
                $("#his_name"+String(i+1)).text(msg[i].Item_Name);

            }
            
        },
        error: function () {console.log('error');}
    });

    var a=0;
    camp_change(a)
    PHPConnection(a,'index.php')
    $("#select_0").click(function(){
        a=0;
        camp_change(a)
        PHPConnection(a,'index.php')
    });
    $("#select_1").click(function(){
        a=1;
        camp_change(a)
        PHPConnection(a,'index.php')
    });
    $("#select_2").click(function(){
        a=2;
        // $("#selection_campus").text(camp[a]);
        camp_change(a)
        PHPConnection(a,'index.php')
    });
    $("#select_3").click(function(){
        a=3;
        camp_change(a)
        PHPConnection(a,'index.php')
    });
    $("#select_4").click(function(){
        a=4;
        camp_change(a)
        PHPConnection(a,'index.php')
    });
    $(".input-sub",".search-form",".search-top",".search").click(function(){
        var text=$(".input-text").val();
        var information = {"Text":text,"Campus":a,"Min":0,"Max":9999999999};
        information = JSON.stringify(information);
        localStorage.setItem("temp_info",information);
        window.open("../../shop/Chinese/searchResult_PBL2.html");
    });

});
function PHPConnection(a,b){
    //window.alert("get campus "+ a);
    $.ajax({
        url:"../../php/"+b,
        type:"POST",
        data:{parameter:a},

        success: function(msg){
            var msg = msg;
            //console.log(msg)
            //console.log(msg);
            $("#rcmd1_img").attr({"src": msg.Picture1});
            $("#item1").attr({"href":"./detail_PBL2.html?id="+msg.Id1});
            //console.log($("#rcmd1_img").val());
            var camp= {
                '1':'伊都校区',
                '2':'大桥校区',
                '3':'筑紫校区',
                '4':'病院校区'
            }
            $("#rcmd1_area").text(camp[msg.Campus1]);
            $("#rcmd1_price").text(msg.Price1+'円');
            $("#com_name1").text(msg.Name1);

            $("#rcmd2_img").attr({"src": msg.Picture2});
            $("#item2").attr({"href":"./detail_PBL2.html?id="+msg.Id2});
            $("#rcmd2_area").text(camp[msg.Campus2]);
            $("#rcmd2_price").text(msg.Price2+'円');
            $("#com_name2").text(msg.Name2);

            $("#rcmd3_img").attr({"src": msg.Picture3}); 
            $("#item3").attr({"href":"./detail_PBL2.html?id="+msg.Id3});
            $("#rcmd3_area").text(camp[msg.Campus3]);
            $("#rcmd3_price").text(msg.Price3+'円');
            $("#com_name3").text(msg.Name3);

            $("#rcmd4_img").attr({"src": msg.Picture4}); 
            $("#item4").attr({"href":"./detail_PBL2.html?id="+msg.Id4});
            $("#rcmd4_area").text(camp[msg.Campus4]);
            $("#rcmd4_price").text(msg.Price4+'円');
            $("#com_name4").text(msg.Name4);

            $("#rcmd5_img").attr({"src": msg.Picture5}); 
            $("#item5").attr({"href":"./detail_PBL2.html?id="+msg.Id5});
            $("#rcmd5_area").text(camp[msg.Campus5]);
            $("#rcmd5_price").text(msg.Price5+'円');
            $("#com_name5").text(msg.Name5);

            $("#rcmd6_img").attr({"src": msg.Picture6}); 
            $("#item6").attr({"href":"./detail_PBL2.html?id="+msg.Id6});
            $("#rcmd6_area").text(camp[msg.Campus6]);
            $("#rcmd6_price").text(msg.Price6+'円');
            $("#com_name6").text(msg.Name6);

            $("#rcmd7_img").attr({"src": msg.Picture7}); 
            $("#item7").attr({"href":"./detail_PBL2.html?id="+msg.Id7});
            $("#rcmd7_area").text(camp[msg.Campus7]);
            $("#rcmd7_price").text(msg.Price7+'円');
            $("#com_name7").text(msg.Name7);

            $("#rcmd8_img").attr({"src": msg.Picture8}); 
            $("#item8").attr({"href":"./detail_PBL2.html?id="+msg.Id8});
            $("#rcmd8_area").text(camp[msg.Campus8]);
            $("#rcmd8_price").text(msg.Price8+'円');
            $("#com_name8").text(msg.Name8);
            //alert($("#rcmd1_img").attr("src"));
            //window.location.href="http://localhost/test/Welcome.html";
        },
        error: function () {console.log('error');}
    });
}

function camp_change(a){
    $("#selection_campus").contents()[2].textContent = camp[a];
}
function get_cookie(){
    var c_start=document.cookie.indexOf("my_cookie=");
    if(c_start == -1){
     //alert('Please log in!');
     return null;
    }
    else{
      var strcookie = document.cookie;
      var arrcookie = strcookie.split("; ");
      for ( var i = 0; i < arrcookie.length; i++)
      {
          var arr = arrcookie[i].split("=");
          if (arr[0] == "my_cookie"){
            User=arr[1];
            break;
          }
      }
      return arr[1];
    }
  }
  