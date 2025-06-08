import { hashPassword, comparePassword } from "../utils/auth.helpers.js";
import userModel from "../model/auth.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { validatePhone } from "../utils/phone.validator.js";

export const registerUser = async (req, res) => {
  try {
    const { password, phoneNumber } = req.body;

    const checkedNumber = validatePhone(phoneNumber);

    //user validation
    const findUser = await userModel.findOne({ email: req.body.email });
    if (findUser) {
      const err = new Error("User Alreay Exists");
      err.statusCode = 400;
      throw err;
    }

    //hash password
    const hashedPassword = await hashPassword(password);

    //save user
    const user = await userModel.create({
      ...req.body,
      password: hashedPassword,
      phoneNumber: checkedNumber,
    });

    res.status(201).send({
      success: true,
      message: "Registered Successfully",
      user,
    });
  } catch (err) {
    res
      .status(err?.statusCode || 400)
      .json({ success: false, msg: err?.message });
  }
};

export const logUser = async (req, res) => {
  try {
    const { password } = req.body;
    const user = req.user;

    //compare password with saved hashed password
    const match = await comparePassword(password, user.password);
    if (!match) {
      const err = new Error("Incorrect Password");
      err.statusCode = 400;
      throw err;
    }

    //assign token
    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).send({
      success: true,
      token,
      user: { name: user.username, email: user.email },
    });
  } catch (err) {
    res
      .status(err?.statusCode || 400)
      .json({ success: false, msg: err?.message });
  }
};
