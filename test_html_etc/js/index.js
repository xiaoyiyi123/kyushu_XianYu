
//头部 导航栏 JSON获取数据动态创建
$.getJSON("json/nav.json",function (data) {
    var arr1 = data["nav-l"];
    //console.log(arr1);
    var lis='';
    var lis01="";
    var lis02="";
    var lis03="";
    var arr2=data["nav-l-box-right-p"];
    //console.log(arr2);
    var arr3=data["sub-class-right"];
    //左边10次遍历
    for(var i=0; i<arr1.length; i++){
        var as1="";
        for (var o in arr1[i] ){
            //console.log(arr1[i][o]);
            //["食品","酒类","饮料"]
            for(var k in arr1[i][o]){
                //console.log(arr1[i][o][k])
                as1=as1+"<a href='javascript:void(0)' >"+arr1[i][o][k]+"</a>&nbsp;"+"<em>/</em>&nbsp;";
            }
        }
        lis="<li>"
            +"<div class='nav-l-box-left'>"
            +"<div class='nav-l-box2'>"+as1+"</div>"
            +"</div>"
            +"</li>";
        $("#myul").append(lis);
        // 此循环是 取 as3 对应的插入 li
    }

    // 右边三级菜单-文本部分 10次遍历 *左边10次遍历
    for(var i=0; i<arr1.length; i++){
        // 此循环是 取 as3 对应的插入 li
        var cc = 0;
        for(var j in arr2[i]){
            //console.log(arr2[c][j]);
            var as3="";
            for(var n in arr2[i][j]){
                var as2="";
                for(var q in arr2[i][j][n]){
                    //console.log(q);
                    //console.log(arr2[j][n][q]);
                    as2+="<a href='javascript:void(0);'>"+arr2[i][j][n][q]+"</a>"
                    //重点是 json 每分小数组尾处 直接 数组里加上 br 换行
                    //console.log(as2);
                    //console.log(as3);
                }
                //as3 是  所有的dl 集合
                as3+="<dl><dd class='goods-class'>"+as2+"</dd></dl>"
            }
            //console.log(as3);
            lis01="<div class='nav-l-box-right sub-class'>"
                +"<div class='sub-class-content'>"+as3+"</div>"
                +"</div>"
           // $('#myul>li').each(function () {
                $('#myul>li').eq(cc).find("div").eq(0).after(lis01);
           //     console.log($('#myul>li').length)
           // })
            cc++;
        }
    }
    //右边三级菜单-图片部分 10次遍历 *左边10次遍历
    //注意 for 循环  cc2=0  应该放在循环外面
    var cc2=0;
    for(var i=0; i<arr1.length; i++){
        var str="";
        for(var j2 in arr3[i]){
            var str2=""
            //console.log(arr3[i][j]);
            // ["images/nav-json/nav001.jpg", "images/nav-json/nav002.jpg", "images/nav-json/nav003.jpg"]
            for(var j3 in arr3[i][j2] ){
                //console.log(arr3[i][j2][j3]);
                str2+="<a href='javascript:void(0)' target='_blank'>"
                +"<img src='"+arr3[i][j2][j3]+"' title=''>"
                +"</a>"
                //console.log(str2);
            }
            str="<div class='sub-class-right'>"
                +"<div class='adv-promotions'>"+str2+"</div>"
                +"</div>"
            //console.log(str);
        }
        lis03=str
       // console.log(lis03);
        //console.log(555);
       // console.log(cc2);
        $('#myul>li').eq(cc2).find(".sub-class-content").after(lis03);
        //console.log($('#myul>li').length)
        cc2++;
    }

    //动态创建html
    // lis+="<li>"
// +"<div class='nav-l-box-left'>"
// +"<div class='nav-l-box2'>"+as1+"</div>"+lis02;
//   +"</div>"
// +"<div class='nav-l-box-right sub-class'>"
// +"<div class='sub-class-content'>"+as3+"</div>"
//         +"<div class="sub-class-right">"
//         <div class="adv-promotions">
//         <a href="javascript:void(0)" target="_blank">
//         <img src="https://pic.cnrmall.com/image/ba/f6/baf6018758306619798e00e3b6e3e2b2.jpg" title="">
//         </a>
//         <a href="javascript:void(0)" target="_blank">
//         <img src="https://pic.cnrmall.com/image/3d/31/3d31b4e0313bde61b1d028ec29b38dc8.jpg" title="">
//         </a>
//
//         </div>
//         </div>
// +"</div>"
// +"</li>"
});
//floor 内的 tab切换-轮播图
$(function (){
    //首页楼层tab

    //默认情况下tab-selected
    //注意  addClass()加样式时候 样式名 不加.
    //在 find() 等查找元素时候  样式名前要加.
    //console.log($("ul[data-nc-floor-tab] li:first"));
    $("ul[data-nc-floor-tab] >li:first").addClass("tab-selected")//默认对第一个li 加选择样式
    $(".mc").find(".main:first").removeClass("tab-hide")
    //鼠标移入 tab时
    $("ul[data-nc-floor-tab] >li").bind('mouseover', (function (e) {
        //console.log($(this));
        var tabs = $(this).closest("ul").find("li"),
            panels = $(this).closest("[data-nc-floor-panel]").find(".main"),
            index = $(this).index(),
            index2=index;
            //slider = panels.eq(index).find("ul[data-nc-floor-slider]")
        tabs.removeClass("tab-selected").eq(index).addClass("tab-selected");
        panels.addClass("tab-hide").eq(index2).removeClass("tab-hide");
    }));
    //突出显示效果
    var j=0;
    $(".mc").find(".g-list").children().bind("mouseover",function (){
        console.log($(this));
        $(this).parent().children().eq(j).addClass("g-list-add01");
        $(this).removeClass("g-list-add01")
        j++;
    })
});
// <!--floor内的/轮播图jquery-->
$(function (){
        var i=0;
        var timer=0;
        $('.slider-main-li').eq(0).show().siblings('.slider-main-li').hide();
        //调用showTime() 轮播函数
        showTime();
        $(".bx-pager-item").hover(function(){
            //获取当前i的值，并显示，同时还要清除定时器
            i = $(this).index();
            Show();
            clearInterval(timer);
        },function () {
            showTime();
        });
        //console.log($('.bx-pager-item').eq(0).children());
        function Show(){
            //在这里可以用其他jquery的动画
            $('.slider-main-li').eq(i).fadeIn(300).siblings('.slider-main-li').fadeOut(300);
            //给.tab创建一个新的Class为其添加一个新的样式，并且要在css代码中设置该样式
            $(".bx-pager-01").find('.bx-pager-item').eq(i).children().addClass('bx-pager-item-bg2');
            $('.bx-pager-item').eq(i).siblings('.bx-pager-item').children().removeClass('bx-pager-item-bg2');
        }
        function showTime(){
            //定时器
            timer = setInterval(function(){
                //调用一个Show()函数
                Show();
                i++;
                //当图片是最后一张的后面时，设置图片为第一张
                if(i==7){
                    i=0;
                }
            },2000);
        }
    });
