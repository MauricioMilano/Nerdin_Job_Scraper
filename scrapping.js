const puppeteer = require('puppeteer');
const { wait } = require("./utils")
async function scrapeJobPostings(url) {
    const browser = await puppeteer.launch(); // You can add options here like headless: false to see the browser
    const page = await browser.newPage();
    await page.setViewport({
        width: 640,
        height: 10000,
        deviceScaleFactor: 1,
    })
    await page.goto(url);
    await wait(5000)
    // Wait for the element to be present, handling potential errors.  Adjust the selector if needed.
    await page.waitForSelector('#divListaVagas', { timeout: 10000 }) //10 second timeout
        .catch(error => {
            console.error("Error waiting for #divListaVagas:", error);
            browser.close();
            return null; //Return null if element not found
        });

    const vagas = await page.$('#divListaVagas');
    if (!vagas) {
        console.error("Element #divListaVagas not found.");
        browser.close();
        return null;
    }

    const ex_home = await page.evaluate((vagas) => {
        const children = [...vagas.children];
        return children.map(item => {
            try {
                //More robust error handling.  Check if children exist before accessing them.
                if (item.children && item.children[0] && item.children[0].children && item.children[0].children[0] && item.children[0].children[1]) {
                    return {
                        nome: item.children[0].children[0].children[0].innerText,
                        link: item.children[0].children[0].href,
                        local: item.children[0].children[1].innerText
                    };
                }
            } catch (error) {
                console.error("Error processing item:", error);
                return null;
            }
            return null;
        }).filter(e => e); //Filter out null values
    }, vagas);

    await browser.close();
    return ex_home;
}

module.exports = {
    scrapeJobPostings
}