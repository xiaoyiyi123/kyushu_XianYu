/**
 * Created by Administrator on 2017/6/29 0029.
 */
//购物车 cookie
$(function (){
    //创建 一个名为 addcart 的 cooike 来临时保存 购物车商品数据
    // $.cookie("addcart", JSON.stringify(cartlist), {expires:30,path:"/"});

    //【重点】每次刷新页面时候  加载一次 refresh() 购物车页面数据 用于及时刷新当前 购物车内的商品信息
    refresh();
    //【重点】 全局变量 carList空数组
    var carList = [];
    //【重点】 把 html 上面数据 提取成 对象 后 再转成 json字符串 ，以json数组 方式存储
    $(".ncs-buy").on("click","#addCartBtn", function () {
        console.log(441);
        //console.log($(this));
        var iproid=$(this).closest(".ncs-detail").find('#addCartBtn').find("i").attr('data-proid');
        var iImg=$(this).closest(".ncs-detail").find('.bigimg').attr("src");
        var iProname= $(this).closest(".ncs-detail").find('.myproname01').text();
        var iProprice=$(this).closest(".ncs-detail").find('#rmPrice').text();
        var inum=$(this).closest(".ncs-detail").find("#mnBuyNumInput").val();
        console.log(iproid);
        //console.log(iImg);
        //console.log(iProname);
        //console.log(iProprice);
        var goodsObj = {};
        goodsObj.proid = iproid;
        goodsObj.proimg = iImg;
        goodsObj.proname = iProname;
        goodsObj.proprice = iProprice;
        goodsObj.num = inum;
        //console.log(cartlist);
        var objStr = JSON.stringify(goodsObj);  // js对象转化成json数据格式
        //console.log(objStr);

        //重置cookie 为空
        $.cookie("addCartBtn", "", {expires:-1, path:"/"});
        //创建 临时cookie  此cookie 只是为了 当介质 把 事件获取的值能传到 事件函数之外
        //每次 创建临时cookie 存值时 先要清空
        //  JSON.stringify(carList)转成字符串
        $.cookie("addCartBtn",objStr, {expires:30,path:"/"});


       //更新 抓起的商品值 objs
        var objs =JSON.parse($.cookie('addCartBtn')) ;
        console.log(objs);

        //【重点】 如果是二次点击购物时候 cart-cookie原本已有商品值 故  carList=JSON.parse($.cookie("cart"));
        //否则 cart-cookie 不存在 还未创建时候 那么 cartlist 直接为 空数组 等 push 进商品值 objs
        if($.cookie("cart")){
            carList=JSON.parse($.cookie("cart"));
        }else {
            carList= [];
        }
        console.log(carList);
        //【重点】  当 数组cartlist 为空时候 直接加塞 抓取到当前到商品objs 进空数组
        //如果 cartlist 已经有 其他商品objs 时候 那么 判断  当前抓取的objs 与 cartlist里的objs是否重复
        if(carList.length===0){
            console.log(401);
            carList.push(objs);

            $.cookie("cart", JSON.stringify(carList), {expires:30,path:"/"});
            console.log(JSON.parse($.cookie("cart")));
            refresh();
        }else {
            console.log(990);
            var isExist = false; //表示是否存在相同商品
            for(var i=0;i<carList.length; i++){
                if (carList[i].proid ==objs.proid) {
                    console.log(991);
                    carList[i].num++; //数量+1
                    isExist = true; //表示存在相同商品
                }
            }
            //如果不存在相同商品， 则添加该商品
            if (isExist == false) {
                console.log(992);
                // objs.num = 1;
                carList.push(objs);
            }
            console.log(993);
            $.cookie("cart", JSON.stringify(carList), {expires:30,path:"/"});
            console.log(JSON.parse($.cookie("cart")));
            refresh();
        }
    })

    //购物车页面动态创建  刷新购物车页面
    function refresh(){
        console.log(770);
        console.log($.cookie("cart"));
        if($.cookie("cart")!=null){
            // 读取 购物车cookie  --cart
            var arr = JSON.parse($.cookie("cart"));

            if (arr) {
                //     console.log(arr);
                //先清空购物车列表
                $(".incart-goods-box").empty();
                // 调取 cart  cookie 动态创建购物车页面
                for (var j = 0; j < arr.length; j++) {
                    var tempHTML00 = "<div class='incart-goods' data-cart-goods-list>";
                    tempHTML00 += "<dl><dt class='goods-name'>";
                    tempHTML00 += "<a target='_blank' href='javascript:void(0)' title=''>";
                    tempHTML00 += arr[j].proname;
                    tempHTML00 += "<p></p></a></dt>";
                    tempHTML00 += "<dd class='goods-thumb'>";
                    tempHTML00 += "<a target='_blank' href='javascript:void(0)' title=''>";
                    tempHTML00 += "<img src='" + arr[j].proimg + "'>";
                    tempHTML00 += "</a></dd><dd class='goods-sales'></dd>";
                    tempHTML00 += "<dd class='goods-price'>";
                    tempHTML00 += "<em>¥" + arr[j].proprice + "×"+ arr[j].num+"</em>";
                    tempHTML00 += "</dd><dd class='handle'><em>";
                    tempHTML00 += "<a href='javascript:void(0)' class='cutpro00' target='_self'  data-cart-del='10863492'>删除</a>";
                    tempHTML00 += "</em></dd></dl></div>";
                    $(".incart-goods-box").html($(".incart-goods-box").html() + tempHTML00)

                }
            }

            var totals=0;
            var numss=0;
            var type=0;
            for(var i=0; i<arr.length; i++){
                console.log(arr);
                //计算总价
                totals+=arr[i].proprice*arr[i].num;
                $(".total-price").find("em").text(totals);
                //计算总数
                $(".buy").find(".goods-num").text();
                $(".total-price").find("i").text();

                numss+=parseInt(arr[i].num);
                //console.log(numss);
                $(".buy").find(".goods-num").text(numss);

                //计算 种类   种类不是累积 所有 直接 等于 数组长度
                type=parseInt(arr.length);
                //console.log(type);
                $(".total-price").find("i").text(type);
            }

        }
        else {
            $("#mycartcokkie").html("<div class='cart-kong00' style='width: 100%;text-align: center;height: 50px;margin-top:30px;font-size: 18px'>购物车已空，请前往首页挑选..<a href='index.html' style='color: #0000FF'>返回首页</a></div>")
        }

        // console.log(arr);

        // // 存入cookie
        // // 把对象/数组转换诚json字符串：JSON.stringify()
        // $.cookie("cart", JSON.stringify(arr), {expires:30,path:"/"});
        // console.log($.cookie("cart"));
        //console.log(JSON.parse($.cookie("cart")))
    }

    //购物车列表里的 单个商品删除 --及 商品总数 nums 随之改变
    $(".my-cart").on("click",'.cutpro00',function (){
        console.log(4440);
        var index = $(this).index(".cutpro00");
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
        console.log(9898);
    })


})
