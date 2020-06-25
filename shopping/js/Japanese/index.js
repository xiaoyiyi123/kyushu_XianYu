var camp= {
    '0': '未知キャンパス',
    '1': '伊都キャンパス',
    '2': '大橋キャンパス',
    '3': '筑紫キャンパス',
    '4': '病院キャンパス',
    '5': '別府キャンパス'
}
var globalcampus = 0;
window.onload = function(){
    var get_user=get_cookie();
    if(get_user!=null){
        $("a","#1","#nav_bar").text(get_user);
        $("a","#1","#nav_bar").click(function(){
            window.location.href = "../../shop/Japanese/userHomepage_inform_PBL2_J.html";
        });
    }
    if(get_user==null){
        $("a","#1","#nav_bar").click(function(){
            window.location.href = "../../shop/Japanese/login_J.html";
        });
    }
    serverConnection(0);
    var dropDown = document.getElementsByClassName('dropdown-area')[0].getElementsByTagName('a');
    for(let i=0;i<=5;i++){
        dropDown[i].addEventListener('click',function(){
            $("#selection_campus").contents()[2].textContent = camp[i];
            serverConnection(i);
        },false);
    }
}
function serverConnection(campus){
    globalcampus = campus;
    $.ajax({
        url:'../../php/index.php',
        type:'POST',
        data:{
            campus:campus,
        },
        success:(msg)=>{
            console.log(msg);
            fillInfo('recom_bar','item',msg);
            fillInfo('need_bar','collect',msg);
            fillInfo('record_bar','history',msg);
        },
        error:(msg)=>{
            console.log('error:'+msg);
        }
    });
}
function fillInfo(IdName,className,msg){
    let wrapper = document.getElementById(IdName);
            let TagA = wrapper.getElementsByTagName('a');
            let pictures = wrapper.getElementsByTagName('img');
            let campusPrice = wrapper.getElementsByTagName('Li');
            let name = wrapper.getElementsByClassName('com_name');
            for(let i = 0; i < 8; i++){
                TagA[i].href = 'detail_PBL2_J.html?id='+msg[className][i]['Id'];
                pictures[i].src = msg[className][i]['Picture'];
                campusPrice[2*i].innerHTML = camp[msg[className][i]['Campus']];
                campusPrice[2*i+1].innerHTML = msg[className][i]['Price'];
                name[i].innerHTML = msg[className][i]['Name'];
            }
}
function search(key){
    var form = document.getElementsByTagName('form')[0];
    var searchType = document.createElement('input');
    searchType.type = 'hidden';
    searchType.name = 'search';
    searchType.value = key;
    form.appendChild(searchType);

    var searchCampus = document.createElement('input');
    searchCampus.type = 'hidden';
    searchCampus.name = 'Campus';
    searchCampus.value = globalcampus;
    form.appendChild(searchCampus);

    var searchMin = document.createElement('input');
    searchMin.type = 'hidden';
    searchMin.name = 'Min';
    searchMin.value = 0;
    form.appendChild(searchMin);

    var searchMax = document.createElement('input');
    searchMax.type = 'hidden';
    searchMax.name = 'Max';
    searchMax.value = 9999999;
    form.appendChild(searchMax);
    switch(key){
        case 1:
            form.action='./searchResult_PBL2_J';
            break;
        case 2:
            form.action='./searchResult2_PBL2_J';
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