//楼梯效果
$(function(){
    var isMoving = false; //是否正在执行动画
    $(".side-ul li").click(function(){
        //改变楼层 div的选中状态
        $(this).find(".line-div").addClass("current")
            .parent().siblings().find(".line-div").removeClass("current");

        //移动页面到指定的楼层
        var index = $(this).index();
        var top = $("#main>div").eq(index).offset().top;
        isMoving = true;
        $("html,body").animate({scrollTop:top}, 400, function(){
            isMoving = false;
        });
    })

    //页面滚动
    $(window).scroll(function(){
        //当没有正在执行动画的情况下
        if  (!isMoving) {
            var scrollTop = $(window).scrollTop();
            var index =2;
            $("#main>div").each(function(){
                var top = $(this).offset().top;
                //console.log(top);
                if (scrollTop >= top){
                    //console.log($(this).index());
                    index = $(this).index();
                    //console.log(index);
                }
            })
            //console.log(index);
            //改变楼层 div的选中状态
            $(".side-ul li").eq(index).find(".line-div").addClass("current")
                .parent().siblings().find(".line-div").removeClass("current");
        }
    })

});
//左侧导航栏 随滚动条显示隐藏
$(function(){
    var mainTop = $("#main").offset().top;
    //console.log(box2Top);
    $(window).scroll(function(){
        var scrollTop = $(window).scrollTop();

        if (scrollTop >= mainTop) {
            $("#left-nav").css({display:"block"});
        }
        else  {
            $("#left-nav").css({display:"none"});
        }
    })
})

//ajax
//data-products  data-proid='"+data[i].proid+"'
// floor1 内 第2个tab 的产品加载
$(function (){
    //从 proid=12 第12条开始调取 商品
    $.ajax({
        url:"./server/list.php",
        type:"get",
        dataType:"json",
        success:function (data){
            //console.log(data);
            //i=11 即 从数据库 商品表 第 proid=12 处开始调取商品信息
            for(var i=11; i<data.length&&i<=20; i++){
                var tempHTML="<li class='fore2' >";
                tempHTML+="<div class='g-img'>";
                tempHTML+="<a target='_blank' href='details.html' title='"+data[i].proname+"' data-products  data-proid='"+data[i].proid+"'>";
                tempHTML+="<img width='130' height='130' alt='"+data[i].proname+"' src='"+data[i].proimg+"'>";
                tempHTML+="</a></div>";
                tempHTML+="<div class='g-name'>";
                tempHTML+="<a target='_blank' href='details.html' title='"+data[i].proname+"' data-proid='"+data[i].proid+"' data-products>";
                tempHTML+=""+data[i].proname+"</a>";
                tempHTML+="</div>";
                tempHTML+="<div class='g-price'><span>￥</span>"+data[i].proprice+"</div></li>";

                var str=$("#mc_body01>div").eq(2).find(".g-list");
                //console.log($("#mc_body01>div").eq(2));
                str.html(str.html()+tempHTML);
                //console.log(i);
            }

        }
    //     <li class="fore2" >
    //     <div class="g-img">
    //     <a target="_blank" href="javascript:void(0)" title="神栗河北特产有机板栗仁66g*4袋 原产地直供">
    //     <img width="130" height="130" alt="神栗河北特产有机板栗仁66g*4袋 原产地直供" src="images/floor/f1-a001.jpg">
    //     </a>
    //     </div>
    //     <div class="g-name"> <a target="_blank" href="javascript:void(0)" title="神栗河北特产有机板栗仁66g*4袋 原产地直供">神栗河北特产有机板栗仁66g*4袋 原产地直供</a> </div>
    //     <div class="g-price"><span>￥</span>39.80</div>
    //     </li>
    })
});

