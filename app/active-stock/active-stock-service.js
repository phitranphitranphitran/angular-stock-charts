import { symbols } from "../stock-data/config";

function ActiveStockService() {
  let activeStock = symbols[0];
  this.setActiveStock = (symbol) => {
    activeStock = symbol;
  };
  this.getActiveStock = () => {
    return activeStock;
  };
}

export default ActiveStockService;
