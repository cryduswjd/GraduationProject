"use strict";

const {db} = require("../config/dbconn");

// main get with paging
function All_searchResult(parameters) {
    return new Promise((resolve, reject) => {
        const queryData = `SELECT user, carNum, rentDay FROM renterInfo ORDER BY ID DESC LIMIT ?, ?`;
        db.query(queryData, [parameters.offset, parameters.limit], (err, db_data) => {
            if(err) reject(err);
            else resolve(db_data);
        });
    });
}

function searchResult(parameters) {
    return new Promise((resolve, reject) => {
        const queryData = `SELECT user, carNum, rentDay FROM renterInfo WHERE carNum = ?`;
        db.query(queryData, [parameters], (err, db_data) => {
            if(err) reject(err);
            else resolve(db_data);
        });
    });
}
module.exports = {
    All_searchResult,
    searchResult
}