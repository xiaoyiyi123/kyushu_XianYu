/**
 * Created by Administrator on 2017/6/26 0026.
 */

$(function (){
    //手机号正则
    //console.log(111);
    var imobile=$("#mobile");
    var tishi=$(".mob-error");
    var tishi2=$(".mob-i")
    //console.log(tishi2);
    document.getElementById('mobile').onkeyup=function (){
        var str=imobile.val();
        var reg=/^[1][3-9][0-9]{9}$/;
        var temp1="<i class='fa fa-exclamation-circle iconfont mob-i mob-i01'>&#xe693;</i>手机号输入正确！"
        var temp2="<i class='fa fa-exclamation-circle iconfont mob-i mob-i02'>&#xe693;</i>手机号输入错误！"
        if(reg.test(str)){
            tishi.html(temp1);
            tishi.css("display","block");
            tishi2.addClass("mob-i01")
        }else {
            tishi.html(temp2);
            tishi.css("display","block");
            tishi2.addClass("mob-i02");
        }
    }
    //生成验证码
    $(".mycode01").on("click",function (){
        var arr = ['a',
            'b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
            'q','r','s','t','u','v','w','x','y','z','0',
            '1','2','3','4','5','6','7','8','9'];
        var str = '';
        for(var i = 0 ; i < 4 ; i ++ )
            str += ''+arr[Math.floor(Math.random() * arr.length)];
        var vcodess=document.getElementById('codeimageMobile');
        vcodess.innerHTML=str;
        return str;
    })
    // 验证码 验证
    var vcodess=document.getElementById('codeimageMobile');
    var vcode=document.getElementById("captchaMobile");
    var tishi3=$(".mob-yzm-error")
    var tishi4=$(".mob-yzm-i")
    var tempa="<i class='fa fa-exclamation-circle iconfont mob-yzm-i mob-i01'>&#xe732;</i>"
    var tempb="<i class='fa fa-exclamation-circle iconfont mob-yzm-i mob-i02'>&#xe72d;</i>"
    vcode.onkeyup=function (){
        if(vcode.value==vcodess.innerHTML){
            tishi3.html(tempa);
            tishi3.css("display","block");
            tishi4.addClass("mob-i01")
        }else {
            tishi3.html(tempb);
            tishi3.css("display","block");
            tishi4.addClass("mob-i01")
        }
    };
    //下一步 成功
    $("#mobileFormSecond").css({display:"none"})

    // 手机号 验证码 不能为空 验证码需要一致
    $("#mobileSubmitFirst").click(function (){
        var mobile=$("#mobile").val();
        //console.log(vcode.value);
        //console.log(vcodess.innerHTML);
        if(mobile!=""&&vcode!=""&&vcode.value==vcodess.innerHTML&&$("#mobileAgreeClause").attr("checked") == "checked"){
            console.log(12112);
            $("#mobileFormFirst").css({display:"none"});
            $("#mobileFormSecond").css({display:"block"});
            // 手机号 传送到 第二步
            var mobile01=$("#mobile").val()
            var stmp="短信已发送至<i class='usermobile01' style='color: #0000FF'>"+mobile01+"</i>，请在1分钟内完成验证。"
            $("#mobilemsg").html(stmp);
        }else {
            alert("请先填写正确的用户名或密码、验证码");
        }
    })

    //第二步
    //生成验证码
    $(".mycode01").on("click",function (){
        var arr = ['a',
            'b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
            'q','r','s','t','u','v','w','x','y','z','0',
            '1','2','3','4','5','6','7','8','9'];
        var str = '';
        for(var i = 0 ; i < 4 ; i ++ )
            str += ''+arr[Math.floor(Math.random() * arr.length)];
        var vcodess=document.getElementById('codeimageMobile02');
        vcodess.innerHTML=str;
        return str;
    })
    // 验证码 验证
    var vcodess2=document.getElementById('codeimageMobile02');
    var vcode2=document.getElementById("captchaMobileSecond");
    var tishi5=$(".yzm-error02")
    var tishi6=$(".yzm-i02")
    var tempa="<i class='fa fa-exclamation-circle iconfont yzm-i02 mob-i01'>&#xe732;</i>"
    var tempb="<i class='fa fa-exclamation-circle iconfont  yzm-i02 mob-i02'>&#xe72d;</i>"
    vcode2.onkeyup=function (){
        if(vcode2.value==vcodess2.innerHTML){
            tishi5.html(tempa);
            tishi5.css("display","block");
            tishi6.addClass("mob-i01")
        }else {
            tishi5.html(tempb);
            tishi5.css("display","block");
            tishi6.addClass("mob-i01")
        }
    };
    //用户名正则
    document.getElementById('memberName').onkeyup=function (){
        var str1=this.value;
        var tishi=$(".error-uname");
        var tishi2=$(".uname-i");
        var reg1=/^[a-zA-Z_]\w{7,20}$/;
        var temp1="<i class='fa fa-exclamation-circle iconfont uname-i mob-i01'>&#xe732;</i>用户名格式正确"
        var temp2="<i class='fa fa-exclamation-circle iconfont uname-i mob-i02'>&#xe72d;</i>请使用6-20个中、英文、数字及“-”符号，且不能全为数字"
        if( reg1.test(str1)){
            tishi.html(temp1);
            tishi.css("display","block");
            tishi2.addClass("mob-i01")
        }else {
            tishi.html(temp2);
            tishi.css("display","block");
            tishi2.addClass("mob-i02");
        }
        return reg1.test(str1)
    };
    //密码正则
    document.getElementById('mobileMemberPwd').onkeyup=function () {
        var str2=this.value;
        var tishi=$(".error-upwd");
        var tishi2=$(".upwd-i");
        var reg2=/^[0-9A-Za-z]{6,20}$/;
        var temp1="<i class='fa fa-exclamation-circle iconfont upwd-i mob-i01'>&#xe732;</i>密码格式正确"
        var temp2="<i class='fa fa-exclamation-circle iconfont upwd-i mob-i02'>&#xe72d;</i>密码长度应在6-20个字符之间"
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
    var pwd=$("#mobileMemberPwd");
    var rpwd=$("#mobileRepeatMemberPwd");
    document.getElementById('mobileRepeatMemberPwd').onkeyup=function (){
        var tishi=$(".error-rpwd");
        var tishi2=$(".rpwd-i");
        var temp1="<i class='fa fa-exclamation-circle iconfont rpwd-i mob-i01'>&#xe732;</i>二次密码正确"
        var temp2="<i class='fa fa-exclamation-circle iconfont rpwd-i mob-i02'>&#xe72d;</i>二次密码不一致";
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
    //立即注册
    $("#mobileSubmitSecond").click(function (){
        var username=$("#memberName").val();
        var pwd=$("#mobileMemberPwd").val();
        var rpwd=$("#mobileRepeatMemberPwd").val();
        var vcodess2=$('#codeimageMobile02').val();
        var vcode2=$("#captchaMobileSecond").val();
        //console.log(vcode.value);
        //console.log(vcodess.innerHTML);
        if(username!=""&&pwd!=""&&rpwd!=""&&vcode2.value==vcodess2.innerHTML&&pwd==rpwd){
            console.log(12112);

            // 获取页面的表单    用户账号密码数据存储到 数据库
            $.ajax({
                //请求地址
                url:"./server/register.php",
                //请求方式
                type:'post',
                //往服务器传递过去的参数
                data:{
                  "username":username,
                    "pwd":pwd
                },
                //成功的时候执行
                success:function (result){
                    console.log(result);
                    if(JSON.parse(result)[0].status==1){
                        alert("注册成功！")
                    }
                }
            });

            $("#mobileFormFirst").css({display:"none"});
            $("#mobileFormSecond").css({display:"none"});
            $("#mobileThree").css({display:"block"});
            // 用户名 传送到 第三步
            var stmp="您已注册成功，您的账号：<i class='usermobile01' style='color: red'>"+username+"</i>，</br>请前往<a href='login.html'>登录</a>"
            $(".mobileThree001").html(stmp);
        }else {
            alert("请先填写正确的用户名或密码、验证码");
        }

    });

})