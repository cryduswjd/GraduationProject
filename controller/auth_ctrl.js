"use strict";

const jwtmiddle = require("../middleware/jwt");
const authDAO = require("../model/authDAO");

async function signIn(req, res) {
    try {
        const token = req.get('token');
        let userID = "";
        console.log(token)

        if (token == undefined) {
        return res.send("접근할수 없습니다.");
        }
        if (req.cookies.user !== undefined) {
        userID = req.cookies["user"];
        }

        res.render("/sign/in", { result: userID });
    } catch (err) {
        console.log(err);
        res.send("Failed");
    }
}

async function checkUser(req, res) {
    try {
        const special_pattern = /[` ~!@#$%^&*|\\\'\";:\/?]/gi;

        if (special_pattern.test(req.body.user) || req.body.adminID == undefined || req.body.adminPW == undefined || req.body.adminID == " " ||
        req.body.adminPW == " " || req.body.adminID == null || req.body.adminPW == null) {
            res.send({ result: "잘못된 값을 입력하였습니다." });
        } 
        else {
            const id = req.body.adminID;
            const pw = req.body.adminPW;

            const parameters = { id, pw };

            const db_data = await authDAO.userInfo(parameters);

            if (db_data) {
                const accessToken = await jwtmiddle.jwtCreate(parameters.id);
                return res.send({ accessToken });
            } else {
                res.send({ result: "아이디 혹은 비밀번호가 틀렸습니다." });
            }
        }
    } catch (err) {
        console.log(err);
        res.send("Failed");
    }
}

//get
async function revise_check(req, res) {
    try {
        const token = req.body.user;

        const permission = await jwtmiddle.jwtCreate(token);
        res.send({ result: permission });
    } catch (err) {
        console.log(err);
        res.send("Failed");
    }
}

//post
async function revise_check_post(req, res) {
    try {
        const token = req.body.user;

        const permission = await jwtmiddle.jwtCerti(token);

        if (permission != false) res.send({ result: permission });
        else res.send({ result: "세션이 만료되었습니다. " });
    } catch (err) {
        console.log(err);
        res.send("Failed");
    }
}

async function logOut(req, res) {
    try {
        res.clearCookie("user");
        res.redirect("/auth/sign/in");
    } catch (err) {
        res.send("Failed");
    }
}

module.exports = {
  signIn,
  checkUser,
  revise_check,
  revise_check_post,
  logOut,
};