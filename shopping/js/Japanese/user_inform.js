var camp= {
    '0': '未知キャンパス',
    '1': '伊都キャンパス',
    '2': '大橋キャンパス',
    '3': '筑紫キャンパス',
    '4': '病院キャンパス',
    '5': '別府キャンパス'

}

function getParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); 
    return null;
}
var search = location.search;
    //alert(search); //获取URL中?后的句子
    var string = search.split("=")[1]; //分割取出cid
    //alert(string);
    var user = getParameter("user");


$(document).ready(function(){
    var get_user=get_cookie();
    //console.log(get_user);
    if(get_user!=null){
        $("a","#1","#nav_bar").text(get_user);
        $("a","#1","#nav_bar").click(function(){
            window.open("../../shop/Japanese/userHomepage_inform_PBL2_J.html");
        });
    }
    if(get_user==null){
        $("a","#1","#nav_bar").click(function(){
            window.open("../../shop/Japanese/login_J.html");
        });
    }
    //console.log("!!11111");
   
    $.ajax({
        url:"../../php/information.php",
        type:"POST",
        data:{"username":user
      
            },
        success: function(msg){
            console.log(msg);
            var sold= {
                '0':'取引中',
                '1':'取引完成'
            }

        
            // $("#userId").attr({"href":"homepage3to3_PBL2_J.html?userId="+res.information.userName});
            $("img",".h3h_blank").attr({"src":msg.User[0].photo});
            $(".h3h2f_name",".h3h2_frame").text(user);

            $(".h3h2f_area",".h3h2_frame").text(camp[msg.User[0].campus]);
            $(".h3h2f_sign",".h3h2_frame").text(msg.User[0].introduction);

            for(var i =0;i<msg.Sell_Num;i++){
            //     $("#h3_left_bar").append('<div class="uHd_goodFrame">'+
            //     '<div class="uHd_goodPic">'+
            //         '<img img src="'+msg.Content[i].Picture+'" />'+
            //     '</div>'+
            //     '<div class="uHd_detailFrame">'+
            //         '<div class="uHd_dataFrame">'+
            //             '<div class="uHd_price">￥'+msg.Content[i].Price+'</div>'+
            //             '<div class="uHd_area" style="width:auto">商品状态:'+sold[msg.Content[i].Sold]+'</div>'+
            //             '<div class="uHd_sellerID" style="text-decoration:none;margin-right:20px;"></div>'+
            //         '</div>'+
            //         '<div class="uHd_name">'+
            //             msg.Content[i].Name+
            //         '</div>'+
            //         '<div class="uHd_buttonFrame">'+
            //             '<div class="uHd_button">'+
            //                 '<a href="./detail_PBL2.html?id='+msg.Content[i].Id+'">查看详情</a>'+
            //             '</div>'+
            //             '<div class="uHd_button" id="delete_button">'+
            //                 '<a id="'+msg.Content[i].Id+'" href="#">删除商品</a>'+
            //             '</div>'+
            //             '<div class="uHd_data">'+
            //             msg.Content[i].Date+
            //             '</div>'+
            //         '</div>'+
            //     '</div>'+
            // '</div>');
                $("#h3_left_bar").append('<div class="h3l_itemframe">'+
                '<div class="h3li_pic">'+'<img src="'+msg.Sell[i].Picture+'"/>'+'</div>'+
                '<div class="h3li_detail">'+
                    '<div class="h3li_name">'+'<a href="#">'+msg.Sell[i].Name+'</a> '+'</div>'+
                    '<div class="h3li_status">取引状態:'+sold[msg.Sell[i].Status]+'</div>'+
                '</div>');
            }
            for(var j =0;j<msg.Buy_Num;j++){
            
            $("#h3_right_bar").append('<div class="h3r_commendframe">'+'<div class="h3rc_frame1">'+
            '<div class="h3rcf_head">'+'<img src="'+msg.User[0].photo+'"/>'+'</div>'+
            '<div class="h3rcf_name">'+user+'</div>'+
            '<div class="h3rcf_time">'+msg.Buy[j].Time+'</div>'+
        '</div>'+
        '<div class="h3rc_frame2">'+
            '<div class="h3rcf_commend">'+msg.Buy[j].Comment+'</div>'+
        '</div>'+
        '<div class="h3rc_frame3">'+
            '<div class="h3l_itemframe" style="margin-left:90px;margin-top:5px;">'+
                '<div class="h3li_pic">'+'<img src="'+msg.Buy[j].Picture+'" />'+'</div>'+
                '<div class="h3li_detail">'+
                    '<div class="h3li_name">'+'<a href="#">'+msg.Buy[j].Name+'</a>'+'</div>'+
                    '<div class="h3li_status">取引状態:'+sold[msg.Buy[j].Status]+'</div>'+
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
}
);
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

  