import { SessionsClient } from "@google-cloud/dialogflow";
import convoModel from "../model/conversation.model.js";
import path from "path";

const sessionClient = new SessionsClient({
  keyFilename: "./utils/key.json",
});

const projectId = "cicsev-ohcp";

const checkEligibility = (licenseType, age) => {
  if (licenseType === "scooty" && age >= 16) return true;
  if (licenseType === "bike" && age >= 16) return true;
  return false;
};

export const handleWebhook = async (req, res) => {
  try {
    const body = req.body;
    console.log("📩 Webhook Received:", JSON.stringify(body, null, 2));

    const sessionId = body?.session?.split("/").pop() || "unknown-session";
    const intent = body?.queryResult?.intent?.displayName || "UnknownIntent";
    const userMessage = body?.queryResult?.queryText || "";

    const parameters = body?.queryResult?.parameters || {};
    const licenseType = parameters?.licenseType || "unknown";
    const ageValue = Number(parameters?.age?.amount || parameters?.age || 0);
    const location = parameters?.location || "unknown";
    const gender = parameters?.gender || "unknown";

    console.log("➡️ Intent:", intent);
    console.log("➡️ User Message:", userMessage);
    console.log("➡️ Parameters:", { licenseType, ageValue, location, gender });

    let responseMessage = "Sorry, we could not process your request.";
    let triggeredEvent = "fallback_event";

    if (licenseType && ageValue) {
      const eligible = checkEligibility(licenseType, ageValue);
      console.log("🎯 Eligibility:", eligible);

      if (eligible) {
        triggeredEvent = "trigger_success";
        responseMessage = `You are eligible for a ${licenseType} license.`;
      } else {
        triggeredEvent = "trigger_fail";
        responseMessage = `You are not eligible for a ${licenseType} license.`;
      }
    }

    await convoModel.create({
      sessionId,
      intentName: intent,
      userMessage,
      parameters: {
        licenseType,
        age: String(ageValue),
        location,
        gender,
      },
      triggeredEvent,
      responseMessage,
    });

    console.log("✅ Webhook response prepared.");

    return res.json({
      followupEventInput: {
        name: triggeredEvent,
        languageCode: "en",
        parameters: {
          licenseType,
          age: ageValue,
          location,
          gender,
        },
      },
    });
  } catch (err) {
    console.error("❌ Webhook Error:", err);
    return res.status(500).json({
      success: false,
      msg: err.message || "Webhook error occurred",
    });
  }
};

export const handleMessage = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      console.warn("⚠️ No message text provided");
      return res.status(400).json({ error: "Message text is required" });
    }

    const sessionId = Math.random().toString(36).substring(7);
    const sessionPath = sessionClient.projectAgentSessionPath(
      projectId,
      sessionId
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text,
          languageCode: "en-US",
        },
      },
    };

    console.log("📨 Sending message to Dialogflow:", text);

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0]?.queryResult;

    console.log("📥 Dialogflow response:", JSON.stringify(result, null, 2));

    const fulfillmentText =
      result?.fulfillmentText || "Sorry, I didn’t understand that.";
    const intentName = result?.intent?.displayName || "UnknownIntent";

    return res.status(200).json({
      response: fulfillmentText,
      intent: intentName,
      parameters: result?.parameters?.fields || {},
    });
  } catch (err) {
    console.error("❌ Dialogflow Error:", err);
    return res.status(500).json({ error: "Dialogflow request failed" });
  }
};
