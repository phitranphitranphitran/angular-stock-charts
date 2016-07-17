export const symbols = ["XOM", "CVS", "NFLX", "TAP", "AAPL",
  "DIS", "RL", "ADBE", "DPS", "DLTR"];

// current time
export const endDate = new Date();

// one month before
export const startDate = new Date(endDate.getTime());
startDate.setUTCMonth(endDate.getUTCMonth() - 1);
