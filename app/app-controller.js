import { symbols } from "./stock-data/config";

function AppController() {
  this.activeStock = symbols[0];
}

export default AppController;
