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
            $.ajax({
                url:"../../php/login.php",
                type:"post",
                data:{
                    "u_name":username,
                    "u_pwd":userpwd
                },

                success: function (msg) {
                    var types = msg;
                    console.log(msg);

                    var data='';
                    if(msg!=''){

                        data = eval("("+msg+")");
                        console.log(data.status);
                        if(data.status==1){
                            window.location.href="../../shop/Japanese/index_PBL2_J.html";
                        }
                    }
                    else{
                        alert("ログイン失敗した。ユーザー名とパスワードをチェックしてください");
                    }
                },
                error: function () { alert("ユーザー名やパスワードが間違っています") }
            })
        }else {
            alert("正しいユーザー名、パスワード、キャプチャを入れてください");
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
