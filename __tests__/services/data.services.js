const {
  getCurrentTickByTicker,
  allData,
  convertTime,
} = require("../../services/data.services");
const { current } = require("../../config/time.config");

describe("Get data from json file", () => {
  it("Read stock data", () => {
    const data = allData();
    expect(Array.isArray(data)).toEqual(true);
  });
});

describe("Get stock data", () => {
  it("Should be undefined while stock name not existed", () => {
    const tick = getCurrentTickByTicker("700", current());
    expect(tick).toEqual(undefined);
  });

  it("Should be undefined while time is not existed", () => {
    const tick = getCurrentTickByTicker("VOD LN", new Date());
    expect(tick).toEqual(undefined);
  });
});

describe("Covert Date string", () => {
  it("Should be a date", () => {
    const testingDateString = "26/07/2019 10:02:35.648";
    const newDate = convertTime(testingDateString);
    console.log(newDate > new Date("2017/07/01 11:03:22"));
    expect(typeof newDate).toEqual(typeof new Date());
  });
});
