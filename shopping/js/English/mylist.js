$(document).ready(function(){
    var get_user=get_cookie();
    if(get_user!=null){
        $("#login",".user_data","#user_data_frame").text(get_user);
        $("#login",".user_data","#user_data_frame").click(function(){
            window.open("../../shop/English/userHomepage_inform_PBL2_E.html");
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
                window.open("../../shop/English/login_E.html");
            }
            
        });
    }
    if(get_user==null){
        $("#login",".user_data","#user_data_frame").click(function(){
            window.open("../../shop/English/login_E.html");
        });
    }
    $.ajax({
        url:"../../php/mylist.php",
        type:"POST",
        data:{"parameter":0},
        success: function(msg){
            console.log(msg);
            var sold= {
                '0':'Available',
                '1':'Sold Out'
            }
            for(var i =0;i<msg.Num;i++){
                $(".uH_detail_bar").append('<div class="uHd_goodFrame">'+
                '<div class="uHd_goodPic">'+
                    '<img img src="'+msg.Content[i].Picture+'" />'+
                '</div>'+
                '<div class="uHd_detailFrame">'+
                    '<div class="uHd_dataFrame">'+
                        '<div class="uHd_price">￥'+msg.Content[i].Price+'</div>'+
                        '<div class="uHd_area" style="width:auto">Goods status:'+sold[msg.Content[i].Sold]+'</div>'+
                        '<div class="uHd_sellerID" style="text-decoration:none;margin-right:20px;"></div>'+
                    '</div>'+
                    '<div class="uHd_name">'+
                        msg.Content[i].Name+
                    '</div>'+
                    '<div class="uHd_buttonFrame">'+
                        '<div class="uHd_button">'+
                    '<a href="./detail_PBL2_E.html?id=' + msg.Content[i].Id +'">Detail</a>'+
                        '</div>'+
                        '<div class="uHd_button" id="delete_button">'+
                    '<a href="javascript:delete_button(' + msg.Content[i].Id +')">Delete</a>'+
                        '</div>'+
                        '<div class="uHd_data">'+
                        msg.Content[i].Date+
                        '</div>'+
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
            url:"../../php/mylist.php",
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
            url:"../../php/mylist.php",
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
        window.location.href="../../shop/English/userHomepage_myGoodsList_PBL2_E.html"
    alert('Deleted！');
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