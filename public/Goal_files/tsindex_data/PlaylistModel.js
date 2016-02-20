TS.Modules.PlaylistModel =
{
    moduleName: 'PlaylistModel',
    config: {},
    autoInit: false,
    id: "",
    title: "",
    description: "",
    selectedIndex: 0,
    url: "",
    hlsUrl: "",
    duration: 0,
    style: null,
    group: null,
    thumb: "",
    videoItem: null,
    lastClickedVideoId: -1,
    rights: [],
    VIDEOTYPE_PREROLL: "preroll",
    VIDEOTYPE_MIDROLL: "midroll",
    VIDEOTYPE_POSTROLL: "postroll",
    VIDEOTYPE_CONTENT: "content",

    nextVideoItem: "",
    nextVideoItem2: "",
    nextVideoItem3: "",
    internalReferrer: "",
    maximumBitrate: 484000,
    maximumBitrateInFullscreen: 1200000,

    // TS.Modules.PlaylistModel.initFromVideoItem
    initFromVideoItem: function (videoItem) {
        this.maximumBitrate = TS.Modules.CustomRulesModel.getRule("maximumVideoBitrate", 484000);
        this.maximumBitrateInFullscreen = TS.Modules.CustomRulesModel.getRule("maximumVideoBitrateInFullscreen", 1200000);
        this.id = videoItem.guid['#text'];
        this.description = videoItem.description;
        this.thumb = videoItem.group.thumbnail ? videoItem.group.thumbnail.url : "";
        this.title = videoItem.title;
        this.style = videoItem.style;
        this.group = videoItem.group;
        this.duration = Number(videoItem.group.content[0].duration);
        this.rights = videoItem.rights;
        this.hlsUrl = this.getHLSUrl(videoItem);
        this.url = this.transformUrl(this.getVideoContent(videoItem).url);
        this.videoItem = videoItem;
        this.selectedIndex = Number(videoItem.index);
        this.videoItem.contentType = "Unknow";//TS.Modules.ChannellistModel.list.type;
    },

    updateUrl : function() {
        this.url = this.transformUrl(this.getVideoContent(this.videoItem).url);
    },

    getVideoContent: function (videoItem) {
        try {
            var bitrate = TS.Modules.FullscreenService.isFullscreenOn() ? this.maximumBitrateInFullscreen : this.maximumBitrate;

            for (var i = 0; i < videoItem.group.content.length; i++) {
                var content = videoItem.group.content[i];

                if (Number(content.bitrate) == bitrate) {
                    return content;
                }
            }
        } catch(error) {
            //nothing to do
        }

        return videoItem.group.content[0];
    },

    getHLSUrl: function (videoItem) {
        try {
            if (videoItem.group.hls && videoItem.group.hls.url) {
                return videoItem.group.hls.url;
            }
            else if (videoItem.group.hls) {
                return videoItem.group.hls[0].url;
            }
        }
        catch (error) {
            //nothing to do
        }

        return "";

    },

    transformUrl: function (url) {
        // level3
        url = url.replace('rtmp://vod.l3.cms.performgroup.com/perform-vod-l3/', 'http://vod.cms.download.performgroup.com/');
        // Akamai
        url = url.replace('rtmp://vod.cms.performgroup.com/fod/flv/', 'http://vod.cms.download.performgroup.com/');
        // Amazon cloud
        url = url.replace('rtmp://fod.aka.oss1.performgroup.com/fod/oss1/', 'http://vod.aka.oss1.performgroup.com/');
        url = url.replace('rtmp://fod.ffa.aka.oss1.performgroup.com/fod/oss1/', 'http://vod.ffa.aka.oss1.performgroup.com/');

        url = url.replace('rtmp://cp148076.edgefcs.net/ondemand/test/ePlayer2/', 'http://cp156134.edgesuite.net/ePlayer2/');

        url = url.replace("rtmp://fod.sportal.aka.oss1.performgroup.com/fod/oss1/", "http://vod.sportal.aka.oss1.performgroup.com/");

        return url;
    },

    getEditorsPickItem: function () {
        if (this.videoItem &&
            this.videoItem.style &&
            this.videoItem.style.channel &&
            this.videoItem.style.channel.id &&
            TS.Modules.initialize.config &&
            TS.Modules.initialize.config.structureModel &&
            TS.Modules.initialize.config.structureModel.allChannels
        ) {
            var editorsPick = null;
            var channelStyle = this.videoItem.style.channel;

            for (var i = 0; i < TS.Modules.initialize.config.structureModel.allChannels.length; i++) {
                var channel = TS.Modules.initialize.config.structureModel.allChannels[i];

                if (channelStyle.id == channel.id) {
                    editorsPick = {};

                    editorsPick.id = channel.id;
                    editorsPick.genre = channel.genre;
                    editorsPick.category = channel.category;
                    editorsPick.channelName = channel.name;

                    break;
                }
            }

            if (!editorsPick && channelStyle.name) {
                editorsPick = {};

                editorsPick.id = channelStyle.id;
                editorsPick.genre = channelStyle.genre ? channelStyle.genre : "Unidentified";
                editorsPick.category = channelStyle.category ? channelStyle.category : "Unidentified";
                editorsPick.channelName = channelStyle.name ? channelStyle.name : "Unidentified";
            }

            return editorsPick;
        }

        return null;
    }


}
