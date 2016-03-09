'use strict';

let fs = require("fs");
let moment = require("moment");

let busData = JSON.parse(fs.readFileSync("./bus/data.json"));
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
            let actualTime = moment(time,"hh:mm:ss AA");

            if(currentTime.isSame(actualTime,"minute")) {
                return {
                    position: "at " + busStop,
                    percentage: (currentTime.seconds()/60),
                    timeLeft: 60 - currentTime.seconds(),
                    totalTime: 60,
                    cycles: runs + 1,
                    nextStop: busStopOrder[i2 + 1]
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
                        nextStop: busStopOrder[i2 + 1]
                    };
                }
            }
            lastTime = actualTime;
        }
    }
}

module.exports = {
    getBusLocation: getBusLocation
};
