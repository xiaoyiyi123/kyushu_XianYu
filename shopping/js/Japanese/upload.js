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

    //图片加载并显示
    var uPicture = document.getElementById('uHd_goodPic'),
        div;
        //file = document.getElementById('file1');
    var upFile = document.getElementsByClassName("file");
    var len = upFile.length;
    for(var i=0;i<len;i++){
        (function(n){
            upFile[n].onchange = function(){
                var name = readFile(this);               
               
                //判断用户输入的图片是否合法
                var regImg = /.+\.(jpg|jpeg|gif|bmp|png)$/;
                var msg = document.getElementsByClassName("showMessage")[n];
                //console.log(msg);
                if(typeof(name)!="undefined"){
                    if(!regImg.test(name)){
                        msg.style.display = 'inline';
                    }
                
                 }
            }
        })(i); 
    }
    //处理图片并添加dom中的函数
    var readFile = function(obj){
        var fileList = obj.files;
        for(var i=0; i<fileList.length; i++){
            var reader = new FileReader();
            var imgName = fileList[i].name;
            reader.readAsDataURL(fileList[i]);
            reader.onload = function(e){
                div = document.createElement('div');
                div.innerHTML = `<img src="${this.result}" width ="115px" height="115px" />`; 
                div.style.float = "left";
                $("#uHd_goodPic").empty(); 
                uPicture.appendChild(div);
            }
    }
    return imgName;
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