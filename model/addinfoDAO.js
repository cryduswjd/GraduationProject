"use strict";

const {db} = require("../config/dbconn");

function infoInsert(parameters) {
    return new Promise((resolve, reject) => {
        const queryData = `INSERT INTO renterInfo(user, carNum, rentDay) values (?, ?, ?);`;
        db.query(queryData, [parameters.user, parameters.carNum, parameters.dateFormat], (err, db_data) => {
            if(err) reject(err);
            else resolve(db_data);
        });
    });
}

module.exports = {
    infoInsert
}