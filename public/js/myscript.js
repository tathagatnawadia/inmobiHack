var email;
var socket = io();
$( document ).ready(function() {
    var userInfo = {};
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
                userInfo["latitude"] = position.coords.latitude;
                userInfo["longitude"] = position.coords.longitude;
        });
    }
    email = prompt("Enter your email ID");	
    userInfo['email'] = email;
    socket.emit("signIn", userInfo);
    var headLines = [];
    $('.box').each(function(){
        var temp = $(this).find('h3')[0];
        headLines.push($(temp).text());
    });
    console.log(headLines)
    socket.emit("headLines", headLines);
});

function onArticleOpen(obj){
    var sendObj = {};
    sendObj.email = email;
    sendObj.article = $(obj).find('p')[0].innerHTML;
    sendObj.headLine = $(obj).find('h3')[0].innerHTML;
    socket.emit('articleOpen',sendObj);
}
$(document).on('click', '.box-close', function(){
    var temp =$(this).parent().find('h3')[0];
    var userInfo = {};
    userInfo['email'] = email;
    userInfo['headLine'] = $(temp).text();
    socket.emit("articleClose",userInfo);
    console.log(userInfo);
});