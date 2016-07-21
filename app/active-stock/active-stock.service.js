import { symbols } from "../stock-data/config";

function ActiveStockService(addStockEvent) {
  let activeStock = symbols[0];

  this.setActiveStock = (symbol) => {
    activeStock = symbol;
  };

  this.getActiveStock = () => {
    return activeStock;
  };

  addStockEvent.listen(false, (event, symbol) => {
    this.setActiveStock(symbol);
  });
}

ActiveStockService.$inject = ["addStockEvent"];

export default ActiveStockService;
