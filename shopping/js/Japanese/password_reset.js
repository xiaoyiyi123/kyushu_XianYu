
$(document).ready(function (){

    var mail;
    $("#main_ps1").css({display:"block"});
    $("#main_ps2").css({display:"none"});
    $("#main_ps3").css({display:"none"});
//输入邮箱发送验证码
    
    $("#mailSubmit").click(function (){
        
        mail=$("#mail").val();
        //alert("メール送りました！")
        //console.log(mail.value);
        console.log(mail);
        var language = 0; //ja = 0, ch = 1, en =2
        var flag = 1;//flag=1:emaill sent;flag=2:password change
            $.ajax({
                //请求地址
                url:"../../php/password_reset.php",
                //请求方式
                type:'post',
                //往服务器传递过去的参数
                data:{
                    "mail":mail,
                    "flag":flag,
                    "language":language
                },
                
                //成功的时候执行
                success:function (str){
                    console.log(str); 
                    if(str==0)
                    {
                        alert("メールが間違いました！")
                        window.location.href="../../shop/Japanese/password_reset_J.html";
                    }
                    else
                    {
                        alert("コード送りました！")
                        var code;
                        code=str;
                        //console.log(code);
                        $("#codeSubmit").click(function (){
                        var codeconfirm=$("#code").val();
                        //console.log(codeconfirm);
                        //console.log(code);
                        if(codeconfirm == code){
                            alert("パスワードをリセットしてください")
                            $("#main_ps1").css({display:"none"});
                            $("#main_ps2").css({display:"block"});
                        }
                        else{
                            alert("検証コードが間違いました")
                            window.location.href="../../shop/Japanese/password_reset_J.html";
                        }
                        });
                    }
                } 
            });
    
           });
          
    //下一步 
    // 确认重置
    $("#confirmPassword").click(function (){
        var pwd=$("#Pwd").val();
            //密码正则
       document.getElementById('Pwd').onkeyup=function () {
        var str2=this.value;
        var tishi=$(".error-upwd");
        var tishi2=$(".upwd-i");
        var reg2=/^[0-9A-Za-z]{6,20}$/;
        var temp1 ="<i class='fa fa-exclamation-circle iconfont upwd-i mob-i01'>&#10003;</i>パスワード確認"
        var temp2 ="<i class='fa fa-exclamation-circle iconfont upwd-i mob-i02'>&#10007;</i>半角英数6~20文字および“-”の組み合わせを使ってください"
        if( reg2.test(str2)){
            tishi.html(temp1);
            tishi.css("display","block");
            tishi2.addClass("mob-i01")
        }else {
            tishi.html(temp2);
            tishi.css("display","block");
            tishi2.addClass("mob-i02");
        }
        return reg2.test(str2)
    };
    
        //二次密码验证
       // var pwd=$("#Pwd");
        var rpwd=$("#RepeatMPwd");
        document.getElementById('RepeatPwd').onkeyup=function (){
            var tishi=$(".error-rpwd");
            var tishi2=$(".rpwd-i");
            var temp1 ="<i class='fa fa-exclamation-circle iconfont rpwd-i mob-i01'>&#10003;</i>パスワード確認"
            var temp2 ="<i class='fa fa-exclamation-circle iconfont rpwd-i mob-i02'>&#10007;</i>パスワードが間違っています";
            //console.log(pwd);
            //console.log(rpwd);
            if(pwd.val() == rpwd.val()){
                console.log(pwd.val());
                console.log(rpwd.val());
                tishi.html(temp1);
                tishi.css("display","block");
                tishi2.addClass("mob-i01")
            }else {
                tishi.html(temp2);
                tishi.css("display","block");
                tishi2.addClass("mob-i02");
            }
        };
    

    //console.log("password:"+pwd);
    var flag=2;
    console.log(mail);
    console.log(pwd);
    $.ajax({
        //请求地址
        url:"../../php/password_reset.php",
        //请求方式
        type:'post',
        //往服务器传递过去的参数
        data:{
            "pwd":pwd,
            "flag":flag,
            "mail":mail
        },
        success:function (b){
            console.log(b);
        if(b==1)
             alert("パスワードリセットしました！")
             $("#main_ps3").css({display:"block"});
        if(b==0)
        {
            //alert("エラー")
            //window.location.href="../../shop/Japanese/password_reset_J.html";

        }    
            alert("パスワードリセットしました！")
            $("#main_ps3").css({display:"block"});
        }
    
    });
    })

})


