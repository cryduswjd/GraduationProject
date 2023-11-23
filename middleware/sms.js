'use strict';

const CryptoJS = require("crypto-js");
const axios = require("axios");

module.exports = {
    sendVerificationSMS: async (req, res) => {
        try {
            // 환경 변수
            const sens_service_id = process.env.Service_ID;
            const sens_access_key = process.env.Access_ID;
            const sens_secret_key = process.env.Secret_Key;
            const sens_call_number = process.env.CallNumber;

            const user_phone_number = sens_call_number;
            // const verificationCode = createRandomNumber(6); // 인증 코드 (6자리 숫자)
            const date = Date.now().toString(); // 날짜 string
    
            // url 관련 변수 선언
            const method = "POST";
            const space = " ";
            const newLine = "\n";
            const url = `https://sens.apigw.ntruss.com/sms/v2/services/${sens_service_id}/messages`;
            const url2 = `/sms/v2/services/${sens_service_id}/messages`;
    
            // signature 작성 : crypto-js 모듈을 이용하여 암호화
            const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, sens_secret_key);
            hmac.update(method);
            hmac.update(space);
            hmac.update(url2);
            hmac.update(newLine);
            hmac.update(date);
            hmac.update(newLine);
            hmac.update(sens_access_key);
            const hash = hmac.finalize();
            const signature = hash.toString(CryptoJS.enc.Base64);
    
            // sens 서버로 요청 전송
            const smsRes = await axios({
            method: method,
            url: url,
            headers: {
                "Contenc-type": "application/json; charset=utf-8",
                "x-ncp-iam-access-key": sens_access_key,
                "x-ncp-apigw-timestamp": date
                ,
                "x-ncp-apigw-signature-v2": signature,
            },
            data: {
                type: "SMS",
                countryCode: "82",
                from: sens_call_number,
                content: `메세지 테스트.`,
                messages: [{ to: `${user_phone_number}` }],
            },
            });
        } catch (err) {
            console.log(err);
            res.send("Failed");
        }
    },
};