import { symbols } from "../stock-data/config";

function ActiveStockService($rootScope, addStockEvent) {
  let activeStock = symbols[0];

  this.setActiveStock = (symbol) => {
    activeStock = symbol;
  };

  this.getActiveStock = () => {
    return activeStock;
  };
  
  addStockEvent.listen($rootScope, (event, symbol) => {
    this.setActiveStock(symbol);
  });
}

ActiveStockService.$inject = ["$rootScope", "addStockEvent"];

export default ActiveStockService;
