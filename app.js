const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv=require('dotenv'); //process.env관리 패키지
const path = require('path');

dotenv.config();
const router = require('./routers/router.js');
const app = express(); //express객체 생성 : app

app.set('port', process.env.PORT || 8001);

//미들웨어:요청-미들-중간, app.use(미들웨어), next는 내부적으로 호출된다.
//app.use(url, 미들웨어), url생략시 모든 페이지에서 미들웨어가 실행된다.
app.use(morgan('dev')); //morgan:요청과 응답 정보를 콘솔에 출력한다. dev, combined, common, short, tiny
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json()); //req.body 객체로 만들어준다.
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser(process.env.COOKIE_SECRET)); //req.cookies 객체로 만든다.(쿠기 생성은 아니다)
app.use(session({ //세션:사용자 정보 임시저장할 때 사용한다. 이때, 세션쿠키도 클라이언트에게 보내야한다.
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true, //클라이언트에서 쿠키 확인 불가.
        secure:false,
    },
    name:'session-cookie'
}))

app.use('/', router); //'/' url이 요청오면 router 미들웨어를 실행한다.

//호스팅
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기중...');
})