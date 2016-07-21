# Angular Stock Charts

App for viewing companies' stock price histories and additional info.

#### Setup and Installing

```
git clone https://github.com/phitranphitranphitran/angular-stock-charts
cd angular-stock-charts
npm install
npm start
```

Running in production env:
```
npm run simulate-prod
```

#### Libraries and Frameworks

AngularJS, Webpack (Babel ES6 transpiling and Sass preprocessing), Sass, Bootstrap, Highcharts

Data source: Yahoo Finance API

(Languages: HTML, CSS, JavaScript)

#### Features

- add new stocks to view data for
- optimizes requests for multiple stocks simultaneously
- persists added stocks to local browser storage
- sort table ascending/descending by symbol, company name, current price, market cap
- groups N/A fields together when ordering (Ex. when no data for market cap)
- search bar for filtering companies by name or symbol
- dynamic chart axes (thanks to Highcharts)
- toast messages for friendly UX
- app structure allows for adding new finance API data sources, although no user interface exposed for this yet, see readme file in `app/stock-data/api-utils`

#### Screenshots

![app screenshot](http://i.imgur.com/GwTXTCi.png)
