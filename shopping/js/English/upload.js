$(function (){
    var get_user=get_cookie();
    //console.log(get_user);
    if(get_user!=null){
        $("#login").text(get_user);
        $("#loginx").click(function(){
            window.open("../../shop/English/userHomepage_inform_PBL2_E.html");
        });
        $("#logout").click(function(){
            
            //setCookie("my_cookie", "", -1);
            //delCookie("my_cookie");
            var exp  = new Date();
            exp.setTime(exp.getTime() - 1);
            document.cookie="my_cookie="+get_user+";expires="+exp.toGMTString()+";path=/";
            console.log(get_cookie());
            if(get_cookie()==null){
                alert("Logout successfully!");
                window.open("../../shop/English/login_E.html");
            }
            
        });
    }
    if(get_user==null){
        $("a","#1","#nav_bar").click(function(){
            window.open("../../shop/English/login_E.html");
        });
    }
})

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