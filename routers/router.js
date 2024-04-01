const express = require('express'); //express:클래스
const router = express.Router(); //.Router()는 static 메서드함수(객체 없어도 호출가능)
const path = require('path');
const craw = require('./craw.js');

//nunjucks로 변경
router.get('/', async (req,res,next)=>{
    const arrayTitles = await craw.main();
    await res.render('main.html',{
            mainTitle:"change by nunjucks",
            titles : arrayTitles,
        })
})

module.exports = router; //router객체를 내보냅니다.