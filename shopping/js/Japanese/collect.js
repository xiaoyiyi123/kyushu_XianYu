var camp= {
    '1': '伊都キャンパス',
    '2': '大橋キャンパス',
    '3': '筑紫キャンパス',
    '4': '病院キャンパス',
    '5': '別府キャンパス',
    '6': 'その他'
}

$(function (){
    var get_user=get_cookie();
    //console.log(get_user);
    if(get_user!=null){
        $("#login").text(get_user);
        $("#login").click(function(){
            window.open("../../shop/Japanese/userHomepage_inform_PBL2_J.html");
        });
        $("#logout").click(function(){
            
            //setCookie("my_cookie", "", -1);
            //delCookie("my_cookie");
            var exp  = new Date();
            exp.setTime(exp.getTime() - 1);
            document.cookie="my_cookie="+get_user+";expires="+exp.toGMTString()+";path=/";
            console.log(get_cookie());
            if(get_cookie()==null){
                alert("ログアウト成功しました");
                window.open("../../shop/Japanese/login_J.html");
            }
            
        });
    }
    if(get_user==null){
        $("a","#1","#nav_bar").click(function(){
            window.open("../../shop/Japanese/login_J.html");
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

/**
 * author: Wang Yiyi
 * 给userHOmepage_upload2_PBL2_J.html的
 * 第65行添加id=goodName
 * 第'5行添加id=budget
 * 第97行添加id=place,下面的下拉列表依此添加id=place1,2,3,4,5,6
 * 第117行添加id=category,下面的下拉列表依此添加id=category1,2,3,4,5
 * 
 *  */ 

$(function(){
    $("#btn").click(function(){

        var gn = document.getElementById("goodName");
        console.log(gn);
        var goodName = $("#goodName").val();	
        var budget = $("#budget").val();	
        var note = $("#note").val();	
        var campus = $("#place option:selected").val();
        var category = $("#category option:selected").val(); 
      
        console.log(goodName,budget,note,campus,category);
        $.ajax({
            type:"POST",
            url:"../../php/collect.php",
            data:{
                goodName: goodName,
                budget: budget,
                note: note,
                campus: campus,
                category: category
            },
            success: function(msg){
                console.log(msg);
            },
            error: function () {
                console.log('error');
            }
        })
    })
    
});

    



