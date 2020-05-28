var camp= {
    '0': '未知キャンパス',
    '1': '伊都キャンパス',
    '2': '大橋キャンパス',
    '3': '筑紫キャンパス',
    '4': '病院キャンパス',
    '5': '別府キャンパス'
}
$(document).ready(function(){
    var get_user=get_cookie();
    if(get_user!=null){
        $("#login",".user_data","#user_data_frame").text(get_user);
        $("#login",".user_data","#user_data_frame").click(function(){
            window.open("../../shop/Chinese/userHomepage_inform_PBL2.html");
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
                window.open("../../shop/Chinese/login.html");
            }
            
        });
    }
    if(get_user==null){
        $("#login",".user_data","#user_data_frame").click(function(){
            window.open("../../shop/Chinese/login.html");
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
                '<div class="uHd_detailFrame" >'+
                    '<div class="uHd_dataFrame">'+
                        '<div class="uHd_price">￥'+msg.Content[i].budget+'</div>'+
                        '<div class="uHd_area" style="width:auto">商品名:'+msg.Content[i].goods+'</div>'+
                        '<div class="uHd_sellerID" style="text-decoration:none;margin-right:20px;"></div>'+
                    '</div>'+
                    '<div class="uHd_name">'+msg.Content[i].note+
                    '</div>'+
                    '<div class="uHd_buttonFrame">'+
                        // '<div class="uHd_button">'+
                        //     '<a href="./detail_PBL2.html?id='+msg.Content[i].Id+'">Detail</a>'+
                        // '</div>'+
                        '<div class="uHd_button" id="delete_button">'+
                            '<a href="javascript:delete_button('+msg.Content[i].purchase_Id+')">删除aa</a>'+
                        '</div>'+
                        '<div class="uHd_button" >'+
                            '<a href="javascript:edit_button()">詳細編集</a>'+
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
        window.location.href="../../shop/Japanese/userHomepage_myGoodsList2_PBL2_J.html"
        alert('Deleted!');
}
function edit_button(){
    console.log("edit");
    var float_frame = document.createElement('div');
    float_frame.className = "float_frame";
    float_frame.style.width="300px";
    float_frame.style.height="260px";
    float_frame.style.position="fixed";
    float_frame.style.left="500px";
    float_frame.style.top="150px";
    float_frame.style.backgroundColor="#ffffff";
    float_frame.style.border = "2px solid #6495ED";
    
    var move = document.createElement('div');
    move.className = "move_box";
    move.style.width="300px";
    move.style.height="20px";
    move.style.position="absolute";
    move.style.left="0px";
    move.style.top="0px";
    move.style.backgroundColor="#6495ED";
    // move.style.border = "1px solid black";
    //move.style.fontSize = "12px";
    var close = document.createElement('div');
    close.style.width="10px";
    close.style.height="10px";
    close.style.position="absolute";
    close.style.left="285px";
    close.style.top="5px";
    close.style.backgroundColor="#ffffff";
    close.style.border = "1px solid #6495ED";
    close.style.fontSize = "12px";
    close.innerHTML='X'

    var float_form = document.createElement('form');
    float_form.style.position = 'absolute';
    float_form.style.left = '50px';
    float_form.style.top = '40px';
    float_form.style.lineHeight = '25px';
    float_form.innerHTML = '募集品名:<input type="text" name="good">\
    <br>\
    予算:<input type="text" name="budget">\
    <br>\
    備考:<input type="text" name="note">\
    <br>\
    取引希望場所:<select name="place">\
    <option value="0">'+camp['0']+'</option>\
    <option value="1">'+camp['1']+'</option>\
    <option value="2">'+camp['2']+'</option>\
    <option value="3">'+camp['3']+'</option>\
    <option value="4">'+camp['4']+'</option>\
    <option value="5">'+camp['5']+'</option>\
    </select>\
    <br>\
    分類:<input type="text" name="category">\
    <br>\
    募集状態:<select name="status">\
    <option>募集中</option>\
    <option>募集終了</option>\
    </select>\
    <input type = "submit" style="position:absolute;left:60px;top:170px" value="アップロード">';
    document.body.appendChild(float_frame);
    float_frame.appendChild(move);
    move.appendChild(close);
    float_frame.appendChild(float_form);
    move.addEventListener('mousedown',function(e){
        x = event.pageX - parseInt(float_frame.style.left);
        y = event.pageY - parseInt(float_frame.style.top);
        document.addEventListener('mousemove',move_frame,false);
        document.addEventListener('mouseup',function(){
        document.removeEventListener('mousemove',move_frame,false);
        },false);

    },false);
    close.addEventListener('click',function(){
        document.body.removeChild(float_frame);
    },false);


}
var x=0,y=0;
function move_frame(e){
    var event = e || window.event;
    var target = document.getElementsByClassName('float_frame')[0];
    target.style.left = event.pageX - x + 'px';
    target.style.top = event.pageY  - y+ 'px';
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