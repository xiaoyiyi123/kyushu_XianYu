function get_cookie(){
    var c_start=document.cookie.indexOf("my_cookie=");
    if(c_start == -1){
     alert('Please log in!');
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
$(document).ready(function(){
    $("#logintest").click(function(){
        window.alert("Successsssss!");
        window.location.href="chat.html";
    });
    $("#login").click(function(){
        var username=$("#Username").val();
        var userpwd=$("#Password").val();
        if(username!=""&&userpwd!=""){

            //从数据库请求 数据， 校检 用户名和密码
            $.ajax({
                url:"../php/db_test.php",
                type:"POST",
                //dataType:"json",
                data:{username:username,password:userpwd},
                success: function(msg) {
                    var msg = msg;
                    //alert('GET!');
                    console.log('success');
                    console.log(msg)
                        if(msg.status==1)
                        {
                            //window.alert("登录成功");
                            //window.location.href="http://localhost/test/Welcome.html";
                            //var get_user=get_cookie();
                            //console.log(get_user);
                            window.location.href="../shop/userHomepage_chartLog_PBL2.html";
                        }
                        else if(msg.status==0){
                            window.alert("登录失败，用户名或密码错误")
                        //window.location.href="login.html";
                    }
                },
                error: function (msg) {
                    alert("用户名密码验证失败");
                    console.log(msg)}
            })
            //window.location.href="cart.html";
        }else {
            alert("请先填写正确的用户名或密码、验证码");
        }
    });
    
    
});