TS.Modules.GoogleService =
{
    autoInit        : true,
    moduleName      : "GoogleService",
    enabled         : true,
    adStarted       : false,

    init: function () {
        this.addListeners();
    },

    addListeners: function () {
        if (this.enabled) {
            E.bindEvent(E.EVENT_AD_STARTED      , this.moduleName, this.onAdStarted     , this);
            E.bindEvent(E.EVENT_START_VIDEO     , this.moduleName, this.onVideoStarted  , this);
            E.bindEvent(E.EVENT_VIDEO_END       , this.moduleName, this.onVideoEnded    , this);
            E.bindEvent(E.EVENT_AD_ENDED        , this.moduleName, this.onAdEnded       , this);
            E.bindEvent(E.EVENT_PLAYER_INIT     , this.moduleName, this.onPlayerInit    , this);
            E.bindEvent(E.EVENT_YUME_AD_STARTED , this.moduleName, this.onAdStarted     , this);
            E.bindEvent(E.EVENT_YUME_AD_ENDED   , this.moduleName, this.onAdEnded       , this);
        }
    },

    onPlayerInit: function () {
        this.sendTrack("metric2", "VOD");
    },

    onAdStarted: function () {
        this.adStarted = true;
        this.sendTrack("metric4", "AD");
    },

    onAdEnded: function () {
        if(this.adStarted) {
            this.sendTrack("metric5", "AD");
        }
        this.adStarted = false;
    },

    onVideoStarted: function () {
        this.sendTrack("metric1", "VOD");
    },

    onVideoEnded: function () {
        this.sendTrack("metric3", "VOD");
    },

    sendTrack : function (metricName, contentType) {
        ga('remove', "metric1");
        ga('remove', "metric2");
        ga('remove', "metric3");
        ga('remove', "metric4");
        ga('remove', "metric5");

        ga('create' , 'UA-60606653-1', 'auto');

        ga('set'    , 'dimension1'  , TS.Modules.ChannellistModel.name);
        ga('set'    , 'dimension2'  , contentType);
        ga('set'    , 'dimension3'  , TS.Modules.ConfigModel.partner);
        ga('set'    , 'dimension4'  , this.getPlayConfig());
        ga('set'    , 'dimension5'  , TS.Modules.ConfigModel.country);
        ga('set'    , 'dimension6'  , this.getDomainName());
        ga('set'    , 'dimension7'  , TS.Modules.PlaylistModel.title);
        ga('set'    , 'dimension8'  , this.getVolume());
        ga('set'    , 'dimension9'  , this.getVideoViewSize());
        ga('set'    , 'dimension12' , TS.Modules.ChannellistModel.id);
        ga('set'    , 'dimension13' , "EP2 HTML5");
        ga('set'    , metricName    , '1');

        ga('send'   , 'pageview');
    },

    getVolume: function () {
        var volume = 100;

        try {
            var player = $("#videoControl")[0];

            volume = player.volume * 100;
        } catch(error) {
            volume = 100;
        }

        if(volume > 0) {
            return "On[" + volume + "]";
        }

        return "Off";
    },

    getVideoViewSize: function () {
        return $("#wrapper").width() + "x" + $("#wrapper").height();
    },

    getPlayConfig : function() {
        if(TS.Modules.ConfigModel.scrollToPlay === "true" || TS.Modules.ConfigModel.scrollToPlay === true) {
            return "SP";
        }

        if(TS.Modules.ConfigModel.autoPlay === "true" || TS.Modules.ConfigModel.autoPlay === true) {
            return "AP";
        }

        return "CP";
    },

    getDomainName: function () {
        var ret = document.referrer;

        if (ret) {
            var index = ret.indexOf("//");

            if (index > 0) {
                index += 2;
            }

            index = ret.indexOf("/", index);

            if (index > 0) {
                ret = ret.substring(0, index);
            }
        }

        return ret;
    }

};
