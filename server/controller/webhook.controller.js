import convoModel from "../model/conversation.model.js";
import dialogflow from "@google-cloud/dialogflow";

const checkEligibility = (licenseType, age) => {
  if (licenseType === "car" && age >= 18) return true;
  if (licenseType === "bike" && age >= 16) return true;
  return false;
};

const projectId = "civic-sewa-wfnn"; // your Dialogflow project id
const sessionClient = new dialogflow.SessionsClient();

export const handleWebhook = async (req, res) => {
  try {
    const body = req.body;

    const intent = body.queryResult.intent.displayName;
    const parameters = body.queryResult.parameters;
    const { licenseType, age } = parameters;
    const userMessage = body.queryResult.queryText;
    const sessionId = body.session?.split("/").pop();

    let responseMessage = "";
    let triggeredEvent = "";

    if (intent === "CheckLicenseIntent") {
      const eligible = checkEligibility(licenseType, Number(age));

      if (eligible) {
        triggeredEvent = "trigger_success";
        responseMessage = `You are eligible for a ${licenseType} license.`;
      } else {
        triggeredEvent = "trigger_fail";
        responseMessage = `You are not eligible for a ${licenseType} license.`;
      }

      res.json({
        followupEventInput: {
          name: triggeredEvent,
          languageCode: "en",
          parameters: {
            licenseType,
            age,
          },
        },
      });
    }

    await convoModel.create({
      sessionId,
      intentName: intent,
      userMessage,
      parameters: {
        licenseType: licenseType.toString(),
        age: age.toString(),
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
    const { message, sessionId } = req.body;
    const sessionPath = sessionClient.projectAgentSessionPath(
      projectId,
      sessionId
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: "en-US",
        },
      },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    res.json({
      reply: result.fulfillmentText,
      intent: result.intent ? result.intent.displayName : null,
    });
  } catch (err) {
    res.status(err?.statusCode || 500).json({
      success: false,
      msg: err?.message || "Internal server error",
    });
  }
};
