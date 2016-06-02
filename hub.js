'use strict';

let moment = require("moment");
let request = require("request");
let cheerio = require("cheerio");

let endpoint1 = "https://flinders.libcal.com/process_roombookings.php";
let ref = "https://flinders.libcal.com/booking/hub00";

function getMediaRoomStatus(callback) {
    request({
        method: "POST",
        uri: endpoint1,
        qs: {
            m: "calscroll",
            gid: "12308",
            date: moment().format("YYYY-MM-DD"),
            nocache: Date.now()
        },
        headers: {
            ["Referer"]: ref
        }
    },function(err,res,body) {
        if(err) {
            callback(err,null);
        }
        else {
            if(res.statusCode == 200) {
                try {
                    let $ = cheerio.load(body);

                    let avail = false;
                    let diff,nextAvailFrom,nextAvailTo;

                    $(".lc_rm_a").each(function() {
                        let matches = $(this).attr("onclick").match(/return showBookingForm\(this\.id,'(.*?)','(.*?) - (.*?),(.*?)', '(.*)'\);/);

                        if(matches && matches[2] && matches[3]) {
                            let ts_from = moment(matches[2],"hh:mmaa");
                            let ts_to = moment(matches[3],"hh:mmaa");

                            if(ts_from.isBefore(moment())) {return;}

                            let diff_from = moment().diff(ts_from,"seconds");

                            if((diff_from > diff) || !diff) {
                                diff = diff_from;
                                nextAvailFrom = ts_from;
                                nextAvailTo = ts_to;
                            }

                            if(moment().isBetween(ts_from,ts_to)) {
                                avail = true;
                                // console.log("Yes");
                            }
                            else {
                                // console.log("No");
                            }
                        }
                    });

                    let next = "The media room is unavailable for booking today.";
                    if(nextAvailFrom && nextAvailTo) {
                        next = "The media room is next available for booking from " + nextAvailFrom.format("hh:mma") + " to " + nextAvailTo.format("hh:mma") + ".";
                    }

                    callback(null,next);
                }
                catch(errMsg) {
                    callback(errMsg);
                }
            }
            else {
                callback("HTTP status code is " + res.statusCode + " (not 200!)",[]);
            }
        }
    });
}

module.exports = {
    getMediaRoomStatus: getMediaRoomStatus
};
