'use strict';

let request = require("request");
let parseString = require("xml2js").parseString;

let endpoint = "http://video.flinders.edu.au/lectureResources/vod/";

function getLecture(classID,year,callback) {
    request({
        method: "GET",
        uri: endpoint + classID.toUpperCase() + "_" + year + ".xml"
    },function(err,res,body) {
        if(err) {
            callback(err,[]);
        }
        else {
            if(res.statusCode == 200) {
                let data = parseString(body,function(err,result) {
                    if(err) {
                        callback(err);
                    }
                    else {
                        callback(null,result.rss.channel[0].item);
                    }
                });
            }
            else {
                callback("HTTP status code is " + res.statusCode + " (not 200!)",[]);
            }
        }
    });
}

module.exports = {
    getLecture: getLecture
};
