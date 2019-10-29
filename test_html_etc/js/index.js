$(document).ready(function(){
        var a=5;
        $.ajax({
            url:"../php/index.php",
            type:"POST",
            data:{parameter:a},

            success: function(msg) {
                var msg = msg;
                console.log('success');
                //console.log(msg)
                console.log(msg);
                $("#rcmd1_img").attr({"src": msg.Picture1}); 
                var camp= {
                    '1':'伊都校区',
                    '2':'大桥校区',
                    '3':'病院校区'
                }
                $("#rcmd1_area").text(camp[msg.Campus1]);
                $("#rcmd1_price").text(msg.Price1+'円'); 

                $("#rcmd2_img").attr({"src": msg.Picture2}); 
                $("#rcmd2_area").text(camp[msg.Campus2]);
                $("#rcmd2_price").text(msg.Price2+'円');

                $("#rcmd3_img").attr({"src": msg.Picture3}); 
                $("#rcmd3_area").text(camp[msg.Campus3]);
                $("#rcmd3_price").text(msg.Price3+'円');
                //alert($("#rcmd1_img").attr("src"));
                //window.location.href="http://localhost/test/Welcome.html";
                    
                
            },
            error: function () {}
        })
        //window.location.href="cart.html";
});