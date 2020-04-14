const DUMMY_DATE = "2017/07/26";

const current = () => {
  const serverTime = new Date();
  const dummyYear = parseInt(DUMMY_DATE.split("/")[0], 10);
  const dummyMonth = parseInt(DUMMY_DATE.split("/")[1], 10);
  const dummyDate = parseInt(DUMMY_DATE.split("/")[2], 10);
  serverTime.setFullYear(dummyYear);
  serverTime.setMonth(dummyMonth - 1);
  serverTime.setDate(dummyDate);
  return serverTime;
};

module.exports = { current };
