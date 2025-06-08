import convoModel from "../model/conversation.model.js";
import dialogflow from "@google-cloud/dialogflow";

const checkEligibility = (licenseType, age) => {
  if (licenseType === "scooty" && age >= 16) return true;
  if (licenseType === "bike" && age >= 16) return true;
  return false;
};

const projectId = "civic-sewa-wfnn";
const sessionClient = new dialogflow.SessionsClient();

export const handleWebhook = async (req, res) => {
  try {
    const body = req.body;

    const intent =
      body?.queryResult?.intent?.displayName || "CheckLicenseIntent";
    const parameters = body?.queryResult?.parameters;
    const { licenseType, age, location } = parameters;
    const userMessage = body?.queryResult?.queryText;
    const sessionId = body?.session?.split("/").pop();

    let responseMessage = "";
    let triggeredEvent = "";
    console.log(intent);

    if (intent === "CheckLicenseIntent") {
      const eligible = checkEligibility(licenseType, Number(age));
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
    }

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

export const apiDialogflow = async (req, res) => {
  try {
    const { queryInput, sessionId } = req.body;
    if (!sessionId) return res.status(400).send("Session ID required");

    const sessionPath = sessionClient.projectAgentSessionPath(
      projectId,
      sessionId
    );

    const request = {
      session: sessionPath,
      queryInput,
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    res.json({
      fulfillmentText: result.fulfillmentText,
      parameters: result.parameters,
      intent: result.intent.displayName,
    });
  } catch (error) {
    console.error("Dialogflow detectIntent error:", error);
    res.status(500).json({ error: "Dialogflow detectIntent failed" });
  }
};
