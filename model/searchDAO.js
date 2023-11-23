"use strict";

const {db} = require("../config/dbconn");

function searchResultPost(parameters) {
    return new Promise((resolve, reject) => {
        let like = "%" + parameters + "%";
        const queryData = `SELECT user, carNum, rentDay FROM renterInfo WHERE (carNum like ? OR user like ?)`;
        db.query(queryData, [like, parameters], (err, db_data) => {
            if(err) reject(err);
            else resolve(db_data);
        });
    });
}

function searchResultGet(parameters) {
    return new Promise((resolve, reject) => {
        let like = "%" + parameters.keyword + "%";
        const queryData = `SELECT user, carNum, rentDay FROM renterInfo WHERE (carNum like ? OR user like ?) LIMIT ?, ?`;
        db.query(queryData, [like, parameters.keyword, parameters.offset, parameters.limit], (err, db_data) => {
            if(err) reject(err);
            else resolve(db_data);
        });
    });
}

module.exports = {
    searchResultPost,
    searchResultGet
}