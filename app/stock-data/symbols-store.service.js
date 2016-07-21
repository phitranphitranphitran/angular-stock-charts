import { symbols as defaultSymbols } from "./config";

function SymbolsStoreService(toastr) {
  let symbols;

  try {
    symbols = JSON.parse(localStorage.getItem("symbols")) || defaultSymbols;
  } catch (e) {
    toastr.warning("Unable to get saved stocks from local storage");
    symbols = defaultSymbols;
    localStorage.setItem("symbols", JSON.stringify(symbols));
  }

  this.getSymbols = () => {
    return symbols;
  };

  this.addSymbol = (symbol) => {
    symbols.push(symbol);
    localStorage.setItem("symbols", JSON.stringify(symbols));
  };
}

SymbolsStoreService.$inject = ["toastr"];

export default SymbolsStoreService;
