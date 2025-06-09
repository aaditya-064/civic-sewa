import { MAX_ACCESS_BOUNDARY_RULES_COUNT } from "google-auth-library/build/src/auth/downscopedclient.js";
import convoModel from "../model/conversation.model.js";
import dialogflow, { SessionsClient } from "@google-cloud/dialogflow";

const checkEligibility = (licenseType, age) => {
  if (licenseType === "scooty" && age >= 16) return true;
  if (licenseType === "bike" && age >= 16) return true;
  return false;
};

const projectId = "cicsev-ohcp";
const sessionClient = new SessionsClient({
  keyFilename: "./utils/key.json",
});

export const handleWebhook = async (req, res) => {
  try {
    const body = req.body;

    // const intent =
    // body?.queryResult?.intent?.displayName || "CheckLicenseIntent";
    const parameters = body?.queryResult?.parameters;
    const { licenseType, age, location } = parameters;
    const ageCheck = age?.amount;
    const userMessage = body?.queryResult?.queryText;
    const sessionId = body?.session?.split("/").pop();

    let responseMessage = "";
    let triggeredEvent = "";
    // console.log(intent);

    const eligible = checkEligibility(licenseType, Number(ageCheck));
    console.log(eligible);

    if (eligible) {
      triggeredEvent = "trigger_success";
      responseMessage = `You are eligible for a ${licenseType} license.`;
    } else {
      triggeredEvent = "trigger_fail";
      responseMessage = `You are not eligible for a ${licenseType} license.`;
    }
    console.log(licenseType, age, location);

    res.json({
      followupEventInput: {
        name: triggeredEvent,
        languageCode: "en",
        parameters: {
          licenseType,
          age,
          location,
        },
      },
    });
    return;

    await convoModel.create({
      intentName: intent,
      parameters: {
        licenseType: licenseType,
        age: age?.String(),
        location: location,
      },
      triggeredEvent,
      responseMessage,
    });
  } catch (err) {
    res.status(err?.statusCode || 500).json({
      success: false,
      msg: err?.message || "Internal server error",
    });
  }
};

export const handleMessage = async (req, res) => {
  const { text } = req.body;
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

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    res.json({ response: result.fulfillmentText });
  } catch (err) {
    console.error("Dialogflow Error:", err);
    res.status(500).json({ error: "Dialogflow request failed" });
  }
};
