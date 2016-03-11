'use strict';

let request = require("request");

let endpoint1 = "http://www.flinders.edu.au/webapps/stusys/index.cfm/timetable/";
let endpoint2 = "http://www.flinders.edu.au/webapps/stusys/index.cfm/timetabletopic/";
let endpoint3 = "http://www.flinders.edu.au/webapps/stusys/index.cfm/common/";
let endpoint4 = "http://www.flinders.edu.au/webapps/stusys/index.cfm/topic/";

function getLocations(callback) {
    request({
        method: "GET",
        uri: endpoint1 + "getOptions",
        qs: {
            format: "json",
            type: "location"
        }
    },function(err,res,body) {
        if(err) {
            callback(err,[]);
        }
        else {
            if(res.statusCode == 200) {
                try {
                    let data = JSON.parse(body);
                    if(data.SUCCESS == 1) {
                        callback(null,data.OPTIONLIST.OPTIONS);
                    }
                    else {
                        callback(data.EXCEPTION.Message,data);
                    }
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

function getSemesters(callback) {
    request({
        method: "GET",
        uri: endpoint1 + "getOptions",
        qs: {
            format: "json",
            type: "sprd_cd"
        }
    },function(err,res,body) {
        if(err) {
            callback(err,[]);
        }
        else {
            if(res.statusCode == 200) {
                try {
                    let data = JSON.parse(body);
                    if(data.SUCCESS == 1) {
                        callback(null,data.OPTIONLIST.OPTIONS);
                    }
                    else {
                        callback(data.EXCEPTION.Message,data);
                    }
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

function getAttendanceModes(callback) {
    request({
        method: "GET",
        uri: endpoint1 + "getOptions",
        qs: {
            format: "json",
            type: "attndc_mode_cd"
        }
    },function(err,res,body) {
        if(err) {
            callback(err,[]);
        }
        else {
            if(res.statusCode == 200) {
                try {
                    let data = JSON.parse(body);
                    if(data.SUCCESS == 1) {
                        callback(null,data.OPTIONLIST.OPTIONS);
                    }
                    else {
                        callback(data.EXCEPTION.Message,data);
                    }
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

function getAvailableYears(callback) {
    request({
        method: "GET",
        uri: endpoint2 + "getYearOptions",
        qs: {
            format: "json",
            intendedfor: "TIMETABLE",
            test: ""
        }
    },function(err,res,body) {
        if(err) {
            callback(err,[]);
        }
        else {
            if(res.statusCode == 200) {
                try {
                    let data = JSON.parse(body);
                    if(data.SUCCESS == 1) {
                        callback(null,data.OPTIONLIST.OPTIONS);
                    }
                    else {
                        callback(data.EXCEPTION.Message,data);
                    }
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

function getTopicSubjects(year,callback) {
    request({
        method: "GET",
        uri: endpoint3 + "getTopicSubjects",
        qs: {
            format: "json",
            tpyear: year
        }
    },function(err,res,body) {
        if(err) {
            callback(err,[]);
        }
        else {
            if(res.statusCode == 200) {
                try {
                    let data = JSON.parse(body);
                    if(data.SUCCESS == 1) {
                        callback(null,data.OPTIONLIST.OPTIONS);
                    }
                    else {
                        callback(data.EXCEPTION.Message,data);
                    }
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

function getTopicDetails(subject,topicNumber,year,callback) {
    request({
        method: "GET",
        uri: endpoint4 + "getTopicDetails",
        qs: {
            format: "json",
            avkeynumber: "",
            tdtopicnumber: topicNumber,
            tdtopicsubject: subject,
            tdyear: year,
            test: ""
        }
    },function(err,res,body) {
        if(err) {
            callback(err,[]);
        }
        else {
            if(res.statusCode == 200) {
                try {
                    let data = JSON.parse(body);
                    if(data.SUCCESS == 1) {
                        callback(null,data.TOPIC[0]);
                    }
                    else {
                        callback(data.EXCEPTION.Message,data);
                    }
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

function searchTopics(query,callback) {
    if(!query.year) {
        return callback("'year' parameter in query object missing!");
    }

    request({
        method: "GET",
        uri: endpoint1 + "getAvailabilities",
        useQuerystring: true,
        qs: {
            format: "json",
            avattendmode: query.attendanceMode || "",
            avlocationmatch: query.location || "",
            avkeynumber: query.keyNumber || "",
            avsemester: query.semester || "",
            avtopicnumber: query.estimateTopicNumber || "",
            avtopicnumberexact: query.topicNumber || "",
            avtopicsubject: query.subject || "",
            avyear: query.year || "",
            page: query.page || 1,
            recordsperpage: query.recordsPerPage || 15,
            test: ""
        }
    },function(err,res,body) {
        if(err) {
            callback(err,[]);
        }
        else {
            if(res.statusCode == 200) {
                try {
                    let data = JSON.parse(body);
                    if(data.SUCCESS == 1) {
                        callback(null,data.AVAILABILITYLIST.AVAILABILITIES);
                    }
                    else if(data.SUCCESS == 2) {
                        callback(null,[]);
                    }
                    else {
                        callback(data.EXCEPTION.Message,data);
                    }
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

function getTimetable(year,topicid,callback) {
    request({
        method: "GET",
        uri: endpoint1 + "getTimetable",
        qs: {
            format: "json",
            avyear: year,
            cpkeynumber: topicid,
            test: ""
        }
    },function(err,res,body) {
        if(err) {
            callback(err,[]);
        }
        else {
            if(res.statusCode == 200) {
                try {
                    let data = JSON.parse(body);
                    if(data.SUCCESS == 1) {
                        callback(null,data.CLASSLIST.CLASSES);
                    }
                    else {
                        callback(data.EXCEPTION.Message,data);
                    }
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



function searchTimetable(query,callback) {
    searchTopics(query,function(err,topics) {
        if(err) {
            callback(err);
        }
        else {
            if(topics[0]) {
                getTimetable(query.year,topics[0].AVKEYNUMBER,callback);
            }
            else {
                callback("No topics found");
            }
        }
    });
}

module.exports = {
    getLocations: getLocations,
    getSemesters: getSemesters,
    getAttendanceModes: getAttendanceModes,
    getAvailableYears: getAvailableYears,
    getTopicSubjects: getTopicSubjects,
    searchTopics: searchTopics,
    getTimetable: getTimetable,
    searchTimetable: searchTimetable,
    getTopicDetails: getTopicDetails
};
