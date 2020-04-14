const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

// WARNING: app.listen(80) will NOT work here!

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/index.html`);
});

io.on("connection", function (socket) {
  console.log("one user connected");
  socket.emit("news", { hello: "world" });
  socket.on("subscribe", function (data) {
    console.log(data);
  });
});

server.listen(process.env.PORT || 4001);
