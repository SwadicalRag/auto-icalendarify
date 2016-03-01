'use strict';

class Semester {
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

module.exports = Semester;
