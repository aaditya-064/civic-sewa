import express from "express";
import {
  handleWebhook,
  apiDialogflow,
} from "../controller/webhook.controller.js";
import { checkToken, isAdmin } from "../middleware/auth.middleware.js";

const route = express.Router();

route.post("/webhook", handleWebhook);
route.post("/api/dialogflow", apiDialogflow);
// route.post("/login", loginMiddleware, logUser);

export default route;
