var camp ={
    '0':'Campus',
    '1':'Ito',
    '2':'Ohashi',
    '3':'Chikushi',
    '4':'Hospita'
}
function getParameter(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}

    function addLoadEvent(func)
    {
        var oldonload = window.onload; //得到上一个onload事件的函数
        if(typeof window.onload != 'function')
        {
   
            window.onload = func;
        }
        else
        {
           window.onload = function()
            {
                oldonload(); //调用之前覆盖的onload事件的函数
                func(); //调用当前事件函数
            }
        }
    }

    var array = new Array();
    function getMessage(){
        var oMessageBox = document.getElementById("mDbar_frame");
        var btn = document.getElementById("doPost");
        //var message = document.getElementById("myInput");
        var message = $("#myInput").val();
        var messageValue = "";

        var user = get_cookie();
        array[0] = message;
        array[1] = user;   
        //console.log("array:",array); 

        // if (array[1] == null){
        //     alert("please login first!")
        // }

        
        
        return array;
    }
    addLoadEvent(getMessage);


    function getNowFormatDate() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var second = date.getSeconds();
        if (month >= 1 && month <= 9) {
            month = '0' + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = '0' + strDate;
        }
        var currentdate = year + '-' + month + '-' + strDate + ' '+hour+':'+min+':'+second;
        return currentdate;
    }

    var messageDate = getNowFormatDate();
    //console.log("date:",messageDate);
