$(document).ready(function(){
    var get_user=get_cookie();
    if(get_user!=null){
        $("#login",".user_data","#user_data_frame").text(get_user);
        $("#login",".user_data","#user_data_frame").click(function(){
            window.open("../../shop/Japanese/userHomepage_inform_PBL2.html");
        });
        $("#logout").click(function(){
            
            //setCookie("my_cookie", "", -1);
            //delCookie("my_cookie");
            var exp  = new Date();
            exp.setTime(exp.getTime() - 1);
            document.cookie="my_cookie="+get_user+";expires="+exp.toGMTString()+";path=/";
            console.log(get_cookie());
            if(get_cookie()==null){
                alert("Logout successful！");
                window.open("../../shop/Japanese/login.html");
            }
            
        });
    }
    if(get_user==null){
        $("#login",".user_data","#user_data_frame").click(function(){
            window.open("../../shop/English/login.html");
        });
    }
    $.ajax({
        url:"../../php/wantedlist.php",
        type:"POST",
        data:{"parameter":0},
        success: function(msg){
            console.log(msg);
            // var sold= {
            //     '0':'未出售',
            //     '1':'已出售'
            // }
            for(var i =0;i<msg.Num;i++){
                $(".uH_detail_bar").append('<div class="uHd_goodFrame">'+
                // '<div class="uHd_goodPic">'+
                //     '<img img src="'+msg.Content[i].Picture+'" />'+
                // '</div>'+
                '<div class="uHd_detailFrame">'+
                    '<div class="uHd_dataFrame">'+
                        '<div class="uHd_price">￥'+msg.Content[i].budget+'</div>'+
                        '<div class="uHd_area" style="width:auto">商品:'+msg.Content[i].goods+'</div>'+
                        '<div class="uHd_sellerID" style="text-decoration:none;margin-right:20px;"></div>'+
                    '</div>'+
                    '<div class="uHd_name">'+
                        msg.Content[i].note+
                    '</div>'+
                    '<div class="uHd_buttonFrame">'+
                        // '<div class="uHd_button">'+
                        //     '<a href="./detail_PBL2.html?id='+msg.Content[i].Id+'">Detail</a>'+
                        // '</div>'+
                        '<div class="uHd_button" id="delete_button">'+
                            '<a href="javascript:delete_button('+msg.Content[i].purchase_Id+')">Delete</a>'+
                        '</div>'+
                        // '<div class="uHd_data">'+
                        // msg.Content[i].Date+
                        // '</div>'+
                    '</div>'+
                '</div>'+
            '</div>');
            }
            
        },
        error: function () {console.log('error');}
    });
    $("#delete_button").click(function(){
        console.log("in");
        $.ajax({
            url:"../../php/wantedlist.php",
            type:"POST",
            data:
            {
                "parameter":1,
                "id":this.id
            },
            success: function(msg){
                console.log(msg);
            },
            error: function () {console.log('error');}
        });
    });

});

function delete_button(id){
    console.log(id);
        $.ajax({
            url:"../../php/wantedlist.php",
            type:"POST",
            data:
            {
                "parameter":1,
                "id":id
            },
            success: function(msg){
                console.log(msg);
            },
            error: function () {console.log('error');}
        });
        window.location.href="../../shop/Japanese/userHomepage_myGoodsList2_PBL2.html"
        alert('Deleted!');
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