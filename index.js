'use strict';

let timetable = require("./timetable.js");
let lectures = require("./lectures.js");
let bus = require("./bus.js");

let flinders = {
    timetable: timetable,
    lectures: lectures,
    bus: bus
};

module.exports = flinders;
