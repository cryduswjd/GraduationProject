'use strict';

const addinfoDAO = require('../model/addinfoDAO');

async function addPost(req, res) {
    try {
        const user = req.body.user;
        const carNum = req.body.carNum;
        let date = req.body.date;

        let year = ""; let month = ""; let day = "";
        let dateFormat = "";

        year = date.substring(0,4);
        month = date.substring(4, 6);
        day = date.substring(6, 8);

        dateFormat = year + "-" + month + "-" + day;

        const parameters = { user, carNum, dateFormat };

        const db_data = await addinfoDAO.infoInsert(parameters);

        res.send({ result: "Success"});
    }
    catch (err) {
        console.log(err);
        res.send("Failed");
    }
}

module.exports = {
    addPost
}