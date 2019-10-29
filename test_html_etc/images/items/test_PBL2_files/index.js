$(document).ready(function(){
    $("#rcmd1_img").click(function(){
        var a=5;
        $.ajax({
            url:"../php/index.php",
            type:"POST",
            data:{parameter:a},

            success: function(status) {
                var status = status;
                console.log('success');
                console.log(status)
                    if(status=='1')
                    {
                        window.alert("登录成功");
                        window.location.href="http://localhost/test/Welcome.html";
                    }
                    else if(status=='0'){
                        window.alert("登录失败，用户名或密码错误");
                    }else{
                        alert(status["Item_Name"]);
                    }
                    
                
            },
            error: function () { alert("系统错误!!"); }
        })
        //window.location.href="cart.html";
    });
});