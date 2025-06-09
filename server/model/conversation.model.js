import mongoose from "mongoose";

const convoSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      // required: true,
    },
    intentName: {
      type: String,
      // required: true,
    },
    userMessage: {
      type: String,
      // required: true,
    },
    parameters: {
      licenseType: {
        type: String,
        required: true,
      },
      age: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
      marriageStatus: {
        type: String,
        required: true,
      },
    },
    triggeredEvent: {
      type: String,
    },
    responseMessage: {
      type: String,
    },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const convoModel = mongoose.model("Conversation", convoSchema);
export default convoModel;
