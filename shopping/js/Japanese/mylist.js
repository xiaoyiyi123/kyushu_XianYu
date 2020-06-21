$(document).ready(function(){
    var get_user=get_cookie();
    if(get_user!=null){
        $("#login",".user_data","#user_data_frame").text(get_user);
        $("#login",".user_data","#user_data_frame").click(function(){
            window.open("../../shop/Japanese/userHomepage_inform_PBL2_J.html");
        });
        $("#logout").click(function(){
            
            //setCookie("my_cookie", "", -1);
            //delCookie("my_cookie");
            var exp  = new Date();
            exp.setTime(exp.getTime() - 1);
            document.cookie="my_cookie="+get_user+";expires="+exp.toGMTString()+";path=/";
            console.log(get_cookie());
            if(get_cookie()==null){
                alert("ログアウト成功しました");
                window.open("../../shop/Japanese/login_J.html");
            }
            
        });
    }
    if(get_user==null){
        $("#login",".user_data","#user_data_frame").click(function(){
            window.open("../../shop/Japanese/login_J.html");
        });
    }
    function dataDisplay(msg,begin,end){
        var sold= {
            '0':'取引中',
            '1':'取引完成'
        }
        console.log(msg.Content);
        console.log("begin="+begin);
        console.log(msg.Content[begin]);
        for(var i =begin;i<end;i++){
            $(".uH_detail_bar").append(
                `<div class="uHd_goodFrame">
                    <div class="uHd_goodPic">
                    <img img src="${msg.Content[i].Picture}" onerror="this.src='../../img/default.jpg'" />
                </div>
                <div class="uHd_detailFrame">
                <div class="uHd_dataFrame">
                <div class="uHd_price">￥${msg.Content[i].Price}</div>
                <div class="uHd_area" style="width:auto">取引状態:${sold[msg.Content[i].Sold]}</div>
                <div class="uHd_sellerID" style="text-decoration:none;margin-right:20px;"></div>
                </div>
                <div class="uHd_name">
                    ${msg.Content[i].Name}
                </div>
                <div class="uHd_buttonFrame">
                    <div class="uHd_button">
                <a href="./detail_PBL2_J.html?id=${msg.Content[i].Id} ">商品詳細</a>
                    </div>
                    <div class="uHd_button" id="delete_button">
                <a href="javascript:delete_button(${msg.Content[i].Id})">商品削除</a>
                    </div>
                    <div class="uHd_data">
                    ${msg.Content[i].Date}
                    </div>
                </div>
            </div>
        </div>
                `       
            
            );
        }
    }
    var num = 3;
    var page;
    var firstPage = 1;
    var now_page = 1;
    
    $.ajax({
        url:"../../php/mylist.php",
        type:"POST",
        data:{"parameter":0},
        success: function(msg){
            console.log(msg);
            page=Math.ceil(msg.Content.length/num);//total pages
            var tPage = Math.floor(msg.Content.length/num);//中间变量用来做最后一页个数的判断
            console.log("tPage:"+tPage);
            var theLast = msg.Content.length-tPage*num;
            console.log("the num in last page:"+theLast);
           
            var index = num;
            //将搜索结果展示到页面上去
            dataDisplay(msg,0,num);

            $(".pS_nextPage").click(function(e){
                
                console.log("正在点击下一页按钮！！！！！！！");    
                now_page+=1;
                $("#now").css("color","white").text(now_page);
                if(now_page<=page){
                    console.log("当前不是最后一页");
                    $(".uH_detail_bar").empty();
                    dataDisplay(msg,index,index+num);
                    index = index+num;
                    console.log("当前的index也就是下一次的起始："+index);

                }else{
                    // console.log("当前是最后一页，index值为：" +(index));
                    // console.log("当前是最后一页，index-num值为：" +(index-num));
                    // console.log("当前是最后一页，num值为：" +(num));
                    now_page = page;
                    console.log("当前是最后一页，now_page值为：" +now_page);
                    $("#now").css("color","white").text(now_page);
                    $(".uH_detail_bar").empty();
                    console.log("当前的index也就是下一次的起始："+index);
                    if(theLast!=0){
                        dataDisplay(msg,index,index+theLast);
                    }else{
                        dataDisplay(msg,index-num,index);
                    }
                    
                    alert("最後ですよ！");

                }  
                console.log("pageNumber:"+now_page);

             });

             $(".pS_prePage").click(function(){
                console.log("正在点击上一页按钮！！！！！！！");
                console.log("上一次停留的时候page为:"+now_page);
                now_page-=1;
                
                    if(now_page>=1){
                        console.log("current index:"+index);
                        console.log("不是第一页！！！！！！！");
                        
                        console.log("current_page:"+now_page);
                        $("#now").css("color","white").text(now_page);
                        $(".uH_detail_bar").empty();
                        if(theLast!=0){
                            console.log("!00000")
                            dataDisplay(msg,index-2*theLast+1,index);
                        }else{
                            console.log("000000");
                            dataDisplay(msg,index-2*num,index-num);
                        }
                        index = index-num;
                        console.log("current index:"+index);
                     }else{
                         console.log("current index:"+index);
                         console.log("当前是第一页别再点啦没有啦！！！！！！！");
                         console.log("上一次停留的时候page为:"+now_page);
                         now_page = 1;
                         $("#now").css("color","white").text(now_page);
                         alert("最初ですよ！");
                     }
                
                
                
            });
            
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
        window.location.href="../../shop/Japanese/userHomepage_myGoodsList_PBL2_J.html"
    alert('削除しました');
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