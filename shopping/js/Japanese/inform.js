var camp= {
    '0': '未知キャンパス',
    '1': '伊都キャンパス',
    '2': '大橋キャンパス',
    '3': '筑紫キャンパス',
    '4': '病院キャンパス',
    '5': '別府キャンパス'
}
$(document).ready(function(){
    var get_user=get_cookie();
    //console.log(get_user);
    if(get_user!=null){
        
        $("#login",".user_data","#user_data_frame").text(get_user);
        $("#login",".user_data","#user_data_frame").click(function(){
            window.open("../../shop/Japanese/userHomepage_inform_PBL2_J.html");
        });
        $("#logout",".user_data","#user_data_frame").click(function(){
            
            //setCookie("my_cookie", "", -1);
            //delCookie("my_cookie");
            var exp  = new Date();
            exp.setTime(exp.getTime() - 1);
            document.cookie="my_cookie="+get_user+";expires="+exp.toGMTString()+";path=/";
            console.log(get_cookie());
            if(get_cookie()==null){
                alert("ログアウト");
                window.open("../../shop/Japanese/login_J.html");
            }
            
        });
    }
    if(get_user==null){
        $("#login",".user_data","#user_data_frame").click(function(){
            window.open("../../shop/Japanese/login_J.html");
        });
    }
    $.ajax({
        url:"../../php/inform.php",
        type:"POST",
        data:{},
        success: function(msg){
            console.log(msg);
            $("img","#0",".uH_upHead").attr({"src": msg.Photo});
            $(".uH_fIsUnchange","#username","#uH_inform").text(msg.Name);
            $(".uH_fIsUnchange","#email","#uH_inform").text(msg.Email);
            if(msg.Gender==0){
                $("[value='c0']","select",".uH_fIsSelect","#gender").attr({"selected":"selected"});
            }
            else if(msg.Gender==1){
                $("[value='c1']","select",".uH_fIsSelect","#gender").attr({"selected":"selected"});
            }
            else{
                $("[value='c2']","select",".uH_fIsSelect","#gender").attr({"selected":"selected"});
            }
            if(msg.Campus==0){
                $("[value='0']","select",".uH_fIsSelect","#campus").attr({"selected":"selected"});
            }
            else if(msg.Campus==1){
                $("[value='1']","select",".uH_fIsSelect","#campus").attr({"selected":"selected"});
            }
            else if(msg.Campus==2){
                $("[value='2']","select",".uH_fIsSelect","#campus").attr({"selected":"selected"});
            }
            else if(msg.Campus==3){
                $("[value='3']","select",".uH_fIsSelect","#campus").attr({"selected":"selected"});
            }
            else{
                $("[value='4']","select",".uH_fIsSelect","#campus").attr({"selected":"selected"});
            }
            $("input",".uH_fIsInput","#contactway").val(msg.Email);
            $("textarea",".uH_fIsTextarea","#introduction").val(msg.Introduction);
        },
        error: function () {console.log('error');}
    });
    $("#confirm_button").click(function(){
        //alert ("ssss");
        var sexual=$("#gender option:selected").val();
        var campus=$("#campus option:selected").val();
        var profile=$("#personal").val();
        if(sexual=='c0')
        {
            sexual=0;
        }
        else if(sexual=='c1')
        {
            sexual=1;
        }
        else
        {
            sexual=2;
        }
       
        console.log(profile);
        $.ajax({
            url:"../../php/change.php",
            type:"POST",
            data:
            {
                // "parameter":1,
                // "id":this.id
                "Gender":sexual,
                "Campus":campus,
                "Introduction":profile
    
            },
            success: function(msg){
                //console.log("qwert");
                console.log(msg);
                alert("保存しました!");
            },
            error: function () {console.log('error');}
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
function delCookie(name)
{
var exp = new Date();
exp.setTime(exp.getTime() - 1);
var cval=getCookie(name);
if(cval!=null)
document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}


