# Fetch Requests from Within Puppeteer

This goes through an example of how to use fetch from within Puppeteer. This is extremely handy when you're trying to get data from unpublished APIs that are pretty well bot protected.

`Puppeteer-extra` with `puppeteer-extra-plugin-stealth` may be helpful here.

## Getting Started

Clone the repository and run `npm i`.

`npm run zillow` to scrape zillow.com
`npm run realtor` to scrape realtor.com


### Prerequisites

Tested on Node v16.13.2 and NPM v8.1.2

### Installing

After installing [NodeJS](https://nodejs.org/en/) you should be able to just run the following in the terminal.

```
npm i
```

## Built With

* [puppeteer](https://github.com/puppeteer/puppeteer) - Puppeteer
* [puppeteer-extra](https://github.com/berstend/puppeteer-extra#readme) - Puppeteer-extra
* [puppeteer-extra-plugin-stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth#readme) - Puppeteer stealth

## Authors

* **Jordan Hansen** - *Initial work* - [Jordan Hansen](https://github.com/aarmora)


## License

This project is licensed under the ISC License