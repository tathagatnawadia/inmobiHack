__ADTECH_CODE__ = "";
__theDocument = document;
__theWindow = window;
__bCodeFlushed = false;

function __flushCode() {
	if (!__bCodeFlushed) {
		var span = parent.document.createElement("SPAN");
		span.innerHTML = __ADTECH_CODE__;
		window.frameElement.parentNode.appendChild(span);
		__bCodeFlushed = true;
	}
}

if (typeof inFIF != "undefined" && inFIF) {
    document.nativeWrite = document.write;
    document.nativeWriteln = document.writeln;
	document.write = function(str) {
		__ADTECH_CODE__ += str;
	};
	document.writeln = function(str) {
		document.write(str + "\n");
	};
	__theDocument = parent.document;
	__theWindow = parent;
}
document.write("<a href=\"http://adserver.adtech.de/adlink|327|3550051|0|225|AdId=13712808;BnId=2;itime=988153436;key=homepage%3Aindex;kr3132=2596984;kp=76620;nodecode=yes;link=http://bcp.crwdcntrl.net/5/c=3150/b=27075564?https://thisonesforyou.com/?utm_source=Goal&utm_medium=Banner&utm_content=House_English&utm_name=Guetta\" target=\"_blank\"><img src=\"http://aka-cdn-ns.adtech.de/apps/424/Ad13712808St3Sz225Sq109167675V2Id2/EN-UEFA-Leaderboard.gif\" border=\"0\" alt=\"\" title=\"\"></a>\n");
ecp3550051y = new Image();ecp3550051y.src='http://bcp.crwdcntrl.net/5/c=3150/b=27075597';
function cleanUp() {
 if (typeof __parent.swappedRefs3550051 == "undefined") {
   __parent.swappedRefs3550051 = new Array();
 }
   
 while (__parent.swappedRefs3550051.length > 0) {
   var ref = __parent.swappedRefs3550051.pop();
   if (ref != "swappedRefs3550051") {
     __parent[ref] = null;
   }
 }
}

if (typeof inFIF != "undefined" && inFIF == true) {
 __parent = window.parent;
 window.onunload = cleanUp;
 cleanUp();

 for (var ref in window) {
   if ((typeof __parent[ref] == "undefined" || __parent[ref] == null) 
         && ref != "frameElement" && ref != "event" && ref != "swappedRefs3550051" && ref != "onunload") {
     try {__parent[ref] = window[ref]; __parent.swappedRefs3550051.push(ref);} catch (e) {}
  } 
 }  
}

function __restoreOverwrittenFuncs() {
document.write = document.nativeWrite;
document.writeln = document.nativeWriteln;
}

if (typeof inFIF != "undefined" && inFIF) {
	__flushCode();
}

if (typeof inFIF != "undefined" && inFIF == true) {
try {parent.write = write;
} catch (e) {}try {parent.writeln = writeln;
} catch (e) {}try {parent.__flushCode = __flushCode;
} catch (e) {}try{__restoreOverwrittenFuncs();}catch(e){}}

var adcount_3550051_1_=new Image();
adcount_3550051_1_.src="http://adserver.adtech.de/adcount|2.0|327|3550051|0|225|AdId=13712808;BnId=2;ct=2830886650;st=43571;adcid=1;itime=988153436;reqtype=5;;key=homepage%3Aindex;kr3132=2596984;kp=76620";

var websiteids1092251 = [1029344,1134093,1047955,1144067,1124211,1116407,1168524,1168525,1145681,1169120,1103329,1117473,1103441,1105590,1168785,1134347,1147152];
var found1092251 = websiteids1092251.indexOf(1092251); 
if (found1092251 > -1 ) {
document.write('<scr'+'ipt language="javas'+'cript" type="text/javascript" src="//js.revsci.net/gateway/gw.js?csid=F09828&auto=t&bpid=performgroup"></scr'+'ipt>');
}
var campaignIds_13712808 = [13770707,13770705,13770706,13770708,13771459,13771460,13771461,13770701,13770702,13770703,13770704,13771469,13771470,13771467,13771468,13771480,13771481,13771479,13771473,13771474,13771475,13771471,13771482,13771483,13771484,13771485,13771476,13771477,13771478,13771525,13544912,13544910,13544909,13544911,13179205,13179203,13179204,13179202,13021863,13021864,13021865,13021866,13544913,13544915,13544916,13544914,13187911,13187909,13187910,13187912,13021899,13180516,13180517,13180518,13180519,13117974,13117975,13117976,13117977,13469443,13432138,13432122,13469361,13213935,13021904,13469442,13432139,13432121,13469363,13213936,13021905,13469440,13432140,13432125,13469364,13213937,13021906,13469441,13432141,13432124,13469365,13213938,13021907,13324795,13324790,13622414,13622413,13622416,13737910,13737911,13737915,13737914,13642224,13642225,13642223,13642226,13718862,13718863,13718864,13718865,13718866,13718867];
var found13712808 = campaignIds_13712808.indexOf(13712808); 
if (found13712808 > -1 ) {
document.write('<scr'+'ipt src="http://js.moatads.com/performgroup259905273038/moatad.js#moatClientLevel1=13712807&moatClientLevel2=13712808&moatClientLevel3=109167675&moatClientLevel4=-&moatClientSlicer1=327&moatClientSlicer2=1092251" type="text/javasc'+'ript"></scr'+'ipt>');
}
ADTECH_getNumberOfAddonBanners = function() { return 0; }
