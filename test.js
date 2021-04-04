const puppeteer = require('puppeteer');
const fs = require('fs-extra');

(async () => {

    const comments = [];
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    process.on("unhandledRejection", (reason, p) => {
        console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
        var formattedComments = comments.join("")

        fs.writeFileSync('comments.txt', formattedComments);
        browser.close();
    });
    await page.setViewport({ width: 1280, height: 800 });

    const navigationPromise = page.waitForNavigation();
    await page.goto('https://www.youtube.com/watch?v=NGPo8-9Z4Pw', {
        waitUntil: 'load',
        // Remove the timeout
        timeout: 0
    });



    await page.waitForSelector('h1.title');

    async function getElText(page, selector) {
        return await page.evaluate((selector) => {
            return document.querySelector(selector).innerText
        }, selector);
    }

    const filterNum = (str) => {
        const numericalChar = new Set([".", ",", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
        str = str.split("").filter(char => numericalChar.has(char)).join("");
        return str;
    }

    await page.evaluate(_ => {
        window.scrollBy(0, window.innerHeight);

    });
    await page.waitFor(2000);
    await page.waitForSelector('#comments');
    const commentSelector = "#count > yt-formatted-string"
    await page.waitForSelector(commentSelector)
    const noOfComments = await getElText(page, commentSelector)
    console.log(noOfComments)

    var correctComments = filterNum(noOfComments)
    while (correctComments.search(",") >= 0) {
        correctComments = (correctComments + "").replace(',', '');
    }
    console.log(correctComments)





    await navigationPromise;

    // Write your code here

    const distance = 800; // should be less than or equal to window.innerHeight
    const delay = 2;

    for (let i = 1; i < correctComments; i++) {
        console.log(i);
        const authorSelector = `.style-scope:nth-child(${i}) > #comment > #body > #main > #header > #header-author > #author-text > .style-scope`;
        console.log(authorSelector);
        const commentSelector = `.style-scope:nth-child(${i}) > #comment > #body > #main > #expander #content-text`;
        await page.waitForSelector(commentSelector);
        await page.waitForSelector(authorSelector);
        const commentText = await getElText(page, commentSelector);
        const stripped = commentText.replace(/^\s+|\s+$/gm, '');
        const author = await getElText(page, authorSelector);
        console.log(commentText)
        console.log(author)
        await page.evaluate((y) => { document.scrollingElement.scrollBy(0, y); }, distance);
        await page.waitFor(delay);

        if (commentText) {
            // write each comment to DB or file
            // or batch the for processing later
            console.log(`${author}: ${commentText}`);
            comments.push(author + ":" + stripped + "\n\n");

        }
    }



    var formattedComments = comments.join("")

    fs.writeFileSync('comments.txt', formattedComments);

    await browser.close();
})()