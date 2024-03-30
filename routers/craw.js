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
    let arrayTitle = [];
    for (const post of posts) {
        const title = await post.$eval('strong', (e) => e.innerText);
            arrayTitle.push(title);
            // console.log(title)
    }
    await broswer.close();
    return arrayTitle;
}

async function main(){
    let arrayTitle = await crawing();
    const h1 = document.querySelector('h1');
    for (let i = 0; i < arrayTitle.length; i++){
        const title = document.createElement('p');
        title.innerText = arrayTitle[i];
        h1.appendChild(title);
    }
}
