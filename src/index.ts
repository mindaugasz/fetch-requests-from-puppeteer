import puppeteerExtra from 'puppeteer-extra';
import puppeteerStealth from 'puppeteer-extra-plugin-stealth';
import puppeteer from 'puppeteer';

(async () => {
    const params = {
        "pagination": {},
        "usersSearchTerm": "Atlanta, GA",
        mapBounds: {
            "west": -84.4672891672287,
            "east": -84.46043344098663,
            "south": 33.748821523776016,
            "north": 33.752157846955676
        },
        "mapZoom": 18,
        "isMapVisible": true,
        "filterState": {
            "isAllHomes": {
                "value": true
            }
        },
        "isListVisible": true
    };

    const wants = {
        "cat1": ["listResults", "mapResults"], "cat2": ["total"]
    };
    // puppeteerExtra.use(puppeteerStealth());

    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--window-size=1920,1080',
        ]
    });
    const page = await browser.newPage();

    const url = `https://www.zillow.com/atlanta-ga`;

    await page.goto(url);

    console.log('params', params);
    const json: any = await page.evaluate(async (params, wants) => {
        return await new Promise(async (resolve, reject) => {
            const response = await fetch(`https://www.zillow.com/search/GetSearchPageState.htm?searchQueryState=${encodeURIComponent(JSON.stringify(params))}&wants=${encodeURIComponent(JSON.stringify(wants))}&requestId=6`, {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
                    "cache-control": "no-cache",
                    "pragma": "no-cache",
                    "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin"
                },
                "referrerPolicy": "unsafe-url",
                "body": null,
                "method": "GET",
                "mode": "cors",
                "credentials": "include"
            });
            const json = await response.json();
            console.log('json', json);

            return resolve(json);
        });
    }, params, wants);
    let mapResults: any[] = json?.cat1?.searchResults?.mapResults;
    console.log('map results', mapResults[22], mapResults?.length);

    await page.waitForTimeout(10000);
    await browser.close();

    return mapResults;
})();