import express from "express";
import config from "./config/config.js";
import http from "http";
import db from "./config/db.js";
import morgan from "morgan";
import authRouter from "./router/auth.routes.js";

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("hello from this server");
});

db.then(() => {
  console.log("DATABASE CONNECTED");
}).catch((err) => {
  console.log(err);
});

server.listen(
  config.PORT,
  console.log(`SERVER IS RUNNING AT PORT ${config.PORT}`)
);
