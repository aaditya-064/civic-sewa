import mongoose from "mongoose";

const licenseSchema = new mongoose.Schema(
  {
    licenseType: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const licenseModel = mongoose.model("User", licenseSchema);
export default licenseModel;
