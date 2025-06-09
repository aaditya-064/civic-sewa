import "dotenv/config";
import express from "express";
import config from "./config/config.js";
import http from "http";
import db from "./config/db.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./router/auth.routes.js";
import hookRouter from "./router/webhook.routes.js";

var whitelist = [
  "http://localhost:5173",
  "https://dialogflow.googleapis.com",
  "https://civic-sewa.onrender.com",
  null,
];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan("dev"));

// Mount routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/hook", hookRouter);

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Server is running");
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
