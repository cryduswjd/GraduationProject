"use strict";

const {db} = require("../config/dbconn");

function dataSelect(parameters) {
    return new Promise((resolve, reject) => {
        const queryData = `SELECT carNum FROM carInfo WHERE ID = ?`;
        db.query(queryData, [parameters], (err, db_data) => {
            if(err) reject(err);
            else resolve(db_data);
        });
    });
}

function userSelect(parameters) {
    return new Promise((resolve, reject) => {
        const queryData = `SELECT user FROM renterInfo WHERE carNum = ? ORDER BY rentDay DESC LIMIT 1`;
        db.query(queryData, [parameters], (err, db_data) => {
            if(err) reject(err);
            else resolve(db_data);
        });
    });
}

function dataInsert(parameters) {
    return new Promise((resolve, reject) => {
        const queryData = `INSERT INTO detectionInfo(user, carNum, detection, kind, density) values(?, ?, ?, ?, ?)`;
        db.query(queryData, [parameters.user, parameters.carNum, parameters.detection, parameters.kind, parameters.density], (err, db_data) => {
            if(err) reject(err);
            else resolve(db_data);
        });
    });
}

module.exports = { 
    dataSelect,
    userSelect,
    dataInsert };