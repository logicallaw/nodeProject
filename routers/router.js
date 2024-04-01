const express = require('express'); //express:클래스
const router = express.Router(); //.Router()는 static 메서드함수(객체 없어도 호출가능)
const path = require('path');


//nunjucks로 변경
router.get('/', async (req,res,next)=>{
    const crawling = require('./craw.js');
    console.log(crawling, 'router.js');
    res.render('main',{
            mainTitle:"change by nunjucks",
        })
})

module.exports = router; //router객체를 내보냅니다.