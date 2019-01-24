import _ from "lodash";
import { extractData as originalExtractData } from "../yahoo";
import { symbols } from "../../config";
import quotesMockResData from "./quotes.mock.json";
import historiesMockResData from "./histories.mock.json";

export const sendRequest = ($http, $q) => (desiredSymbols) => {
  if (desiredSymbols.length > 1) {
    // Initial load
    return $q.resolve([{ data: quotesMockResData }, { data: historiesMockResData }]);
  }
  // User wants to add a stock, add a random mock one
  const desiredSymbol = desiredSymbols[0];
  const randomSymbol = _.sample(symbols);
  let randomSymbolQuote = quotesMockResData.query.results.quote.find(quote => quote.symbol === randomSymbol);
  randomSymbolQuote = _.cloneDeep(randomSymbolQuote); // Avoid mutating original mock json
  randomSymbolQuote.symbol = randomSymbolQuote.Symbol = desiredSymbol;

  const randomSymbolHistory = historiesMockResData.query.results.quote
    .filter(quote => quote.Symbol === randomSymbol)
    .map(quote => Object.assign({}, quote, { Symbol: desiredSymbol }));
  
  const quoteResData = _.cloneDeep(quotesMockResData);
  _.set(quoteResData, "query.results.quote", randomSymbolQuote);

  const historyResData = _.cloneDeep(historiesMockResData);
  _.set(historyResData, "query.results.quote", randomSymbolHistory );

  return $q.resolve([{ data: quoteResData }, { data: historyResData }]);
};

export const extractData = originalExtractData;