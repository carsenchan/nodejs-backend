const moment = require("moment");

const fs = require("fs");
const path = require("path");

const allData = () => {
  const rawdata = fs.readFileSync(path.join(__dirname, "tickData.json"));
  const result = JSON.parse(rawdata);
  return result;
};

const getCurrentTickByTicker = (tickerName, currentTime) => {
  const data = allData();
  const ticker = data.find((tickerData) => tickerData.ticker === tickerName);
  if (!ticker) return undefined;

  const ticks = ticker.ticks.filter(
    (currentTick) =>
      moment(currentTick.time, "DD/MM/YYYY HH:mm:ss:S").toDate() > currentTime
  );
  if (ticks.length === 0) return undefined;

  return {
    ticker: ticker.ticker,
    companyName: ticker.companyName,
    ...ticks[0],
  };
};

module.exports = {
  allData,
  getCurrentTickByTicker,
};
