
$(document).ready(function () {

    var camp = {
        '1': '伊都キャンパス',
        '2': '大橋キャンパス',
        '3': '筑紫キャンパス',
        '4': '病院キャンパス',
        '5': '別府キャンパス'
    }
    var get_user = get_cookie();
    if (get_user != null) {
        $("#login",".user_data","#user_data_frame").text(get_user);
        $("#login",".user_data","#user_data_frame").click(function(){
            window.open("../../shop/Japanese/userHomepage_inform_PBL2_J.html");
        });
        $("#logout",".user_data","#user_data_frame").click(function(){
            
            //setCookie("my_cookie", "", -1);
            //delCookie("my_cookie");
            var exp  = new Date();
            exp.setTime(exp.getTime() - 1);
            document.cookie="my_cookie="+get_user+";expires="+exp.toGMTString()+";path=/";
            console.log(get_cookie());
            if(get_cookie()==null){
                alert("ログアウト成功しました");
                window.location.href="../../shop/Japanese/login_J.html";
            }
            
        });
    }
    if (get_user == null) {
        $("#login", ".user_data", "#user_data_frame").click(function () {
            window.location.href="../../shop/Japanese/login_J.html";
        });
    }
    function dataDisplay(msg,begin,end){
        // console.log(msg.Content);
        // console.log("begin="+begin);
        // console.log(msg.Content[begin]);
        for(var i =begin;i<end;i++){
            $(".uH_detail_bar").append('<div class="uHd_goodFrame">' +
            '<div class="uHd_goodPic">' +
            `<img src = "${ msg.Content[i].Picture}" onerror="this.src='../../img/default.jpg'" />`
             +
            '</div>' +
            '<div class="uHd_detailFrame">' +
            '<div class="uHd_dataFrame">' +
            '<div class="uHd_price">￥' + msg.Content[i].Price + '</div>' +
            '<div class="uHd_area">' + camp[msg.Content[i].Campus] + '</div>' +
            '<div class="uHd_sellerID" style="text-decoration:none;margin-right:20px;"></div>' +
            '</div>' +
            '<div class="uHd_name">' +
            msg.Content[i].Name +
            '</div>' +
            '<div class="uHd_buttonFrame">' +
            '<div class="uHd_button">' +
            '<a href="./detail_PBL2_J.html?id=' + msg.Content[i].Id + '">商品詳細</a>' +
            '</div>' +
            '<div class="uHd_button" id="delete_button">' +
            '<a href="javascript:delete_button(' + msg.Content[i].Id + ')">商品削除</a>' +
            '</div>' +
            '<div class="uHd_data">' +
            msg.Content[i].Date +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>');
        }
    }
    //分页显示
    var num = 3;
    var page;
    var firstPage = 1;
    var now_page = 1;
    $.ajax({
        url: "../../php/collection.php",
        type: "POST",
        data: { "parameter": 0 },
        success: function (msg) {
            console.log(msg);
            page=Math.ceil(msg.Content.length/num);//total pages
            var theLast = (msg.Content.length)%num;
            console.log("last"+theLast);
            var len = msg.Content.length;
            if(theLast!=0){
                var lastStart = len - theLast;
                var end = len;
                console.log(lastStart,end);
            }else{
                var lastStart = len-num;
                var end = len;
                console.log(lastStart);
            }
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
                    dataDisplay(msg,lastStart,end);  
                
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
        error: function () { console.log('error'); }
    });

    $("#delete_button").click(function () {
        console.log("in");
        $.ajax({
            url: "../../php/collection.php",
            type: "POST",
            data:
            {
                "parameter": 1,
                "id": this.id
            },
            success: function (msg) {
                console.log(msg);
            },
            error: function () { console.log('error'); }
        });
    });

});

function delete_button(id) {
    console.log(id);
    $.ajax({
        url: "../../php/collection.php",
        type: "POST",
        data:
        {
            "parameter": 1,
            "id": id
        },
        success: function (msg) {
            console.log(msg);
        },
        error: function () { console.log('error'); }
    });
    window.location.href = "../../shop/Japanese/userHomepage_cart_PBL2_J.html"
    alert('商品を削除しました');
}


function get_cookie() {
    var c_start = document.cookie.indexOf("my_cookie=");
    if (c_start == -1) {
        //alert('Please log in!');
        return null;
    }
    else {
        var strcookie = document.cookie;
        var arrcookie = strcookie.split("; ");
        for (var i = 0; i < arrcookie.length; i++) {
            var arr = arrcookie[i].split("=");
            if (arr[0] == "my_cookie") {
                User = arr[1];
                break;
            }
        }
        return arr[1];
    }
}
