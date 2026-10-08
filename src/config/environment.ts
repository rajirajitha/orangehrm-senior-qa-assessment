import dotenv from "dotenv";

dotenv.config();

export const environment = {
  baseUrl:
    process.env.BASE_URL ||
    "https://opensource-demo.orangehrmlive.com/",

  username:
    process.env.ORANGEHRM_USERNAME ||
    "Admin",

  password:
    process.env.ORANGEHRM_PASSWORD ||
    "admin123"
};