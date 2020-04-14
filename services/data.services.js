const moment = require("moment");

const fs = require("fs");
const path = require("path");

const allData = () => {
  const rawdata = fs.readFileSync(path.join(__dirname, "tickData.json"));
  const result = JSON.parse(rawdata);
  return result;
};

const getAllTickers = () => {
  const data = allData();
  return data.map((current) => ({
    companyName: current.companyName,
    ticker: current.ticker,
  }));
};

const convertTime = (string) => {
  const datePart = string.split(" ")[0];
  const timePart = string.split(" ")[1].split(".")[0];
  const newDate = new Date();
  newDate.setFullYear(parseInt(datePart.split("/")[2], 10));
  newDate.setMonth(parseInt(datePart.split("/")[1], 10) - 1);
  newDate.setDate(parseInt(datePart.split("/")[0], 10));
  newDate.setHours(parseInt(timePart.split(":")[0], 10));
  newDate.setMinutes(parseInt(timePart.split(":")[1], 10));
  newDate.setSeconds(parseInt(timePart.split(":")[2], 10));
  return newDate;
};

const getCurrentTickByTicker = (tickerName, currentTime) => {
  const data = allData();
  const ticker = data.find((tickerData) => tickerData.ticker === tickerName);
  if (!ticker) return undefined;

  const ticks = ticker.ticks.filter((currentTick) => {
    // const datePart = currentTick.time.split(" ")[0];
    // const timePart = currentTick.time.split(" ")[1].split(".")[0];
    // const newDate = new Date();
    // newDate.setFullYear(parseInt(datePart.split("/")[2], 10));
    // newDate.setMonth(parseInt(datePart.split("/")[1], 10) - 1);
    // newDate.setDate(parseInt(datePart.split("/")[0], 10));
    // newDate.setHours(parseInt(timePart.split(":")[0], 10));
    // newDate.setMinutes(parseInt(timePart.split(":")[1], 10));
    // newDate.setSeconds(parseInt(timePart.split(":")[2], 10));
    const newDate = convertTime(currentTick.time);
    return newDate.getTime() > currentTime.getTime();
  });

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
  convertTime,
  getAllTickers,
};
