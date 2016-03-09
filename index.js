'use strict';

let timetable = require("./timetable.js");
let lectures = require("./lectures.js");

let flinders = {
    timetable: timetable,
    lectures: lectures
};

module.exports = flinders;
