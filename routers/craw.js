async function crawing() {
    const puppeteer = require("puppeteer");
    const broswer = await puppeteer.launch({
        headless : true //false : 크롬 실행, true : 내부적으로 크롬 실행
    });
    const page = await broswer.newPage();

    //컴퓨터공학과 공지사항 페이지로 이동합니다. 
    const link = "https://cse.inha.ac.kr/cse/888/subview.do";
    await page.goto(link);

    //공지사항 선택자를 정의합니다.
    const selector = "#menu888_obj410 > div._fnctWrap._articleTable > form:nth-child(2) > table > tbody > tr";

    //tr태그들을 순회하면서 strong태그를 만나면 arrayTitle배열에 push해서 저장한다.
    const posts = await page.$$(selector);
    let arrayTitles = [];
    for (const post of posts) {
        const title = await post.$eval('strong', (e) => e.innerText);
            arrayTitles.push(title);
            // console.log(title)
    }
    await broswer.close();
    return arrayTitles;
}

async function main(){
    const arrayTitles = await crawing();
    return arrayTitles;
}

module.exports = {
    main
}