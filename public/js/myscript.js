/*** Get global variable ***/
var email;
var isActive;
var defaultFontSize;
var url=window.location.href;

/*** End of global variable ***/

/*** Helper functions ***/
function getDivContents(unavailableDivs){
    var texts = [];
    $(unavailableDivs).each(function(){
        $('[trIdentifier="'+this.toString()+'"]').find('*').each(function(){
            texts.push({
                "content":$(this).text(),
                "fontSize": $(this).css('font-size')
            });
        });
    });
    return texts;
}

function removeDuplicates(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}
/*** End of helper functions ***/

/*** Window active check ***/
window.onfocus = function () { 
  isActive = true; 
}; 

window.onblur = function () { 
  isActive = false; 
}; 

/*** End of window active check ***/

var socket = io();
$( document ).ready(function() {
    defaultFontSize = $('body').css('font-size');
    var userInfo = {};
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
                userInfo["latitude"] = position.coords.latitude;
                userInfo["longitude"] = position.coords.longitude;
        });
    }
    email = prompt("Enter your email ID");	
    userInfo['email'] = email;
    userInfo['url'] = url;
    socket.emit("signIn", userInfo);
    var intervalID = window.setInterval(function(){
        var obj = {};
        obj.email = email;
        var identifier = [];
        if(window.isActive){
            $('.trCheck').each(function(){
                if($(this).visible(false, true,'both')){
                    identifier.push($(this).attr('trIdentifier'));
                }
            });
            obj.visibleDivs = removeDuplicates(identifier);
            obj.url = url;
            socket.emit("trackerEvent", obj);
            console.log(obj);
            socket.on("response", function(unavailableDivs){
                var content = getDivContents(unavailableDivs);
                var sendObj = {
                    email: email,
                    defaultFontSize: defaultFontSize,
                    content: content
                };
                sendObj.url = url;
                socket.emit("divContent", sendObj);
            });
        }
    }, 1000);
});