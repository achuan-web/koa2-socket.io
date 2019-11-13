const Koa = require("koa");
const app = new Koa();
const server = require("http").Server(app.callback());
const io = require("socket.io")(server);
const port = 7000;
const fs = require("fs");
server.listen(process.env.PORT || port, () => {
  console.log(`app run at : http://127.0.0.1:${port}`);
});
let data_ = {};
let path = "./data/user.json";
io.on("connection", socket => {
  console.log("初始化成功！下面可以用socket绑定事件和触发事件了");
  socket.on("send", data => {
    if (!data.name) return socket.emit("Error", "请输入名称");
    data_json = JSON.parse(fs.readFileSync(path));
    data_ = { id: Date.now(), ...data };
    console.log(data_);
    fs.writeFileSync(path, JSON.stringify(data_)); //把id数据写入json
    socket.emit("getMsg", data_);
  });
});
