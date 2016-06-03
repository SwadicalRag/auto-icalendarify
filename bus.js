'use strict';

let fs = require("fs");
let moment = require("moment-timezone");

let busData = [
    {
        "Departs FMC":"7:15:00 AM",
        "Departs Registry":"7:19:00 AM",
        "Departs Carpark 4":"7:22:00 AM",
        "Departs Carpark 2":"7:24:00 AM",
        "Departs Carpark 9":"7:26:00 AM",
        "Departs Carpark 13 (sturt)":"7:31:00 AM"
    },
    {
        "Departs FMC":"7:35:00 AM",
        "Departs Registry":"7:39:00 AM",
        "Departs Carpark 4":"7:42:00 AM",
        "Departs Carpark 2":"7:44:00 AM",
        "Departs Carpark 9":"7:46:00 AM",
        "Departs Carpark 13 (sturt)":"7:51:00 AM"
    },
    {
        "Departs FMC":"7:55:00 AM",
        "Departs Registry":"7:59:00 AM",
        "Departs Carpark 4":"8:02:00 AM",
        "Departs Carpark 2":"8:04:00 AM",
        "Departs Carpark 9":"8:06:00 AM",
        "Departs Carpark 13 (sturt)":"8:11:00 AM"
    },
    {
        "Departs FMC":"8:15:00 AM",
        "Departs Registry":"8:19:00 AM",
        "Departs Carpark 4":"8:22:00 AM",
        "Departs Carpark 2":"8:24:00 AM",
        "Departs Carpark 9":"8:26:00 AM",
        "Departs Carpark 13 (sturt)":"8:31:00 AM"
    },
    {
        "Departs FMC":"8:35:00 AM",
        "Departs Registry":"8:39:00 AM",
        "Departs Carpark 4":"8:42:00 AM",
        "Departs Carpark 2":"8:44:00 AM",
        "Departs Carpark 9":"8:46:00 AM",
        "Departs Carpark 13 (sturt)":"8:51:00 AM"
    },
    {
        "Departs FMC":"8:55:00 AM",
        "Departs Registry":"8:59:00 AM",
        "Departs Carpark 4":"9:02:00 AM",
        "Departs Carpark 2":"9:04:00 AM",
        "Departs Carpark 9":"9:06:00 AM",
        "Departs Carpark 13 (sturt)":"9:11:00 AM"
    },
    {
        "Departs FMC":"9:15:00 AM",
        "Departs Registry":"9:19:00 AM",
        "Departs Carpark 4":"9:22:00 AM",
        "Departs Carpark 2":"9:24:00 AM",
        "Departs Carpark 9":"9:26:00 AM",
        "Departs Carpark 13 (sturt)":"9:31:00 AM"
    },
    {
        "Departs FMC":"9:35:00 AM",
        "Departs Registry":"9:39:00 AM",
        "Departs Carpark 4":"9:42:00 AM",
        "Departs Carpark 2":"9:44:00 AM",
        "Departs Carpark 9":"9:46:00 AM",
        "Departs Carpark 13 (sturt)":"9:51:00 AM"
    },
    {
        "Departs FMC":"9:55:00 AM",
        "Departs Registry":"9:59:00 AM",
        "Departs Carpark 4":"10:02:00 AM",
        "Departs Carpark 2":"10:04:00 AM",
        "Departs Carpark 9":"10:06:00 AM",
        "Departs Carpark 13 (sturt)":"10:11:00 AM"
    },
    {
        "Departs FMC":"10:15:00 AM",
        "Departs Registry":"10:19:00 AM",
        "Departs Carpark 4":"10:22:00 AM",
        "Departs Carpark 2":"10:24:00 AM",
        "Departs Carpark 9":"10:26:00 AM",
        "Departs Carpark 13 (sturt)":"10:31:00 AM"
    },
    {
        "Departs FMC":"10:35:00 AM",
        "Departs Registry":"10:39:00 AM",
        "Departs Carpark 4":"10:42:00 AM",
        "Departs Carpark 2":"10:44:00 AM",
        "Departs Carpark 9":"10:46:00 AM",
        "Departs Carpark 13 (sturt)":"10:51:00 AM"
    },
    {
        "Departs FMC":"10:55:00 AM",
        "Departs Registry":"10:59:00 AM",
        "Departs Carpark 4":"11:02:00 AM",
        "Departs Carpark 2":"11:04:00 AM",
        "Departs Carpark 9":"11:06:00 AM",
        "Departs Carpark 13 (sturt)":"11:11:00 AM"
    },
    {
        "Departs FMC":"11:15:00 AM",
        "Departs Registry":"11:19:00 AM",
        "Departs Carpark 4":"11:22:00 AM",
        "Departs Carpark 2":"11:24:00 AM",
        "Departs Carpark 9":"11:26:00 AM",
        "Departs Carpark 13 (sturt)":"11:31:00 AM"
    },
    {
        "Departs FMC":"11:35:00 AM",
        "Departs Registry":"11:39:00 AM",
        "Departs Carpark 4":"11:42:00 AM",
        "Departs Carpark 2":"11:44:00 AM",
        "Departs Carpark 9":"11:46:00 AM",
        "Departs Carpark 13 (sturt)":"11:51:00 AM"
    },
    {
        "Departs FMC":"11:55:00 AM",
        "Departs Registry":"11:59:00 AM",
        "Departs Carpark 4":"12:02:00 PM",
        "Departs Carpark 2":"12:04:00 PM",
        "Departs Carpark 9":"12:06:00 PM",
        "Departs Carpark 13 (sturt)":"12:11:00 PM"
    },
    {
        "Departs FMC":"12:15:00 PM",
        "Departs Registry":"12:19:00 PM",
        "Departs Carpark 4":"12:22:00 PM",
        "Departs Carpark 2":"12:24:00 PM",
        "Departs Carpark 9":"12:26:00 PM",
        "Departs Carpark 13 (sturt)":"12:31:00 PM"
    },
    {
        "Departs FMC":"12:35:00 PM",
        "Departs Registry":"12:39:00 PM",
        "Departs Carpark 4":"12:42:00 PM",
        "Departs Carpark 2":"12:44:00 PM",
        "Departs Carpark 9":"12:46:00 PM",
        "Departs Carpark 13 (sturt)":"12:51:00 PM"
    },
    {
        "Departs FMC":"12:55:00 PM",
        "Departs Registry":"12:59:00 PM",
        "Departs Carpark 4":"1:02:00 PM",
        "Departs Carpark 2":"1:04:00 PM",
        "Departs Carpark 9":"1:06:00 PM",
        "Departs Carpark 13 (sturt)":"1:11:00 PM"
    },
    {
        "Departs FMC":"1:15:00 PM",
        "Departs Registry":"1:19:00 PM",
        "Departs Carpark 4":"1:22:00 PM",
        "Departs Carpark 2":"1:24:00 PM",
        "Departs Carpark 9":"1:26:00 PM",
        "Departs Carpark 13 (sturt)":"1:31:00 PM"
    },
    {
        "Departs FMC":"1:35:00 PM",
        "Departs Registry":"1:39:00 PM",
        "Departs Carpark 4":"1:42:00 PM",
        "Departs Carpark 2":"1:44:00 PM",
        "Departs Carpark 9":"1:46:00 PM",
        "Departs Carpark 13 (sturt)":"1:51:00 PM"
    },
    {
        "Departs FMC":"1:55:00 PM",
        "Departs Registry":"1:59:00 PM",
        "Departs Carpark 4":"2:02:00 PM",
        "Departs Carpark 2":"2:04:00 PM",
        "Departs Carpark 9":"2:06:00 PM",
        "Departs Carpark 13 (sturt)":"2:11:00 PM"
    },
    {
        "Departs FMC":"2:15:00 PM",
        "Departs Registry":"2:19:00 PM",
        "Departs Carpark 4":"2:22:00 PM",
        "Departs Carpark 2":"2:24:00 PM",
        "Departs Carpark 9":"2:26:00 PM",
        "Departs Carpark 13 (sturt)":"2:31:00 PM"
    },
    {
        "Departs FMC":"2:35:00 PM",
        "Departs Registry":"2:39:00 PM",
        "Departs Carpark 4":"2:42:00 PM",
        "Departs Carpark 2":"2:44:00 PM",
        "Departs Carpark 9":"2:46:00 PM",
        "Departs Carpark 13 (sturt)":"2:51:00 PM"
    },
    {
        "Departs FMC":"2:55:00 PM",
        "Departs Registry":"2:59:00 PM",
        "Departs Carpark 4":"3:02:00 PM",
        "Departs Carpark 2":"3:04:00 PM",
        "Departs Carpark 9":"3:06:00 PM",
        "Departs Carpark 13 (sturt)":"3:11:00 PM"
    },
    {
        "Departs FMC":"3:15:00 PM",
        "Departs Registry":"3:19:00 PM",
        "Departs Carpark 4":"3:22:00 PM",
        "Departs Carpark 2":"3:24:00 PM",
        "Departs Carpark 9":"3:26:00 PM",
        "Departs Carpark 13 (sturt)":"3:31:00 PM"
    },
    {
        "Departs FMC":"3:35:00 PM",
        "Departs Registry":"3:39:00 PM",
        "Departs Carpark 4":"3:42:00 PM",
        "Departs Carpark 2":"3:44:00 PM",
        "Departs Carpark 9":"3:46:00 PM",
        "Departs Carpark 13 (sturt)":"3:51:00 PM"
    },
    {
        "Departs FMC":"3:55:00 PM",
        "Departs Registry":"3:59:00 PM",
        "Departs Carpark 4":"4:02:00 PM",
        "Departs Carpark 2":"4:04:00 PM",
        "Departs Carpark 9":"4:06:00 PM",
        "Departs Carpark 13 (sturt)":"4:11:00 PM"
    },
    {
        "Departs FMC":"4:15:00 PM",
        "Departs Registry":"4:19:00 PM",
        "Departs Carpark 4":"4:22:00 PM",
        "Departs Carpark 2":"4:24:00 PM",
        "Departs Carpark 9":"4:26:00 PM",
        "Departs Carpark 13 (sturt)":"4:31:00 PM"
    },
    {
        "Departs FMC":"4:35:00 PM",
        "Departs Registry":"4:39:00 PM",
        "Departs Carpark 4":"4:42:00 PM",
        "Departs Carpark 2":"4:44:00 PM",
        "Departs Carpark 9":"4:46:00 PM",
        "Departs Carpark 13 (sturt)":"4:51:00 PM"
    },
    {
        "Departs FMC":"4:55:00 PM",
        "Departs Registry":"4:59:00 PM",
        "Departs Carpark 4":"5:02:00 PM",
        "Departs Carpark 2":"5:04:00 PM",
        "Departs Carpark 9":"5:06:00 PM",
        "Departs Carpark 13 (sturt)":"5:11:00 PM"
    },
    {
        "Departs FMC":"5:15:00 PM",
        "Departs Registry":"5:19:00 PM",
        "Departs Carpark 4":"5:22:00 PM",
        "Departs Carpark 2":"5:24:00 PM",
        "Departs Carpark 9":"5:26:00 PM",
        "Departs Carpark 13 (sturt)":"5:31:00 PM"
    },
    {
        "Departs FMC":"5:35:00 PM",
        "Departs Registry":"5:39:00 PM",
        "Departs Carpark 4":"5:42:00 PM",
        "Departs Carpark 2":"5:44:00 PM",
        "Departs Carpark 9":"5:46:00 PM",
        "Departs Carpark 13 (sturt)":"5:51:00 PM"
    }
];

