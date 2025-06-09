import userModel from "../model/auth.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const registerMiddleware = async (req, res, next) => {
  try {
    const findUser = await userModel.findOne({ email: req.body.email });
    if (findUser) {
      const err = new Error("User Already Exists");
      err.statusCode = 400;
      throw err;
    }
    next();
  } catch (err) {
    res
      .status(err?.statusCode || 400)
      .json({ success: false, err: err?.message });
  }
};

export const loginMiddleware = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const user = await userModel.findOne({ phoneNumber: `+977${phoneNumber}` });
    console.log(user, phoneNumber);
    if (!user) {
      const err = new Error("User Not Found");
      err.statusCode = 404;
      throw err;
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res
      .status(err?.statusCode || 400)
      .json({ success: false, err: err?.message });
  }
};

export const checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken = jwt.verify(token, config.JWT_SECRET);
    if (!verifyToken) {
      const err = new Error("INVALID TOKEN");
      err.statusCode = 400;
      throw err;
    }
    const user = await userModel.findById(verifyToken.userId);
    req.user = user;
    next();
  } catch (err) {
    res
      .status(err?.statusCode || 400)
      .json({ success: false, err: err?.message });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
  } catch (err) {
    res
      .status(err?.statusCode || 400)
      .json({ success: false, err: err?.message });
  }
};
