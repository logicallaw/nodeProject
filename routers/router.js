const express = require('express'); //express:클래스
const router = express.Router(); //.Router()는 static 메서드함수(객체 없어도 호출가능)
const path = require('path')

router.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '../views/main.html'))
})

module.exports = router; //router객체를 내보냅니다.