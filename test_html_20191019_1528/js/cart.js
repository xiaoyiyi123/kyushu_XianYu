/**
 * Created by Administrator on 2017/6/28 0028.
 */
//购物车 cookie
$(function (){
    //【重点】每次刷新页面时候  加载一次 refresh() 购物车页面数据 用于及时刷新当前 购物车内的商品信息
    refresh();

    //购物车页面动态创建  刷新购物车页面
    function refresh(){
        console.log(770);
        if($.cookie("cart")!=null){
            console.log(772);
            var arr = JSON.parse($.cookie("cart"));
            console.log(arr);
            // 读取 购物车cookie  --cart
            if (arr) {
                //     console.log(arr);
                //先清空购物车列表
                $("#mycartcokkie").empty();
                // 调取 cart  cookie 动态创建购物车页面
                console.log(773);
                for (var j = 0; j < arr.length; j++) {
                    var tempHTML00 = "<div class='ncc-mod-tbody' id='modTbody_"+j+"'>";
                    tempHTML00 +="<div class='store-bar'>";
                    tempHTML00 +="<div class='fl'>";
                    tempHTML00 +="<span class='checkbox-layout'><input type='checkbox' class='checkbox checkOnly' data-store-all-check='1' autocomplete='off' id='storeAllCheck_"+j+"' checked='checked'>";
                    tempHTML00 +="<label></label></span><a class='store-name' href='index.html'>央广购物</a>";
                    tempHTML00 +="<div class='im-btn'>";
                    tempHTML00 +="<a href='javascript:;' data-nc-im='' data-im-seller-id='1'><i class='im_common offline'></i></a>";
                    tempHTML00 +="</div> </div> <div class='fr'> </div> </div>";
                    tempHTML00 +="<div class='goods-zone' id='goodsZone_"+arr[j].proid+"' data-goods-modal='1' data-batch-num0='1' data-batch-num1='0' data-batch-num2='0' data-store-id='1'>";
                    tempHTML00 +="<div class='mask-layer'><span class='top'></span><span class='right'></span><span class='bottom'></span><span class='left'></span></div>";
                    tempHTML00 +="<div class='fl m-r-5'>";
                    tempHTML00 +="<span class='checkbox-layout'>";
                    tempHTML00 +="<input type='checkbox' class='checkbox checkOnly' id='spuCheckBox_"+arr[j].proid+"' data-spu-checkbox='"+arr[j].proid+"' data-goods-modal='1' data-spu-store-id='1' autocomplete='off' checked='checked' data-sku-amount='268' data-sku-num='1'>"
                    tempHTML00 +="<label></label> </span> </div>";
                    tempHTML00 +="<div class='goods-img'> <div class='img-vertical'><a href='javascript:;'>";
                    tempHTML00 +="<img src='"+arr[j].proimg+"' alt='' style='max-width:100%; max-height:100%'></a></div>";
                    tempHTML00 +="</div> <div class='goods-main'> <div class='spu-name'>";
                    tempHTML00 +=" <a href='details.html?proid="+arr[j].proid+"' target='_blank'>"+arr[j].proname+"</a></div>";
                    tempHTML00 +="<table class='spu-singles'><tbody>";
                    tempHTML00 +="<tr class='goods-sku' id='goodsSkuPanel_"+arr[j].proid+"' data-goods-spu='"+arr[j].proid+"' data-sku-id='"+arr[j].proid+"' data-cart-id='"+arr[j].proid+"' ";
                    tempHTML00 +="data-goods-modal='1' data-goods-type='normal' data-goods-web-usable='0' data-web-price0='"+arr[j].proprice+"'";
                    tempHTML00 +="data-web-price1='0.00' data-web-price2='0.00' data-goods-price0='298' data-goods-price1='0' data-goods-price2='0' ";
                    tempHTML00 +="data-is-spec='0' data-goods-storage='992' data-unit-name='个'>";
                    tempHTML00 +=" <td style='width: 72px;'>&nbsp;</td> <td class='sku-opt'> </td>";
                    tempHTML00 +="<td class='sku-primary'></td> <td class='sku-quantity'>";
                    tempHTML00 +="<div class='sku-quantity-block clearfix'>";
                    tempHTML00 +="<a href='javascript:void(0)' class='minus crisis subtract00' title='减少'> ";
                    tempHTML00 +="<i class='fa fa-minus ' aria-hidden='true'>-</i></a>";
                    tempHTML00 +="<input type='text' class='input-text num00' value='"+arr[j].num+"' id='buyNumInput_"+arr[j].proid+"' autocomplete='off'>";
                    tempHTML00 +="<a href='javascript:void(0)' class='plus add00' title='增加'>";
                    tempHTML00 +="<i class='fa fa-plus ' aria-hidden='true'>+</i> </a>";
                    tempHTML00 +="<span class='text-warning' style='display: none;'></span> </div> </td>";
                    tempHTML00 +="<td class='sku-delete'><a href='javascript:;' title='删除' data-goods-spec-del='"+arr[j].proid+"'>";
                    tempHTML00 +="<i class='fa fa-trash-o' aria-hidden='true'></i></a></td>";
                    tempHTML00 +="<td class='sku-unitprice prices000' style='text-align: right'>"+arr[j].proprice+"</td>";
                    tempHTML00 +="<td class='sku-rebate'></td> ";
                    tempHTML00 +="<td class='sku-amount'> <div class='sku-amount-block'>";
                    tempHTML00 +="<em id='skuAmount_"+arr[j].proid+"' class='pricesAll' style='text-align: right;display: block;width: 100%'>"+arr[j].proprice*arr[j].num+"</em>";
                    tempHTML00 +="</div> </td> </tr> </tbody> </table>";
                    tempHTML00 +="<div class='panel-remove'>";
                    tempHTML00 +="<a class='icon-collect' href='javascript:;' data-goods-favorites='"+arr[j].proid+"' title='移至收藏'>";
                    tempHTML00 +="<i class='fa fa-star-o iconfont' aria-hidden='true'>&#xe673;</i> </a>";
                    tempHTML00 +="<a class='icon-delete' href='javascript:;' title='删除该商品' data-spu-del='"+arr[j].proid+"'>";
                    tempHTML00 +="<i class='fa fa-trash-o iconfont' aria-hidden='true'>&#xe733;</i>";
                    tempHTML00 +="</a> </div> </div> </div> </div>";

                    $("#mycartcokkie").html($("#mycartcokkie").html() + tempHTML00)
                }
            }
            //计算 总价 总数 种类 单个商品金额方法
            setTotal()

        }else {
            $("#mycartcokkie").html("<div class='cart-kong00' style='width: 100%;text-align: center;height: 50px;margin-top:30px;font-size: 18px'>购物车已空，请前往首页挑选..<a href='index.html' style='color: #0000FF'>返回首页</a></div>")

            $("#quantityTotal").text(0);//总数量
            $("#kindsTotal").text(0);//总种类
            $("#amountTotal").text(0);//总金额
        }



        // // 存入cookie
        // // 把对象/数组转换诚json字符串：JSON.stringify()
        // $.cookie("cart", JSON.stringify(arr), {expires:30,path:"/"});
        // console.log($.cookie("cart"));
       // console.log(JSON.parse($.cookie("cart")))
    }

    //购物车列表里的 单个商品删除 --及 商品总数 nums 随之改变
    $("#mycartcokkie").on("click",'.icon-delete',function (){
        console.log(4440);
        var index = $(this).index(".icon-delete");
        console.log(index);

        //获取cookie，删掉第index个商品
        var arr = JSON.parse($.cookie("cart"));
        arr.splice(index-1, 1); //删除数组arr的第index个元素
        console.log(arr);
        $.cookie("cart", JSON.stringify(arr), {expires:30, path:"/"});
        console.log(JSON.stringify(arr));
        console.log($.cookie("cart"));
        console.log(JSON.parse($.cookie("cart")))

        refresh(); //刷新页面
        //如果商品被删光里 那么显示以下
        if( $("#mycartcokkie").html()==""){
            $("#mycartcokkie").html("<div class='cart-kong00' style='width: 100%;text-align: center;height: 50px;margin-top:30px;font-size: 18px;'>购物车已空，请前往首页挑选..<a href='index.html' style='color: #0000FF'>返回首页</a></div>")
            //同时 cookie 也要清空
            $.cookie("cart", {expires:-1, path:"/"});

            $("#quantityTotal").text(0);//总数量
            $("#kindsTotal").text(0);//总种类
            $("#amountTotal").text(0);//总金额
        }
        console.log(9898);
    })

    //计算总价 总件数 种类 单商品总金额
    function setTotal(){
        console.log(661);
        var s=0; //总金额
        var numss=0; //总数量（件）

        var jifen=0; //积分
        var yunfei=0; //运费
        var sss=0; //总计
        //重置为0
        $("#amountTota").text(0);
        $("#quantityTotal").text(0);
        //遍历 每个商品
        $("#mycartcokkie").find(".ncc-mod-tbody").each(function(){
            s+=parseInt($(this).find(".num00").val())*
                parseInt($(this).find(".prices000").text());
            numss+=parseInt($(this).find(".num00").val());
           // console.log(s);
            //jifen=$(".m-foot").find(".total_reward_bonus").text()/100;
           // yunfei=$('.m-foot').find(".total_yunfei").text();
            //sss=(s-jifen).toFixed(2)*1+parseInt(yunfei)*1

            //当前单个商品数目
            var numddd=$(this).find(".num00").val();
            //单个商品的总金额= 单价proprice00 * 数量num
            var zongjiaonly=0
            zongjiaonly=$(this).find(".prices000").text()*numddd;
            $(this).find(".pricesAll").text(zongjiaonly.toFixed(2));
        });
        $("#amountTotal").text(s.toFixed(2));//商品总金额
        //console.log($("#amountTotal").text());
        $("#quantityTotal").text(numss);  //总数量
        //积分 折扣优惠
        //$("#amountTotal").text(sss.toFixed(2))

        if($.cookie("cart")){
            // 读取 购物车cookie  --cart
            var arr = JSON.parse($.cookie("cart"));
        }
        //计算 种类   种类不是累积 所有 直接 等于 数组长度
        $("#kindsTotal").text()
        type=parseInt(arr.length);
        console.log(type);
        $("#kindsTotal").text(type);

    }

    //每次加减 都调用 一次计算总价和总数量的方法
    //加
    $("#mycartcokkie").on("click",".add00",function (){
        console.log(555);
//        var thatt=$(this)
        var num=parseInt($(this).closest(".ncc-mod-tbody").find(".num00").val())
        var n=1;
        var num=num*1+n*1;
        //设置 num 商品增加数量的上限100件
        if(num==101){
            return
        }
        //console.log(num);
        //单个商品件数
        $(this).closest(".ncc-mod-tbody").find(".num00").val(num);
        console.log($(this).closest(".ncc-mod-tbody").find(".num00").val());

        //计算 总价 总数 种类方法
        setTotal()
    });
    //减
    $("#mycartcokkie").on("click",".subtract00",function (){
        console.log(556);
        var num=parseInt($(this).closest(".ncc-mod-tbody").find(".num00").val())
        var n=1;
        var num=num*1-n*1;
        if(num==0){
            return
        }
        //单个商品件数
        $(this).closest(".ncc-mod-tbody").find(".num00").val(num);

        //计算 总价 总数 种类方法
        setTotal()
    })

    //清空购物车
    $("#mDelSkuBtn").on("click",function (){
        $("#mycartcokkie").html("<div class='cart-kong00' style='width: 100%;text-align: center;height: 50px;margin-top:30px;font-size: 18px'>购物车已空，请前往首页挑选..<a href='index.html' style='color: #0000FF'>返回首页</a></div>")
       //同时 cookie 也要清空
        var cccc=[]
        $.cookie("cart",JSON.stringify(cccc), {expires:-1, path:"/"});
        console.log(JSON.parse($.cookie("cart")));

    })

    //购物车列表 全选/全不选
    $("#form_buy").on("click",".checkAll01",function (){
        console.log(881);
        var flag = $(".checkAll01").is(":checked");//判断全选按钮的状态
        console.log(flag);
        var checkItems=document.getElementsByClassName("checkOnly");
        console.log(checkItems);
        for(var i=0;i<checkItems.length;i++){
            console.log(882);
            checkItems[i].checked = flag;
        }
    })
    $("#form_buy").on("click",".checkAll02",function (){
        console.log(881);
        var flag = $(".checkAll02").is(":checked");//判断全选按钮的状态
        console.log(flag);
        var checkItems=document.getElementsByClassName("checkOnly");
        console.log(checkItems);
        for(var i=0;i<checkItems.length;i++){
            console.log(882);
            checkItems[i].checked = flag;
        }
    })

})
