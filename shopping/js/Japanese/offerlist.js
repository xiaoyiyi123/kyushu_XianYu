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
                window.location.href="../../shop/Japanese/login_J.html";
            }
            
        });
    }
    if(get_user==null){
        $("#login",".user_data","#user_data_frame").click(function(){
            window.location.href="../../shop/Japanese/login_J.html";
        });
    }

    function dataDisplay(msg,begin,end){
        console.log(msg.Content);
        console.log("begin="+begin);
        console.log(msg.Content[begin]);
        for(var i =begin;i<end;i++){
            //console.log(i+msg.Content[i].img);
            $(".uH_detail_bar").append(
            
            `<div class="uHd_goodFrame">
                <div class="uHd_goodPic">
                    <img src = "${msg.Content[i].img}" onerror="this.src='../../img/default.jpg'" />
                </div>
                <div class="uHd_detailFrame">
                    <div class="uHd_dataFrame">
                        <div class="uHd_price"> ￥${msg.Content[i].budget} </div>
                        <div class="uHd_area" style="width:auto">商品名: ${msg.Content[i].goods}</div>
                        <div class="uHd_sellerID" style="text-decoration:none;margin-right:20px;"></div>
                    </div>
                    <div class="uHd_name">${msg.Content[i].note}</div>
                    <div class="uHd_buttonFrame">
                    <div class="uHd_button" id="delete_button">
                        <a href="javascript:delete_button(${msg.Content[i].purchase_Id})">削除</a>
                    </div>
                    <div class="uHd_button">
                    <a href="javascript:edit_button(${i},'${msg.Content[i].purchase_Id}')">詳細編集</a>
                    </div>
                </div>
                </div>
                </div>           
            `
            
            );
        }
    }

    //动态的设置页码并添加页码导航
    
    //分页显示
    var num = 3;
    var page;
    var firstPage = 1;
    var now_page = 1;
    $.ajax({
        url:"../../php/wantedlist.php",
        type:"POST",
        data:{"parameter":0},
        success: function(msg){
            console.log(msg);
            page=Math.ceil(msg.Content.length/num);//total pages
            var theLast = (msg.Content.length)%num;
            console.log("last"+theLast);
            var len = msg.Content.length;
            //动态生成页码
            var str = "";
            
            for (var i = 1; i <=page; i++) {
                str += `<div class="pS_pageNum"><a class="now" href="#">${i}</a></div>`;
                document.getElementById("pageChange").innerHTML = str;

            }
            //将搜索结果初始化展示到页面上去
            if(len<num){
                console.log("len<num");
                dataDisplay(msg,0,len+1);
            }else{
                console.log("len>num");
                dataDisplay(msg,0,num);
            }
            function lastPageShow(p){
                // $("#now").css("color","white").text(p);
                var temp = document.getElementsByClassName("now")[p-1];
                console.log("lastpage"+temp);
                temp.setAttribute('style', 'color:yellow');
                    $(".uH_detail_bar").empty();  
                if(theLast!=0){
                    dataDisplay(msg,len-theLast,len);            
                    }
                else{
                    dataDisplay(msg,len-num,len); 
                }
                
            }
           
            function pageShow(p){
                    //$("#now").css("color","white").text(p);
                    console.log(p);
                    
                    var temp = document.getElementsByClassName("now")[p-1];
                    console.log(temp);
                    temp.setAttribute('style', 'color:yellow');
                    $(".uH_detail_bar").empty();
                    var start = (p-1) * num,
                        end = p*num;
                    console.log("start:"+start);
                    console.log("end:"+end);
                    dataDisplay(msg,start,end); 
            }            
            $(".pS_nextPage").click(function(e){
                console.log("正在点击下一页按钮！！！！！！！");   
                var temp = document.getElementsByClassName("now")[now_page-1];
                    //console.log(temp);
                    temp.setAttribute('style', 'color:white'); 
                now_page+=1;
                if(now_page < page){
                    pageShow(now_page);    
                   
                }else{
                    
                    now_page = page;
                    lastPageShow(now_page);
                }  
            });
            $(".pS_prePage").click(function(){
                var temp = document.getElementsByClassName("now")[now_page-1];
                //console.log(temp);
                temp.setAttribute('style', 'color:white'); 
                now_page-=1;
                
                if(now_page>=1){
                    pageShow(now_page);

                }else{
                    console.log("当前是第一页别再点啦没有啦！！！！！！！");
                    console.log("上一次停留的时候page为:"+now_page);
                    now_page = 1;
                    $("#now").css("color","white").text(now_page);                  
                }
            });
            //点击定向跳转
            $(".pS_frame2_button").click(function(){
                var temp = document.getElementsByClassName("now")[now_page-1];
                //console.log(temp);
                temp.setAttribute('style', 'color:white'); 
                now_page = $("#goPage").val();
                console.log("goPage:"+now_page);
                if(now_page != page){
                    pageShow(now_page);
                }else{
                    lastPageShow(page);
                }
            });

            //每个页面的跳转事件
            var pageN = document.getElementsByClassName("now"),
                len = pageN.length;
            for(var j = 0; j < len; j++){
                (function(n){
                    pageN[n].onclick= function(){
                        var temp = document.getElementsByClassName("now")[now_page-1];
                        temp.setAttribute('style', 'color:white'); 
                        now_page = n+1;
                        console.log("now_page:"+(now_page));

                        if(now_page!= page){
                            pageShow(now_page);
                        }else{
                            lastPageShow(page);
                        }
                    }
                }
                   
                )(j);

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
function edit_button(i,id){
    
    var result;
    $.ajax({
        async: false,
        url:"../../php/wantedlist.php",
        type:"POST",
        data:{"parameter":0},
        success: function(msg){
        result = msg.Content[i];
        
        },
        error: function () {console.log('error');}
    });
    console.log(result);
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
    close.style.lineHeight = "10px";
    close.innerHTML='X'

    var float_form = document.createElement('form');
    float_form.action = '../../php/collect_modify.php';
    float_form.method = 'GET';
    float_form.style.position = 'absolute';
    float_form.style.left = '50px';
    float_form.style.top = '40px';
    float_form.style.lineHeight = '25px';
    float_form.innerHTML = '<input type="hidden" name="id" value = "'+id+'">\
    募集品名:<input type="text" name="good" value="'+result.goods+'">\
    <br>\
    予算:<input type="text" name="budget" value='+result.budget+'>\
    <br>\
    備考:<input type="text" name="note" value='+result.note+'>\
    <br>\
    取引希望場所:<select name="place" id="float_place">\
    <option value="0">'+camp['0']+'</option>\
    <option value="1">'+camp['1']+'</option>\
    <option value="2">'+camp['2']+'</option>\
    <option value="3">'+camp['3']+'</option>\
    <option value="4">'+camp['4']+'</option>\
    <option value="5">'+camp['5']+'</option>\
    </select>\
    <br>\
    分類:<input type="text" name="category" value='+result.category+'>\
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
    $("#float_place").each(function(){
        $(this).find("option").eq(result.place).prop("selected",true);
    });
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