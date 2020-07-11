var Campus= {
    '0': '未知キャンパス',
    '1': '伊都キャンパス',
    '2': '大橋キャンパス',
    '3': '筑紫キャンパス',
    '4': '病院キャンパス',
    '5': '別府キャンパス'

}
$(document).ready(function(){
    var obj=JSON.parse(localStorage.getItem("temp_info"));
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
    $(".area_select").contents()[0].textContent = Campus[obj['Campus']];
    var dropDown = document.getElementsByClassName('dropdown-area')[0].getElementsByTagName('a');
    for(let i=0;i<=5;i++){
        dropDown[i].addEventListener('click',function(){
            $(".area_select").contents()[0].textContent = Campus[i];
            obj['Campus'] = i.toString();
            connection(obj);
        },false);
    }
    //localStorage.removeItem("temp_info");
    connection(obj);
    var get_user=get_cookie();
    //console.log(get_user);
    if(get_user!=null){
        $("a","#1","#nav_bar").text(get_user);
        $("a","#1","#nav_bar").click(function(){
            window.open("../../shop/Japanese/userHomepage_inform_PBL2_J.html");
        });
    }
    if(get_user==null){
        $("a","#1","#nav_bar").click(function(){
            window.open("../../shop/Japanese/login_J.html");
        });
    }

    $('.input-sub').click(function(){
        var text = $('.input-text').val();
        window.location.href = '../../shop/Japanese/searchResult_PBL2_J.html?Text='+text+'&search=1&Campus='+obj['Campus']+'&Min=0&Max=9999999'
    });
    $('.input-sub2').click(function(){
        var text = $('.input-text').val();
        window.location.href = '../../shop/Japanese/searchResult2_PBL2_J.html?Text='+text+'&search=2&Campus='+obj['Campus']+'&Min=0&Max=9999999'
    });
    $('.rS_buttonFrame').click(function(){
        console.log(123);
        var down = $('.rS_inputPrice input')[0].value;
        var up = $('.rS_inputPrice input')[1].value;
        if(down != ''){
            obj['Min']=parseInt(down);
        }
        else{
            obj['Min']=0;
        }
        if(up != ''){
            obj['Max']=parseInt(up);
        }
        else{
            obj['Max']=9999999;
        }
        connection(obj);
    });
});
function connection(obj){
    console.log(obj);
    $('#searchResult_bar').empty();
    $.ajax({
        url:"../../php/search.php",
        type:"GET",
        dataType:'JSON',
        data:{parameter:obj},
        success: function(msg){
            console.log(msg);
            var length = msg.length;
	    if(obj['search']==2){
            for(var i =0;i<length;i++){
                $('#searchResult_bar').append(
                '<div class="resultDetail_frame">'+
                    '<div class="rD_image"><a href="../../shop/Japanese/detail2_PBL2_J.html?id='+msg[i].Id+'"><img src="../../php/'+msg[i].Picture+'" /></a></div>'+
                    '<div class="rD_price">￥'+msg[i].Price+'</div>'+
                    '<div class="rD_area">'+Campus[msg[i].Campus]+'</div>'+
                    '<div class="rD_name">'+
                        '<a href="#">'+
                            msg[i].Name+
                        '</a>'+
                    '</div>'+
                    '<div class="rD_saler"><a href="#">販売者id:'+msg[i].User+'</a></div>'+
                    '<div class="rD_blank"></div>'+
                '</div>');
            }
	}
	else{
		for(var i =0;i<length;i++){
                    $('#searchResult_bar').append(
                    '<div class="resultDetail_frame">'+
                        '<div class="rD_image"><a href="../../shop/Japanese/detail_PBL2_J.html?id='+msg[i].Id+'"><img src="'+msg[i].Picture+'" /></a></div>'+
                        '<div class="rD_price">￥'+msg[i].Price+'</div>'+
                        '<div class="rD_area">'+Campus[msg[i].Campus]+'</div>'+
                        '<div class="rD_name">'+
                            '<a href="#">'+
                                msg[i].Name+
                            '</a>'+
                        '</div>'+
                        '<div class="rD_saler"><a href="#">販売者id:'+msg[i].User+'</a></div>'+
                        '<div class="rD_blank"></div>'+
                    '</div>');
                }
	}
        },
        error: function () {console.log('error');}
    });
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
