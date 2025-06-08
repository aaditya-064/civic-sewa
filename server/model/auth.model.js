import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
      default:
        "https://imgs.search.brave.com/F3S732RuH1idxV7dDfEqAM9vKEJhhxQ-XP8pb4iaOmM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzllLzgz/Lzc1LzllODM3NTI4/ZjAxY2YzZjQyMTE5/YzVhZWVlZDFiMzM2/LmpwZw",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
