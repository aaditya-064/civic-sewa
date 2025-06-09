import dialogflow from "@google-cloud/dialogflow";
import { v4 as uuid } from "uuid";

// Initialize Dialogflow session client
const projectId = "sincere-hybrid-340617"; // Replace with your Google Cloud Project ID
const sessionId = uuid(); // Generate a unique session ID
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: "/Users/mac/Desktop/civic-sewa/server/dialogflow.json",
});
const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

// Function to send a query to Dialogflow and get a response
async function detectIntent(queryText, languageCode = "en-US") {
  // The text query request
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: queryText, // The user's input text
        languageCode: languageCode,
      },
    },
  };

  try {
    // Send the request to Dialogflow
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    console.log(`Query: ${result.queryText}`);
    console.log(`Response: ${result.fulfillmentText}`);
    console.log(`Intent: ${result.intent.displayName}`);

    return result;
  } catch (error) {
    console.error("Error during Dialogflow API call:", error);
    throw error;
  }
}

// Example usage
async function run() {
  const userInput =
    "I'm a married man, aged 18, looking to apply for my citizenship."; // Example user input
  await detectIntent(userInput);
}

run();
