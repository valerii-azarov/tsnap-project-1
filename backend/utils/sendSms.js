import { client } from "../config/twilioConfig.js";

export const sendSms = async (phoneNumber, message) => {
  try {
    await client.messages.create({
      body: message,
      from: process.env.PHONE_NUMBER,
      to: phoneNumber,
    });
    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Помилка при надсиланні SMS.");
  }
};
