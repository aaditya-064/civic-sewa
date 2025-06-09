import { detectIntent } from "./dialogflow.controller.js";
import { v4 as uuidv4 } from "uuid";
import convoModel from "../model/conversation.model.js";

// Store active sessions in memory (you might want to use Redis or a database for production)
const activeSessions = new Map();

export const handleWebhook = async (req, res) => {
  try {
    const { queryText, sessionId: existingSessionId } = req.body;

    if (!queryText) {
      return res.status(400).json({ error: "queryText is required" });
    }

    // Use existing session ID or create a new one
    let sessionId;
    if (existingSessionId && activeSessions.has(existingSessionId)) {
      sessionId = existingSessionId;
    } else {
      sessionId = uuidv4();
      activeSessions.set(sessionId, {
        createdAt: new Date(),
        messageCount: 0,
      });
    }

    // Update session info
    const sessionInfo = activeSessions.get(sessionId);
    sessionInfo.messageCount++;
    sessionInfo.lastActivity = new Date();
    activeSessions.set(sessionId, sessionInfo);

    const result = await detectIntent(queryText, sessionId);

    if (!result.success) {
      throw new Error(result.error);
    }

    // Store conversation in MongoDB
    try {
      await convoModel.create({
        sessionId,
        intentName: result.response.intent,
        userMessage: result.response.query,
        responseMessage: result.response.response,
        parameters: {
          licenseType:
            result.response.parameters.fields?.licenseType?.stringValue || "",
          age: result.response.parameters.fields?.age?.stringValue || "",
          location:
            result.response.parameters.fields?.location?.stringValue || "",
          gender: result.response.parameters.fields?.gender?.stringValue || "",
          marriageStatus:
            result.response.parameters.fields?.marriageStatus?.stringValue ||
            "",
        },
        triggeredEvent:
          result.response.parameters.fields?.event?.stringValue || "",
      });
    } catch (dbError) {
      console.error("Error saving conversation:", dbError);
      // Don't throw error to client, just log it
    }

    // Clean up old sessions (older than 30 minutes)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    for (const [sid, info] of activeSessions.entries()) {
      if (info.lastActivity < thirtyMinutesAgo) {
        activeSessions.delete(sid);
      }
    }

    return res.json({
      ...result.response,
      sessionId,
      messageCount: sessionInfo.messageCount,
    });
  } catch (error) {
    console.error("Error in handleWebhook:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const handleMessage = async (req, res) => {
  try {
    const { message, sessionId: existingSessionId } = req.body;

    if (!message) {
      return res.status(400).json({ error: "message is required" });
    }

    // Use existing session ID or create a new one
    let sessionId;
    if (existingSessionId && activeSessions.has(existingSessionId)) {
      sessionId = existingSessionId;
    } else {
      sessionId = uuidv4();
      activeSessions.set(sessionId, {
        createdAt: new Date(),
        messageCount: 0,
      });
    }

    // Update session info
    const sessionInfo = activeSessions.get(sessionId);
    sessionInfo.messageCount++;
    sessionInfo.lastActivity = new Date();
    activeSessions.set(sessionId, sessionInfo);

    const result = await detectIntent(message, sessionId);

    if (!result.success) {
      throw new Error(result.error);
    }

    // Store conversation in MongoDB
    try {
      await convoModel.create({
        sessionId,
        intentName: result.response.intent,
        userMessage: result.response.query,
        responseMessage: result.response.response,
        parameters: {
          licenseType:
            result.response.parameters.fields?.licenseType?.stringValue || "",
          age: result.response.parameters.fields?.age?.stringValue || "",
          location:
            result.response.parameters.fields?.location?.stringValue || "",
          gender: result.response.parameters.fields?.gender?.stringValue || "",
          marriageStatus:
            result.response.parameters.fields?.marriageStatus?.stringValue ||
            "",
        },
        triggeredEvent:
          result.response.parameters.fields?.event?.stringValue || "",
      });
    } catch (dbError) {
      console.error("Error saving conversation:", dbError);
      // Don't throw error to client, just log it
    }

    // Clean up old sessions (older than 30 minutes)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    for (const [sid, info] of activeSessions.entries()) {
      if (info.lastActivity < thirtyMinutesAgo) {
        activeSessions.delete(sid);
      }
    }

    return res.json({
      ...result.response,
      sessionId,
      messageCount: sessionInfo.messageCount,
    });
  } catch (error) {
    console.error("Error in handleMessage:", error);
    return res.status(500).json({ error: error.message });
  }
};
