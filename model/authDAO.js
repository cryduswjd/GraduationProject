"use strict";

const {db} = require("../config/dbconn");

function userInfo(parameters) {
    return new Promise((resolve, reject) => {
        const queryData = `SELECT * FROM adminInfo WHERE adminID = ? AND adminPW = ?`;
        db.query(queryData, [parameters.id, parameters.pw], (err, db_data) => {
            if(err) reject(err);
            else resolve(db_data);
        });
    });
}

module.exports = {
    userInfo
}