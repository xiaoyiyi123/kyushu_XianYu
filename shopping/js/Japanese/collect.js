var camp= {
    '1': '伊都キャンパス',
    '2': '大橋キャンパス',
    '3': '筑紫キャンパス',
    '4': '病院キャンパス',
    '5': '別府キャンパス',
    '6': 'その他'
}

$(document).ready(function (){
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
                window.location.href="../../shop/Japanese/login_J.html";
            }
            
        });
    }
    if(get_user==null){
        $("a","#1","#nav_bar").click(function(){
            window.location.href="../../shop/Japanese/login_J.html";
        });
    }

    var url = window.location.search;
    var obj ={};
    var gets = url.split('?')[1];
    if(gets){
        gets = gets.split('&');
        gets.forEach(get=>{
            get = get.split('=');
            obj[get[0]]=get[1];
        });
    }
    console.log(obj);
    if(/(Error)/.test(obj['success'])){
        alert('エラーが発生しました');
    }

    //图片加载并显示
    var uPicture = document.getElementById('uHd_goodPic'),
        div,
        picName,
        file = document.getElementById('file');
        file.onchange = function(){//当用户点击时触发
            var picdiv = uPicture.getElementsByClassName('picdiv')[0];
            var p = document.getElementsByClassName("showMessage")[0];
            if(picdiv){
                uPicture.removeChild(picdiv);
            }
            
            picName = readFile(this);
            console.log(picName);
            //判断用户输入的图片是否合法
            var regImg = /.+\.(jpg|jpeg|gif|bmp|png)$/;
            console.log("p:"+p);
            if(typeof(picName)!="undefined"){
                if(!regImg.test(picName)){
                    p.style.display = 'block';
                }
                else{
                    p.style.display = 'none';
                }

            }
        }
    //处理图片并添加dom中的函数
    var readFile = function(obj){
        //获取输入框中所有的文件数组
        var fileList = obj.files;
        console.log("fileList"+fileList);
        var imgName;
        for(var i=0; i<fileList.length; i++){
            var reader = new FileReader();//实例化一个FileReader接口
            imgName = fileList[i].name;
            console.log("img:"+imgName);
            reader.readAsDataURL(fileList[i]);
            reader.onload = function(e){
                div = document.createElement('div');
                div.innerHTML = `<img src="${this.result}" />`;
                div.className = 'picdiv';
                div.style.width = "140px";
                div.style.height = "140px";   
                uPicture.appendChild(div);
            }  
        }
        return imgName;
        
    }

    $("#btn").click(function(){
        picture = picName;
       console.log("picture:"+picture);
        var userName = get_cookie();
        var goodName = $("#goodName").val();	
        var budget = $("#budget").val();	
        var note = $("#note").val();	
        var campus = $("#place option:selected").val();
        var category = $("#category option:selected").val();
        console.log('111');
        console.log(goodName,budget,note,campus,category,userName,picture);
        $.ajax({
            type:"POST",
            url:"../../php/collect.php",
            data:{
                userName:userName,
                goodName: goodName,
                budget: budget,
                note: note,
                campus: campus,
                category: category,
                picture: picture
            },
            success: function(msg){
                //console.log(msg);
                //alert("成功！");
                
            },
            error: function () {
                console.log('error');
            }
        })
    })
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



    



