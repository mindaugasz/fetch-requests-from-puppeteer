import puppeteerExtra from 'puppeteer-extra';
import puppeteerStealth from 'puppeteer-extra-plugin-stealth';
import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--window-size=1920,1080',
        ]
    });
    const page = await browser.newPage();

    const url = `https://www.realtor.com/realestateandhomes-search/Okemos_MI?view=map&pos=42.749998,-84.652429,42.660687,-84.158044,11`;

    await page.goto(url);

    const json: any = await page.evaluate(async () => {
        return await new Promise(async (resolve, reject) => {
            const response = await fetch("https://www.realtor.com/api/v1/hulk?client_id=rdc-x&schema=vesta", {
                "headers": {
                  "accept": "application/json",
                  "accept-language": "en-US,en;q=0.9",
                  "content-type": "application/json",
                  "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
                  "sec-ch-ua-mobile": "?0",
                  "sec-ch-ua-platform": "\"macOS\"",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin",
                  "Referer": "https://www.realtor.com/realestateandhomes-search/Okemos_MI?view=map&pos=42.749982,-84.652429,42.660671,-84.158045,11",
                  "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                "body": "{\"query\":\"\\nquery ConsumerSearchQuery($query: HomeSearchCriteria!, $limit: Int, $offset: Int, $sort: [SearchAPISort], $sort_type: SearchSortType, $client_data: JSON, $bucket: SearchAPIBucket)\\n{\\n  home_search: home_search(query: $query,\\n    sort: $sort,\\n    limit: $limit,\\n    offset: $offset,\\n    sort_type: $sort_type,\\n    client_data: $client_data,\\n    bucket: $bucket,\\n  ){\\n    count\\n    total\\n    results {\\n      property_id\\n      list_price\\n      primary_photo (https: true){\\n        href\\n      }\\n      listing_id\\n      virtual_tours{\\n        href\\n        type\\n      }\\n      status\\n      permalink\\n      price_reduced_amount\\n      description{\\n        beds\\n        baths\\n        baths_full\\n        baths_3qtr\\n        baths_half\\n        sqft\\n        lot_sqft\\n        baths_max\\n        baths_min\\n        beds_max\\n        sqft_min\\n        sqft_max\\n        type\\n        sold_price\\n        sold_date\\n      }\\n      location{\\n        street_view_url\\n        address{\\n          line\\n          postal_code\\n          state\\n          state_code\\n          city\\n          coordinate {\\n            lat\\n            lon\\n          }\\n        }\\n      }\\n      open_houses {\\n        start_date\\n        end_date\\n      }\\n      flags{\\n        is_coming_soon\\n        is_new_listing (days: 14)\\n        is_price_reduced (days: 30)\\n        is_foreclosure\\n        is_new_construction\\n        is_pending\\n        is_contingent\\n      }\\n      list_date\\n      photos(limit: 1, https: true){\\n        href\\n      }\\n    }\\n  }\\n}\",\"variables\":{\"query\":{\"status\":[\"for_sale\",\"ready_to_build\"],\"primary\":true,\"search_location\":{\"location\":\"Okemos, MI\"},\"boundary\":{\"type\":\"Polygon\",\"coordinates\":[[[-84.652429,42.749965],[-84.158045,42.749965],[-84.158045,42.660654],[-84.652429,42.660654],[-84.652429,42.749965]]]}},\"client_data\":{\"device_data\":{\"device_type\":\"web\"},\"user_data\":{\"last_view_timestamp\":-1}},\"limit\":200,\"offset\":0,\"zohoQuery\":{\"silo\":\"search_result_page\",\"location\":\"Okemos, MI\",\"property_status\":\"for_sale\",\"filters\":{}},\"sort_type\":\"relevant\",\"geoSupportedSlug\":\"Okemos_MI\",\"bucket\":{\"sort\":\"modelF\"},\"zoom\":11,\"by_prop_type\":[\"home\"]},\"callfrom\":\"SRP\",\"nrQueryType\":\"MAP_MAIN_SRP\",\"isClient\":true}",
                "method": "POST"
              });
            const json = await response.json();
            console.log('json', json);

            return resolve(json);
        });
    });

    let mapResults: any[] = json;
    const homeSearch = mapResults["data"]["home_search"];
    const total = homeSearch["total"];
    const results = homeSearch["results"];
    console.log('map results', total, results);

    await page.waitForTimeout(10000);
    await browser.close();

    return mapResults;
})();