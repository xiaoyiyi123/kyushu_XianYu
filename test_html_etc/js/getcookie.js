/**
 * Created by Administrator on 2017/6/2 0002.
 */
$(function (){
    // console.log(getCookieByKey("myKey1"));
    if(getCookieByKey("myKey1")){
        var oUser=document.getElementById('yonghu');
        // console.log(oUser);
        // 获取 cookie的中 上次填写的值。
        var valStr = getCookieByKey("myKey1");//返回的是一个字符串。现在需要把字符串，转对象。
        //    console.log(getCookieByKey("myKey1"));
        var valObj = JSON.parse(decodeURIComponent(valStr));
        var  username=valObj.user
        //console.log(username);
        oUser.innerHTML=username;
        var tuichu=document.getElementById('tuichu');
        tuichu.innerHTML="<a href='logout.html' class='c-ff6702' id='tuichu'>[退出]</a>"

        //增加 搜索后 商城板块 用户记录
        $("#yonghu2").text(username);
    }
    $(".yonghu000").on("click","#tuichu",function (){
        console.log(222222);
        setCookie("myKey1", "", -1);
        // setCookie("myKey1", JSON.stringify(obj), -2)
    })
});