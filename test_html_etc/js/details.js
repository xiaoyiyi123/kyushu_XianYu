/**
 * Created by Administrator on 2017/6/29 0029.
 */
/**
 * Created by Administrator on 2017/6/27 0027.
 */
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

//提取 url 里的 proid值 根据proid从数据库里提取商品数据 动态创建 对应详情页面
$(function (){
    //获取 url值 的方法
    function getUrlParams() {
        var result = {};
        var params = (window.location.search.split('?')[1] || '').split('&');
        for(var param in params) {
            if (params.hasOwnProperty(param)) {
                paramParts = params[param].split('=');
                result[paramParts[0]] = decodeURIComponent(paramParts[1] || "");
            }
        }
        return result;
    }
    //var str = "details.html?proid="+iproid+"
    //获取url 传值 再在详情页面 从数据库 加载对应商品
    //console.log(getUrlParams());
    var ccc=getUrlParams()
    // console.log(ccc.proid);
    var proid = ccc.proid;
    //console.log(22);

    //从数据库 请求数据 加载到当前详情页面
    $.ajax({
        url:"./server/details.php",
        type:'post',
        data:{
            "proid": proid
        },
        dataType:"json",
        success:function (res) {
            //console.log(res);
            //console.log(33);
            $(".myproname01").html('');
            $("#rmPrice").html('');
            $("#img-bigbox").html('');
            for(var i=0; i<res.length; i++){
                var tempHTML1=res[i].proname;
                $(".myproname01").html(tempHTML1);

                var tempHTML2=res[i].proprice;
                $("#rmPrice").html(tempHTML2);

                // var tempHTML3="<img src='"+res[i].proimg+"' class='bigimg'>";
                // $("#smallArea").before(tempHTML3);
                var src01=res[i].proimg;
                $("#smallImg").find(".bigimg").attr('src',src01);

                var tempHTML4="<img class='minimg' name='minpic' src='"+res[i].proimg+"'>";
                $(".img-midbox01").html(tempHTML4);

                var  tempHTML5= "<i class='fa fa-shopping-cart addcart001' data-products  data-proid='"+res[i].proid+"'></i>加入购物车</a>"
                $("#addCartBtn").html(tempHTML5);

                //  var  tempHTML6="<img id='bigImg' src='"+res[i].proimg+"' />"
                // $("#bigArea").html(tempHTML6);
                var src00=res[i].proimg;
                 $("#bigImg").attr('src',src00)
            }
        }
    })

});


//点击 小图 换大图
$(function (){
    $(".img-midbox a").on("click",'img',function (){
        console.log($(this));
        var newsrc=$(this).prop("src");
        $(".img-bigbox img").attr('src',newsrc);
        //增加 放大的大图也换 图片
        $("#bigImg").attr('src',newsrc);
        $(".img-midbox a.current").removeClass("current");
        $(this).parents("a").addClass("current");
        return false;
    })
});

//详情页里 商品数量加减
$(function (){
    //加
    // console.log($("#mnBuyNumCutBtn"));
    $("#mydd000").on("click",".add00",function (){
        //console.log(111);
        //console.log($(this));
        var  num=$(this).parent().find("#mnBuyNumInput").val()
        //console.log(num);
        var n=1;
        var num=num*1+n*1;
        //设置 num 商品增加数量的上限100件
        if(num==101){
            return
        }
        console.log(num);
        //单个商品件数
        $(this).parent().find("#mnBuyNumInput").val(num);
    })
    //减
    $("#mydd000").on("click",".cut00",function (){
        var num=$(this).parent().find("#mnBuyNumInput").val()
        var n=1;
        var num=num*1-n*1;
        if(num==0){
            return
        }
        //单个商品件数
        $(this).parent().find("#mnBuyNumInput").val(num);
    })
})

//放大镜
$(function(){
    //等比公式
    //小图width/大图width == 小区域width/大区域width
    $("#smallArea").width( $("#smallImg").width() * $("#bigArea").width() / $("#bigImg").width() );
    $("#smallArea").height( $("#smallImg").height() * $("#bigArea").height() /$("#bigImg").height() );

    //放大系数
    var scale = $("#bigImg").width() / $("#smallImg").width();

    //在小图中移动
    $("#smallImg").mousemove(function(e){
        $("#smallArea").show(); //显示小区域
        $("#bigArea").show(); //显示大区域


        var x = e.pageX - $("#smallImg").offset().left - $("#smallArea").width()/2;
        var y = e.pageY - $("#smallImg").offset().top - $("#smallArea").height()/2;

        //控制不超出左右边界
        if (x < 0){
            x = 0;
        }
        else if (x > $("#smallImg").width()-$("#smallArea").width()){
            x = $("#smallImg").width()-$("#smallArea").width();
        }
        //控制不超出上下边界
        if (y < 0){
            y = 0
        }
        else if (y > $("#smallImg").height()-$("#smallArea").height()) {
            y = $("#smallImg").height()-$("#smallArea").height();
        }

        //小区域移动
        $("#smallArea").css({left:x, top:y});

        //大图移动
        $("#bigImg").css({left: -scale*x,top: -scale*y});
    })

    //移除小图
    $("#smallImg").mouseleave(function(){
        $("#smallArea").hide(); //隐藏小区域
        $("#bigArea").hide(); //隐藏大区域
    })
})

