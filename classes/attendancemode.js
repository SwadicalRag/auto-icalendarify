'use strict';

class AttendanceMode {
    constructor(data) {
        this.data = data;
    }

    getID() {
        return this.data.ID;
    }

    getName() {
        return this.data.DESCRIPTION;
    }
}

module.exports = AttendanceMode;
