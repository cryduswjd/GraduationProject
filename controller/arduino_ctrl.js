'use strict';

const arduinoDAO = require('../model/arduinoDAO');
const detectionDAO = require('../model/detectionDAO');
const sms = require('../middleware/sms');

async function arduinoPost(req, res) {
    try {
        const result = req.params.result;

        for(let i=1; i<100; i+=22) {
            let kind = result.substring(i,i+1);
            let detection = result.substring(i+2, i+14);
            let density = result.substring(i+15, i+16);
            let carID = result.substring(i+17, i+20);

            if (kind=="") break;

            if (kind=="A") kind = "음주";
            if (kind=="S") kind = "흡연";
            if (kind=="L") kind = "좌측 충돌";
            if (kind=="R") kind = "우측 충돌";

            let db_data = await arduinoDAO.dataSelect(carID);
            let carNum = db_data[0].carNum;

            let user = await arduinoDAO.userSelect(carNum);
            user = user[0].user;

            let parameters = { user, carNum, detection, kind, density };
            db_data = await arduinoDAO.dataInsert(parameters);
        }

        //db 조회후 3회 이상 누적시 관리자에게 sms 전송
        // db_data = await detectionDAO.Count_detectionResult_arduino(parameters)

        // if(db_data[0].cnt >= 3) await sms.sendVerificationSMS();
        
        res.send("Insert Success");
    } 
    catch (err) {
        console.log(err);
        res.send("Failed");
    }
}

module.exports = { arduinoPost }