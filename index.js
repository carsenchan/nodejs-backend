const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const {
  getAllTickers,
  getCurrentTickByTicker,
} = require("./services/data.services");
const { current } = require("./config/time.config");

// For Restful API usage
app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

// temp stock arary
// eslint-disable-next-line prefer-const
let stocks = [];

const isAvailabelTicker = (tickerName) => {
  const allTickers = getAllTickers();
  const findIndex = allTickers.findIndex(
    (ticker) => ticker.ticker === tickerName
  );
  return findIndex !== -1;
};

const addToStocks = (tickerName) => {
  const findIndex = stocks.findIndex((ticker) => {
    return ticker === tickerName;
  });

  if (findIndex === -1) {
    stocks.push(tickerName);
  }
};

io.on("connection", (socket) => {
  socket.on("subscribe", (data) => {
    const reqData = data;

    if (reqData.stocks && Array.isArray(reqData.stocks)) {
      reqData.stocks.forEach((stock) => {
        if (isAvailabelTicker(stock)) {
          addToStocks(stock);
        }
      });
    }
    // if socket exsite, add to stocks []
    // send update price per second
    // console.log(stocks);
    // stocks.forEach((tickName) => {
    //   console.log(tickName);
    //   console.log({ current: current() });
    //   const tick = getCurrentTickByTicker(tickName, current());
    //   const msg = Object.values(tick).join("|||");
    //   console.log(msg);
    //   io.emit("subscribe", msg);
    // });
    setInterval(() => {
      stocks.forEach((tickName) => {
        const tick = getCurrentTickByTicker(tickName, current());
        const msg = Object.values(tick).join("|||");

        io.emit("subscribe", msg);
      });
    }, 1000);
  });

  socket.on("unsubscribe", (data) => {
    console.log(JSON.parse(data));
    // if socket exsite in stocks [], remove it
  });
});

server.listen(process.env.PORT || 4001);
