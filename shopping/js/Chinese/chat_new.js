var User=null;
var Opposite=null;
$(document).ready(function(){
  var get_user=get_cookie();
  if (get_user==null)
  {
    $("#login",".user_data","#user_data_frame").click(function(){
      window.open("../../shop/Chinese/login.html");});
    //alert('Please log in');
    //window.location.href="./login_test.html";
    console.log(document.cookie);
  }
  else if(get_user != null)
  {
    $("#login").text(get_user);
    $("#login").click(function(){
      window.open("../../shop/Chinese/userHomepage_inform_PBL2.html");
    });
    $("#logout").click(function(){
      //setCookie("my_cookie", "", -1);
      //delCookie("my_cookie");
      var exp  = new Date();
      exp.setTime(exp.getTime() - 1);
      document.cookie="my_cookie="+get_user+";expires="+exp.toGMTString()+";path=/";
      console.log(get_cookie());
      if(get_cookie()==null){
        alert("退出成功");
        window.open("../../shop/Chinese/login.html");
      }
    });
    //alert('welcome');
    var a=1;
    $.ajax({
      type:"POST",
      url:"../../php/chat.php",
      data:{parameter:a},
      success:function(msg){ 
        //console.log(msg);
        var count = Object.keys(msg).length;
        for(var i=0;i<count;i++){
        $('.friends').append("<li class='friend' id='"+msg[i]+"'>"+
        "<img style='border-radius: 20px; vertical-align: middle;' src='http://placehold.it/40x40'>"+
        "<span style='margin-left: 10px;' id='span'>"+msg[i]+"</span>"+
        "</li>");
        }
        
      },
      error:function(){
        alert('error');
      }
    });
  }
  window.setInterval(check_msg,1000);
  //window.setInterval(function(){ console.log("111"); }, 3000);
  //check();
  $(".sendbtn").click(function(){
    send_msg(User,Opposite);
  });
  $('.friends').on('click','.friend',function(){
    $("#span","#"+this.id).attr({"style": 'margin-left: 10px;'});
    $('#opposite').text(this.id);
    previous_msg(this.id);
    $('#'+Opposite).attr({"style": ""});
    Opposite=this.id;
    //console.log(Opposite);
    $('#'+this.id).attr({"style": "background:#EDE9F5"});
    $('#add_text').empty();
    //previous_msg(Opposite);
    //something
});
  $(document).keydown(function (event) {
    if (event.keyCode == 13) {
      $('.sendbtn').triggerHandler('click');
    }
  });
});
function check_msg(){
  var a=0;
  var user=get_cookie();
  // console.log(user);
  // console.log(Opposite);
  
  if (user==null)
  {
    $('#opposite').text('You are off line');
  }
  if(Opposite == null){
    ;
  }
  if(Opposite != null && user != null){
    $.ajax({
      type:"POST",
      url:"../../php/chat.php",
      data:{parameter:a,
            opposite:Opposite},
      success:function(msg){
        var n=0;
        for(var ever in msg.New) {
          n++;
        }
        //console.log(n);
        $("#span",".friend").attr({"style": 'margin-left: 10px;'});
        for(var i = 0;i<n;i++){
          //console.log(msg.New[i]);
          //$("#"+msg.New[i]).text(msg.New[i]+'(New message!)');
          $("#span","#"+msg.New[i]).attr({"style": 'margin-left: 10px; color:rgb(245, 129, 177)'});
        }
        //$("#rcmd3_area").text(camp[msg.Campus3]);
        if(msg.Content==null){
          ;
        }
        else if(msg.Content!=null){
        $('#add_text').append('<li class="msgleft">'+
        '<img style="border-radius: 20px; vertical-align: top;" src="http://placehold.it/40x40">'+
        '<p class="msgcard">'+msg.Content+'</p>'+
        '</li>');
        var scrollHeight = $('.center').prop("scrollHeight");
        $('.center').scrollTop(scrollHeight,200);
        }
        
      },
      error:function(){
        alert('error');
      }
    });
  }

}

function previous_msg(Opposite){

  var a=3;
  var user=get_cookie();
  $.ajax({
    type:"POST",
    url:"../../php/chat.php",
    data:{opposite:Opposite,
          parameter:a},
    success:function(msg){
      console.log(Opposite);
      for(var i=4;i>=0;i--){
        if(msg.From[i]==user && msg.Content[i]!=null){
          $('#add_text').append('<li class="msgright">'+
        '<img style="border-radius: 20px; vertical-align: top;float:right" src="http://placehold.it/40x40">'+
        '<p class="msgcard" style="background:#ceeaff;float:right;overflow:auto">'+msg.Content[i]+'</p>'+
        '</li>'+'<li class="msgleft">'+'</li>');
        }
        else if(msg.From[i]!=user && msg.Content[i]!=null){
          $('#add_text').append('<li class="msgleft">'+
        '<img style="border-radius: 20px; vertical-align: top;" src="http://placehold.it/40x40">'+
        '<p class="msgcard">'+msg.Content[i]+'</p>'+
        '</li>');
        }
        else if(msg.Content[i]==null){
          $('#add_text').empty();
        }
      }
      var scrollHeight = $('.center').prop("scrollHeight");
      $('.center').scrollTop(scrollHeight,200);
    },
    error:function(){
      alert('error');
    }
  });
}

function send_msg(user,opposite){
  var a=2;
  var newtext=document.getElementById('textarea');
  var b=newtext.value;
  if (user == null){
    alert('Please log in first!');
  }
  if(opposite == null){
    ;
  }
  else if(opposite != null && user != null){
    $.ajax({
      type:"POST",
      url:"../../php/chat.php",
      data:{parameter:a,
            text:b,
            opposite:Opposite},
      success:function(msg){
      // $('#add_text').append('<li class="msgright">'+
      // '<img style="border-radius: 20px; vertical-align: top; float:right;" src="http://placehold.it/40x40">'+
      // '<p class="msgcard" style="float:right;background:#ceeaff">'+newtext.value+'</p>'+'</li>');
      $('#add_text').append('<li class="msgright">'+
        '<img style="border-radius: 20px; vertical-align: top;float:right" src="http://placehold.it/40x40">'+
        '<p class="msgcard" style="background:#ceeaff;float:right;overflow:auto">'+newtext.value+'</p>'+
        '</li>'+'<li class="msgleft">'+'</li>');
      var b=newtext.value;
      newtext.value=null;
      var scrollHeight = $('.center').prop("scrollHeight");
      $('.center','.chatright').scrollTop(scrollHeight,0);
      },
      error:function(){
        alert('error');
      }
  });
  }
}

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
