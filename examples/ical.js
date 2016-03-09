var icalendar = require("icalendar");
var moment = require("moment");
var flinders = require("../index.js");
var fs = require("fs");

var subjects = JSON.parse(fs.readFileSync("timetable.json"));
var ical = new icalendar.iCalendar();

var called = 0;
var toCall = subjects.length;

function finalise() {
    called++;
    if(called == toCall) {
        fs.writeFileSync("timetable.ical",ical.toString());
        console.log("wrote");
    }
}

for(var i=0;i < subjects.length;i++) {
    var subject = subjects[i];
    var subjectName = subject[0];
    var topicNumber = subject[1];

    flinders.timetable.searchTimetable({
        subject: subjectName,
        topicNumber: topicNumber,
        year: 2016
    },function(err,events) {
        for(var i2=0;i2 < events.length;i2++) {
            var eventData = events[i2];
            console.log(eventData);

            var startTime = moment(eventData.BOOKING_START_TIME,"HH:mm");
            var endTime = moment(eventData.BOOKING_END_TIME,"HH:mm");

            var startDate = moment(eventData.CPBOOKINGSTARTDATE,"MMMM, DD YYYY HH:mm:ss")
                .set('minute',startTime.get('minute'))
                .set('hour',startTime.get('hour'));
            var endDate = moment(eventData.BOOKING_END_DATE,"MMMM, DD YYYY HH:mm:ss")
                .set('minute',endTime.get('minute'))
                .set('hour',endTime.get('hour'));

            if(eventData.BOOKING_FREQUENCY == "weekly") {
                for (var m = startDate.clone(); m.isSameOrBefore(endDate); m.add('days', 7)) {
                    var event = new icalendar.VEvent();
                    event.setSummary(subjectName + topicNumber + " - " + eventData.ACTIVITY_NAME + "(" + eventData.CPCLASSNUMBER + ")");
                    event.setDate(
                        m.clone(),
                        m.clone()
                            .set('minute',endTime.get('minute'))
                            .set('hour',endTime.get('hour'))
                    );

                    ical.addComponent(event);
                }
            }
        }

        finalise();
    });
}
