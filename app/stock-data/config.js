export const symbols = ["AAPL", "ADBE", "CVS", "DIS", "DLTR",
  "DPS", "NFLX", "RL", "TAP", "XOM"];

export const endDate = new Date();

// one month before
export const startDate = new Date(endDate.getTime());
startDate.setUTCMonth(endDate.getUTCMonth() - 1);
