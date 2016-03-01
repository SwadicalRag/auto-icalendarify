'use strict';

let legacy = require("./legacy.js");
let EventEmitter = require('events').EventEmitter;

let ttAPI = {
    legacy: legacy,
    emitter: new EventEmitter()
};

ttAPI.years = [];

function validYear(year) {
    for(let i=0;i < ttAPI.years.length;i++)
        if(year == ttAPI.years[i])
            return true;

    return false;
}

ttAPI.helpers = {};

ttAPI.emitter.emit("initialising");

// tfw no promises
ttAPI.legacy.getAvailableYears(function(err,yearData) {
    for(let i=0;i < yearData.length;i++)
        ttAPI.years[ttAPI.years.length] = yearData[i].DESCRIPTION;
});

ttAPI.timetableSearch = function(query,callback) {
    ttAPI.legacy.searchTopics(query,function(err,topics) {
        if(err) {
            callback(err);
        }
        else {
            if(topics[0]) {
                ttAPI.legacy.getTimetable(query.year,topics[0].AVKEYNUMBER,callback);
            }
            else {
                callback("No topics found");
            }
        }
    });
};

// TODO: finish the high level API

module.exports = ttAPI;
