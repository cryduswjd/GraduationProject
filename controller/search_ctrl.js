'use strict';

const searchDAO = require('../model/searchDAO');
const paging = require('../middleware/paging');

async function searchGet(req, res) {
    try {
        let currentPage = req.query.page;
        const pageSize = 12;
        const page = paging(currentPage, pageSize);

        const parameters = {
            keyword: req.query.keyword,
            offset: page.offset,
            limit: page.limit
        };

        const db_data = await searchDAO.searchResultGet(parameters);

        res.status(200).json(db_data);
    } 
    catch (err) {
        console.log(err);
        res.send("Failed");
    }
}

async function searchPost(req, res) {
    try {
        const parameters = req.body.keyword;

        const db_data = await searchDAO.searchResultPost(parameters);

        if(db_data) res.send({ result: "일치하는 결과가 있습니다." });
        else res.send({ result: "일치하는 결과가 없습니다."});
    } 
    catch (err) {
        console.log(err);
        res.send("Failed");
    }
}

module.exports= {
    searchGet,
    searchPost
}