//提取 url 里的 proid值 根据proid从数据库里提取商品数据 动态创建 对应详情页面
$(function (){
    var get_user=get_cookie();
    //console.log(get_user);
    if(get_user!=null){
        $("a","#1","#nav_bar").text(get_user);
        $("a","#1","#nav_bar").click(function(){
            window.open("../../shop/English/userHomepage_inform_PBL2_E.html");
        });
    }
    if(get_user==null){
        $("a","#1","#nav_bar").click(function(){
            window.open("../../shop/English/login_E.html");
        });
    }
    //console.log("!!11111");
    var item_id = getParameter("id");
    var cllDate = getNowFormatDate();
    console.log(item_id+'     '+cllDate)
    $.ajax({
        url:"../../php/details.php",
        type:'post',
        data:{
            item_id: item_id,
            parameter:3,
            cllDate:cllDate
        },
        success:function () {
            console.log('Success');

        },
            error:function(){
            alert('error!');
        }
        
    });
    //获取 url值 的方法
    var search = location.search;
            //alert(search); //获取URL中?后的句子
            var string = search.split("=")[1]; //分割取出cid
            //alert(string);
            var item_id = getParameter("id"); //通过getParameter获取
            //alert(cid);

    console.log(item_id);

    //从数据库 请求数据 加载到当前详情页面
    $.ajax({
        url:"../../php/details.php",
        type:'post',
        data:{
            item_id: item_id,
            parameter:0

        },
        dataType:"json",
        success:function (res) {
            //console.log(res);
            //console.log(res);
            //console.log(33);
             $(".goodsName").text(res.information.Name);
             $("#rmPrice").text(res.information.Price);
             $("#bigImg").attr({"src":res.information.Picture});
             $("#newPrice").text(res.information.newPrice);
             $("#status").text(res.information.status);
             $("#campus").text(camp[res.information.campus]);
             $("#note").text(res.information.note);
             $(".mPid").text(res.information.userName);
             //$("#userId").attr({"href":"homepage3to3_PBL2.html?user="+res.information.userName});
             $(".mPchat_button", ".mPbutton_frame", "#merchantPro").attr({"id": res.information.userName});
             $("img",".mPavater").attr({"src":res.photo});
             $("#1","#smallPicture").attr({"src":res.information.Picture});
             $("#2","#smallPicture").attr({"src":res.information.smallPicture1});
             $("#3","#smallPicture").attr({"src":res.information.smallPicture2});
             $("#4","#smallPicture").attr({"src":res.information.smallPicture3});
             $("#5","#smallPicture").attr({"src":res.information.smallPicture4});

             $("a",".mPpro_button",".mPbutton_frame","#merchantPro").attr({"href": "homepage3to3_PBL2_E.html?user=" + res.information.userName});
             //console.log('123555');
             //console.log(res);

             if (res.message1.contents != null) {
                $("#mDbar_frame").append('<div class="messageDetail">' +
                    '<div class="mDdetails">' +
                    '<img src="../../image_pbl2/icon_pbl2/noavatar_small.gif" />' +
                    '<div id="buyer2" style="text-align: center;">' + res.message1.buyer + '</div>' +
                    '</div>' +
                    '<div class="mDtime" id="time2">' +
                    res.message1.time +
                    '</div>' +
                    '<div class="mDcontent" id="content2">' +
                    res.message1.contents +
                    '</div>' +
                    '</div>');
            }
            if (res.message2.contents != null) {
                $("#mDbar_frame").append('<div class="messageDetail">' +
                    '<div class="mDdetails">' +
                    '<img src="../../image_pbl2/icon_pbl2/noavatar_small.gif" />' +
                    '<div id="buyer2" style="text-align: center;">' + res.message2.buyer + '</div>' +
                    '</div>' +
                    '<div class="mDtime" id="time2">' +
                    res.message2.time +
                    '</div>' +
                    '<div class="mDcontent" id="content2">' +
                    res.message2.contents +
                    '</div>' +
                    '</div>');
            }
            if (res.message3.contents != null) {
                $("#mDbar_frame").append('<div class="messageDetail">' +
                    '<div class="mDdetails">' +
                    '<img src="../../image_pbl2/icon_pbl2/noavatar_small.gif" />' +
                    '<div id="buyer2" style="text-align: center;">' + res.message3.buyer + '</div>' +
                    '</div>' +
                    '<div class="mDtime" id="time2">' +
                    res.message3.time +
                    '</div>' +
                    '<div class="mDcontent" id="content2">' +
                    res.message3.contents +
                    '</div>' +
                    '</div>');
            }

        },
            error:function(){
            console.log('error!');
        }
        
    });

    $(".mPchat_button", ".mPbutton_frame", "#merchantPro").click(function () {//newadd
        var whose=this.id;
        if(get_user!=null){
            $.ajax({
                url: "../../php/details.php",
                type: 'post',
                data: {
                    parameter: 4,
                    whose:whose
                },
                success: function () {
                    console.log('Success');
    
                },
                error: function () {
                    alert('error!');
                }
    
            });
            window.open("../../shop/English/userHomepage_chartLog_PBL2_E.html");
        }
        else if(get_user==null){
            alert("Please login！");
            window.open("../../shop/English/login_E.html");

        }
        
        
    });
    
    $(".minpic","ul",".smallImg",".smallImg_bar").click(function(){
        var get_src=$("#"+this.id,"ul",".smallImg",".smallImg_bar").attr("src");
        $("#bigImg").attr({"src":get_src});
    });
    $("#doPost").click(function(){
        var message=$("#myInput").val();
        var item_id = getParameter("id");
        $.ajax({
            url:"../../php/details.php",
            type:'post',
            data:{
                parameter:1,
                message:message,
                item_id:item_id,
                date:messageDate
            },
            success:function (msg) {
                //console.log(msg);
                window.location.href="../../shop/English/detail_PBL2_E.html?id="+item_id;
                
            },
                error:function(){
                console.log('error!');
            }
            
        });

    });
    
    $("#collection").click(function(){
        var item_id = getParameter("id");
        var user = get_cookie();
        var cllDate = getNowFormatDate();
        $.ajax({
            url:"../../php/details.php",
            type:'post',
            data:{
                parameter:2,
                user:user,
                item_id:item_id,
                cllDate:cllDate,
            },
            success:function (msg) {
                if(msg==1){
                    alert("Already in Favorite List！");
                }
                else{
                alert("You have added it into your collections");
            }
            },
                error:function(){
                console.log('error!');
            }
            
        });

    });
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

  