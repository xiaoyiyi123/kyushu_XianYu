var Campus= {
    '0':'未知校区',
    '1':'伊都校区',
    '2':'大桥校区',
    '3':'筑紫校区',
    '4':'病院校区'
}
$(document).ready(function(){
    var obj=JSON.parse(localStorage.getItem("temp_info"));
    console.log(obj);
    //localStorage.removeItem("temp_info");
    $.ajax({
        url:"../../php/search.php",
        type:"POST",
        dataType:'JSON',
        data:{parameter:obj},
        success: function(msg){
            console.log(msg);
            var length = msg.length;
            for(var i =0;i<length;i++){
                $('#searchResult_bar').append(
                '<div class="resultDetail_frame">'+
                    '<div class="rD_image"><a href="../../shop/Chinese/detail_PBL2.html?id='+msg[i].Id+'"><img src="'+msg[i].Picture+'" /></a></div>'+
                    '<div class="rD_price">￥'+msg[i].Price+'</div>'+
                    '<div class="rD_area">'+Campus[msg[i].Campus]+'</div>'+
                    '<div class="rD_name">'+
                        '<a href="#">'+
                            msg[i].Name+
                        '</a>'+
                    '</div>'+
                    '<div class="rD_saler"><a href="#">卖家id:'+msg[i].User+'</a></div>'+
                    '<div class="rD_blank"></div>'+
                '</div>');
            }

        },
        error: function () {console.log('error');}
    })
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
    
});

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