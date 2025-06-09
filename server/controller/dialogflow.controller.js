import dialogflow from "@google-cloud/dialogflow";
import pkg from "google-auth-library";
const { GoogleAuth } = pkg;
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { v4 as uuid } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CREDENTIALS_PATH = path.join(__dirname, "..", "dialogflow.json");
const CREDENTIALS = JSON.parse(
  process.env.DIALOGFLOW_CREDENTIALS ||
    fs.readFileSync(CREDENTIALS_PATH, "utf8")
);

const PROJECT_ID = CREDENTIALS.project_id;
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: CREDENTIALS_PATH,
});

// Function for direct API usage
export const detectIntent = async (message, sessionId) => {
  try {
    if (!message) {
      return {
        success: false,
        error: "Message is required",
      };
    }

    // Use provided sessionId or create new one
    const finalSessionId = sessionId || uuid();
    const sessionPath = sessionClient.projectAgentSessionPath(
      PROJECT_ID,
      finalSessionId
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

    return {
      success: true,
      response: {
        query: result.queryText,
        response: result.fulfillmentText,
        intent: result.intent.displayName,
        parameters: result.parameters,
        sessionId: finalSessionId,
      },
    };
  } catch (error) {
    console.error("Error in detectIntent:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getAccessToken = async (req, res) => {
  try {
    const auth = new GoogleAuth({
      credentials: CREDENTIALS,
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });

    const accessToken = await auth.getAccessToken();
    return res.json({ accessToken });
  } catch (error) {
    console.error("Error getting access token:", error);
    return res.status(500).json({ error: error.message });
  }
};
