import express from "express";
import {
  handleWebhook,
  apiDialogflow,
} from "../controller/webhook.controller.js";
import { checkToken, isAdmin } from "../middleware/auth.middleware.js";
import { getAccessToken } from "../controller/dialogflow.controller.js";

const route = express.Router();

route.post("/webhook", handleWebhook);
route.post("/api/dialogflow", apiDialogflow);
route.get("/token", getAccessToken);

export default route;
