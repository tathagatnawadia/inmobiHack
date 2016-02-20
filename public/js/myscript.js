/*** Get global variable ***/
var email;
var isActive;
var defaultFontSize;
var url=window.location.href;
var pollInterval = 100;
/*** End of global variable ***/

/*** Helper functions ***/
function getDivContents(unavailableDivs){
    var texts = [];
    $(unavailableDivs).each(function(){
        texts.push({
          "articleId":this.toString(),
          "content":$("[trIdentifier='"+this.toString()+"']").text(),
          "fontSize": $("[trIdentifier='"+this.toString()+"']").css('font-size')
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
    
    
    
    
    
    /*
    One time bootstrap
    */
    var allIdentifiers =[];
    $('.trCheck').each(function(){
        $(this).attr('visible', "false");
        $(this).attr('visibleTime', "0");
        allIdentifiers.push($(this).attr('trIdentifier'));
    });
    
    var allElements = {
        identifiers: allIdentifiers,
        email: email,
        url: url
    };
    socket.emit("allElements", allElements);
    
    socket.on("allElementsResponse", function(unavailableDivs){
        var content = getDivContents(unavailableDivs);
        var sendObj = {
            email: email,
            defaultFontSize: defaultFontSize,
            content: content
        };
        sendObj.url = url;
        socket.emit("divContent", sendObj);
    });    
    window.setInterval(function(){
        if(window.isActive){
            $('.trCheck').each(function(){
                if($(this).visible(false, true,'both')){
                    $(this).attr("visible", "true");
                    var newTime = parseInt($(this).attr("visibleTime")) + pollInterval;
                    $(this).attr("visibleTime", newTime+"");
                }
                else{
                    if($(this).attr('visible') === "true"){
                        var obj = {
                            url: url,
                            email: email,
                            identifier: $(this).attr("trIdentifier"),
                            visibleTime: $(this).attr("visibleTime")
                        };
                        console.log(obj);
                        socket.emit("screenChange", obj);
                    }
                    $(this).attr('visible', "false");
                    $(this).attr('visibleTime', "0");
                }
            });
        }
    }, pollInterval);
    
});