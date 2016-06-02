'use strict';

let timetable = require("./timetable.js");
let lectures = require("./lectures.js");
let bus = require("./bus.js");
let hub = require("./hub.js");

let flinders = {
    timetable: timetable,
    lectures: lectures,
    bus: bus,
    hub: hub
};

module.exports = flinders;
