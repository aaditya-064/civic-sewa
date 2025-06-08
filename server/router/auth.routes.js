import express from "express";
import { registerUser, logUser } from "../controller/auth.controller.js";
import {
  loginMiddleware,
  registerMiddleware,
  checkToken,
  isAdmin,
} from "../middleware/auth.middleware.js";

const route = express.Router();

import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

route.post("/register", registerMiddleware, registerUser);
route.post("/login", loginMiddleware, logUser);
// route.patch(
//   "/edit-user",
//   upload.single("profilePicture"),
//   checkToken,
//   editUser
// );

export default route;