// floor1 内 第1个tab 的产品加载
$(function (){
    //从 proid=6 第6条开始调取 商品 proid是从1开始
    $.ajax({
        url:"./server/list.php",
        type:"get",
        dataType:"json",
        success:function (data){
            //console.log(data);
            //i=5 即 从数据库 商品表 第 proid=6 处开始调取商品信息
            //target='_blank'
            for(var i=5; i<data.length&&i<=11; i++){
                var tempHTML="<li class='fore1' >";
                tempHTML+="<a href='javascript:void(0)'  data-products  data-proid='"+data[i].proid+"'>";
                tempHTML+="<img src='"+data[i].proimg+"' width='219' height='236' >";
                tempHTML+="</a></li>";
                var str=$("#mc_body01>div").eq(1).find(".main-body");
                //console.log($("#mc_body01>div").eq(2));
                str.html(str.html()+tempHTML);
                //console.log(i);
            }

        }

        // <ul class="main-body">
        // <li class="fore1">
        // <a href="javascript:void(0)" target="_blank"><img src="images/floor/f1-001.jpg" width="219" height="236">
        // </a>  </li>
        // <li class="fore1">
        // <a href="javascript:void(0)" target="_blank"><img src="images/floor/f1-002.jpg" width="219" height="236"></a>  </li>
        // <li class="fore1">
        // <a href="javascript:void(0)" target="_blank"><img src="images/floor/f1-003.jpg" width="219" height="236"></a>  </li>
        // <li class="fore1">
        // <a href="javascript:void(0)" target="_blank"><img src="images/floor/f1-004.jpg" width="219" height="236"></a>  </li>
        // <li class="fore1">
        // <a href="javascript:void(0)" target="_blank"><img src="images/floor/f1-005.jpg" width="219" height="236"></a>  </li>
        // <li class="fore1">
        // <a href="javascript:void(0)" target="_blank"><img src="images/floor/f1-006.jpg" width="219" height="236"></a>  </li>
        // </ul>
    })
})

//main  下第一板块 商品加载
$(function (){
    $.ajax({
        url:"./server/list.php",
        type:"get",
        dataType:"json",
        success:function (data){
            //console.log(data);
            //i=5 即 从数据库 商品表 第 proid=6 处开始调取商品信息
            var c=0
            for(var i=31; i<data.length&&i<=36; i++){
                var tempHTML="<img src='"+data[i].proimg+"'   title='' data-products  data-proid='"+data[i].proid+"'>";
                var ss = $("ul[data-main01]").find("li").eq(c).find("h5");
                //console.log(ss);
                //console.log(tempHTML);
                ss.after(tempHTML)
                c++;
                //console.log(c);
            }

        }
        //<div class="home-sale-layout">
// <ul>
// <li>
// <a target="_blank" href="details.html">
//     <h3>COACH女包</h3>
//     <h5>限时特价仅售959</h5>
//     <img src="images/p001.jpg" title="">
//     </a>
//     </li>
//     </ul>
//     </div>

    });
})


//点击商品详情 将商品 proid通过url传值 到 details页面
$(function (){
    $("body").on("click","img[data-products],a[data-products]",function (){
        //            console.log($(this).data("proid"));
        //假装我从 cookie中取到了当前产品的id的值
        console.log(222);
        console.log($(this));
        var iproid =$(this).attr('data-proid');
//            console.log(proid);
//            var  datacarnumber=$(this).closest("body").find(".num00").attr("value");
//            console.log(iImg);
//            console.log(iProname);
//            console.log(iProprice);
        //同时 从后台 cart表里请求数据 然后动态创建在 前端cartlist里面
//            url = "b.html?name="+name+"&age="+age;//此处拼接内容
        var str = "details.html?proid="+iproid+"";
        console.log(str);
        window.location.replace(str);
        return false;
    })

})