let busStopOrder = [
    "FMC",
    "Registry",
    "Carpark 4",
    "Carpark 2",
    "Carpark 9",
    "Carpark 13 (sturt)"
];

function getBusLocation() {
    let currentTime = moment();
    let lastTime;
    for(let runs=0;runs < busData.length;runs++) {
        for(let i2=0;i2 < busStopOrder.length;i2++) {
            let busStop = busStopOrder[i2];
            let time = busData[runs]["Departs " + busStop];
            let actualTime = moment.tz(time,"hh:mm:ss AA","Australia/Adelaide");

            if(currentTime.isSame(actualTime,"minute")) {
                return {
                    position: "at " + busStop,
                    percentage: (currentTime.seconds()/60),
                    timeLeft: 60 - currentTime.seconds(),
                    totalTime: 60,
                    cycles: runs + 1,
                    nextStop: busStopOrder[i2 + 1] || busStopOrder[0]
                };
            }
            else if(lastTime) {
                if(currentTime.isBetween(lastTime,actualTime)) {
                    let totalTime = actualTime.diff(lastTime,"seconds");
                    let timeLeft = actualTime.diff(currentTime,"seconds");

                    return {
                        position: "en route to " + busStop,
                        percentage: 1-(timeLeft/totalTime),
                        timeLeft: timeLeft,
                        totalTime: totalTime,
                        cycles: runs + 1,
                        nextStop: busStopOrder[i2 + 1] || busStopOrder[0]
                    };
                }
            }
            lastTime = actualTime;
        }
    }

    return false; // bus service is inactive
}

module.exports = {
    getBusLocation: getBusLocation
};
