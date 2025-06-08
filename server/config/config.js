import dotenv from "dotenv";
dotenv.config("env");

const data = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
  JWT_EXPIRTY_DATE: process.env.JWT_EXPIRTY_DATE,
};

export default data;
