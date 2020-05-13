/**
 * Created by Administrator on 2017/6/27 0027.
 */
$(function (){
    var str = code();
    var vcodess=document.getElementById('codeimage03');
        vcodess.innerHTML=str;
    //生成验证码
    $(".mycode03").on("click",function (){
        var str = code();
        var vcodess=document.getElementById('codeimage03');
        vcodess.innerHTML=str;
    })
    // 验证码 验证
    var vcodess=document.getElementById('codeimage03');
    var vcode=document.getElementById("captcha");
    var tishi3=$(".yzm-error03")
    var tishi4=$(".yzm-i")
    //console.log($(".yzm-error03"));
    //console.log($(".yzm-i"));
    var tempa="<i class='fa fa-exclamation-circle iconfont yzm-i mob-i01'>&#xe732;</i>"
    var tempb="<i class='fa fa-exclamation-circle iconfont yzm-i mob-i02'>&#xe72d;</i>"
    vcode.onkeyup=function (){
        if(vcode.value==vcodess.innerHTML){
            tishi3.html(tempa);
            tishi3.css("display","block");
            tishi4.addClass("mob-i01")
        }else {
            tishi3.html(tempb);
            tishi3.css("display","block");
            tishi4.addClass("mob-i02")
        }
    };

    //登录
    $("#loginSubmit").click(function (){
        var username=$("#loginName").val();
        var userpwd=$("#memberPwd").val();
        if(username!=""&&userpwd!=""&&vcode!=""&&vcode.value==vcodess.innerHTML){

            //从数据库请求 数据， 校检 用户名和密码
            $.ajax({
                url:"../../php/login.php",
                type:"post",
                data:{
                    "u_name":username,
                    "u_pwd":userpwd
                },
                //成功的时候执行
                success: function (msg) {
                    var types = msg;
                    console.log(msg);
//                console.log(types);
//                console.log(types.toString());
                   console.log(eval("("+msg+")"));
                    var data='';
                    if(msg!=''){
//                    data=JSON.parse(msg)
                        data = eval("("+msg+")");
                        console.log(data.status);
                    }
                    if(data.status==1){
                        alert("登录成功")
                        window.location.href="../../shop/Chinese/index_PBL2.html";
                    }else{
                        alert("登录失败，用户名或密码错误")
                        //window.location.href="login.html";
                    }
                },
                error: function () { alert("用户名密码验证失败") }
            })
            //window.location.href="cart.html";
        }else {
            alert("请先填写正确的用户名或密码、验证码");
        }
    });



})

function code(){

    var arr = ['a',
        'b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
        'q','r','s','t','u','v','w','x','y','z','0',
        '1','2','3','4','5','6','7','8','9'];
    var str = '';
    for(var i = 0 ; i < 4 ; i ++ )
        str += ''+arr[Math.floor(Math.random() * arr.length)];
    
    return str;

}
