TS.Modules.YumeService = {
    moduleName          : 'yumeService',
    autoInit            : true,
    player              : $("#videoControl")[0],
    yumeSDKInstance     : null,
    yumeInitObj         : null,
    eventAdderRemover   : null,
    initSuccess         : false,
    prerollPlaylist     : "",
    postrollPlaylist    : "",

    init: function () {
        E.bindEvent(E.EVENT_STRUCTURE_LOADED    , this.moduleName, this.onStructureLoaded , this);
        E.bindEvent(E.EVENT_START_YUME_PREROLL  , this.moduleName, this.onPreroll         , this);
        E.bindEvent(E.EVENT_START_YUME_POSTROLL , this.moduleName, this.onPostroll        , this);
    },

    onStructureLoaded: function () {
        try {
            this.yumeSDKInstance            = new YuMeHTML5SDK();
            window.yumeSDKAdEventListener   = this.yumeSDKAdEventListener;
        } catch(e){
            this.logError(e);
        }
    },

    initYume : function () {
        try{
            var isAustralian = TS.Modules.ConfigModel.country.toLowerCase() == "au";

            this.yumeInitObj                            = new YuMeHTML5SDKInitObject();
            this.yumeInitObj.adDomainUrl                = isAustralian ? "http://plg1.yumenetworks.com" : "http://plg2.yumenetworks.com";
            this.yumeInitObj.domainId                   = TS.Modules.CustomRulesModel.getRule("yumeDomain");
            this.yumeInitObj.qsParams                   = "";
            this.yumeInitObj.html5VideoId               = "videoControl";
            this.yumeInitObj.html5VideoDivId            = "vObject";
            this.yumeInitObj.clickTagHRefId             = "hRefClickTag";
            this.yumeInitObj.videoTimeoutInterval       = 4;
            this.yumeInitObj.videoTimeoutPollInterval   = 500;

            if(!this.yumeInitObj.domainId)
            {
                this.logInfo("Yume domain id is empty. Yume is not enabled.");
                return false;
            }

            this.initPlaylists();

            var initSuccess = this.yumeSDKInstance.yume_init(this.yumeInitObj);

            if(!initSuccess)
            {
                this.logInfo("Initialization of yume is failed!");
            }

            return initSuccess;

            //this.yumeInitObj.bPrefetchMidrollAd = false;
            //this.yumeInitObj.bPrefetchPostrollAd = false;
        } catch(e){
            this.logInfo(e);
        }

        return false;
    },

    initPlaylists : function(){
        var config = {};

        config.title        = TS.Modules.PlaylistModel.title;
        config.channel      = this.getChannelId();
        config.duration     = TS.Modules.PlaylistModel.duration;
        config.genre        = TS.Modules.ChannellistModel.genre;
        config.category     = TS.Modules.ChannellistModel.category;
        config.playerSize   = this.getVideoViewSize();

        this.yumeInitObj.prerollPlaylist  =  "dynamic_preroll_playlist.json";
        this.yumeInitObj.postrollPlaylist =  "dynamic_postroll_playlist.json";

        this.yumeInitObj.qsParams = "&pubchannel="  + encodeURIComponent(config.channel)
                                                    + "&genre="         + encodeURIComponent(config.genre)
                                                    + "&category="      + encodeURIComponent(config.category)
                                                    + "&player_size="   + config.playerSize
                                                    + "&embeddedIn=www.perfornmgroup.com";
    },

    getVideoViewSize : function(){
        var videoWidth = $("#videoControl").width();

        if (videoWidth % 50 != 0) {
            videoWidth = (Math.floor(videoWidth / 50) + 1) * 50;
        }

        return videoWidth;
    },

    getChannelId : function(){
        var editorsPickItem = TS.Modules.PlaylistModel.getEditorsPickItem();
        var channelId       = TS.Modules.ChannellistModel.id;

        if (editorsPickItem) {
            channelId = editorsPickItem.id;
        }

        return channelId;
    },

    yumeSDKAdEventListener: function (yume_event, yume_eventInfo) {
        try {
            switch (yume_event) {
                case YuMeHTML5SDK.prototype.yume_adEvent.AD_PRESENT:
                    TS.Modules.YumeService.logInfo("Received AD_PRESENT event from YuMe HTML5 SDK...");
                    E.trigger(E.EVENT_YUME_AD_STARTED, TS.Modules.YumeService.moduleName);
                    break;
                case YuMeHTML5SDK.prototype.yume_adEvent.AD_ABSENT:
                    TS.Modules.YumeService.logInfo("Received AD_ABSENT event from YuMe HTML5 SDK...");
                    break;
                case YuMeHTML5SDK.prototype.yume_adEvent.AD_PLAYING:
                    TS.Modules.YumeService.logInfo("Received AD_PLAYING event from YuMe HTML5 SDK...");
                    break;
                case YuMeHTML5SDK.prototype.yume_adEvent.AD_COMPLETED:
                    TS.Modules.YumeService.logInfo("Received AD_COMPLETED event from YuMe HTML5 SDK...");
                    TS.Modules.YumeService.triggerYumeEnd();
                    E.trigger(E.EVENT_YUME_AD_ENDED, TS.Modules.YumeService.moduleName);
                    break;
                case YuMeHTML5SDK.prototype.yume_adEvent.AD_ERROR:
                    TS.Modules.YumeService.logInfo("Received AD_ERROR event from0 YuMe HTML5 SDK, Error Info: " + yume_eventInfo);
                    break;
                case YuMeHTML5SDK.prototype.yume_adEvent.AD_CB_IFRAME:
                    TS.Modules.YumeService.logInfo("Received AD_CB_IFRAME event from YuMe HTML5 SDK..." + yume_eventInfo);
                    break;
                default:
                    break;
            }
        } catch(e){
            this.logError(e);
        }
    },

    triggerYumeEnd : function(){
        if (TS.Modules.VastModel.postRoll) {
            TS.Modules.LiveRailVPAIDManager.triggerPostrollEnd();
        }
        else {
            TS.Modules.LiveRailVPAIDManager.triggerStartVideo();
        }
    },

    logError : function(error){
        if (console && console.error) {
            console.error(error);
        }
    },

    logInfo : function(info){
        if (console && console.info) {
            console.info(info);
        }
    },

    onPreroll : function() {
        try{
             if(this.initYume()) {
                this.yumeSDKInstance.yume_startAd(YuMeHTML5SDK.prototype.yume_adBlockType.PREROLL_BLOCK);
                return;
            }
        } catch(e){
            this.logInfo(e);
        }

        this.triggerYumeEnd();
    },

    onPostroll : function(){
        try{
            if(this.initYume()) {
                this.yumeSDKInstance.yume_startAd(YuMeHTML5SDK.prototype.yume_adBlockType.POSTROLL_BLOCK);
                return;
            }
        } catch(e){
            this.logInfo(e);
        }

        this.triggerYumeEnd();
    }
}
