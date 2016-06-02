'use strict';

var flinders = require("../index.js");

// flinders.timetable.getLocations(console.log);
// flinders.timetable.getSemesters(console.log);
// flinders.timetable.getAttendanceModes(console.log);
// flinders.timetable.getAvailableYears(console.log);
// flinders.timetable.getTopicSubjects(2016,console.log);
// flinders.timetable.searchTopics({
//     topicNumber: "1102",
//     subject: "BIOL",
//     year: 2016
// },console.log);
// flinders.timetable.getTimetable("2016","259976",console.log);

// flinders.timetable.timetableSearch({
//     topicNumber: "1102",
//     subject: "BIOL",
//     year: 2016
// },console.log);

// flinders.timetable.getTopicDetails("BIOL","1102","2016",console.log);

// flinders.lectures.getLecture("BIOL1102","2016",console.log);

flinders.hub.getMediaRoomStatus(console.log);

// console.log(flinders.bus.getBusLocation());

// TODO: make a fancy test suite
