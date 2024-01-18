import { generateRandomCode } from "../utils/generateRandomCode.js";
import { sendSms } from "../utils/sendSms.js";
import { validateCode } from "../utils/validateCode.js";
import { otpData } from "../data/otpData.js";
import moment from "moment";

async function sendOtpHandler (req, res) {
  try {
    const { phone } = req.body;
    
    const code = generateRandomCode();
    const message = `Ваш код підтвердження: ${code}`;

    await sendSms(phone, message);

    otpData.code = code;
    otpData.timestamp = moment();

    return res.status(200).send({
      message: `SMS надіслано на ваш номер: ${phone}`,
    });
  } catch (error) {
    console.error("Помилка при надсиланні SMS: ", error.message);
    return res.status(500).json({
      message: "Помилка при надсиланні SMS.",
    });
  }
};

async function verifyOtpHandler(req, res) {
  try {
    const { userEnteredCode } = req.body;

    const isCodeValid = validateCode(userEnteredCode);

    if (!isCodeValid) {
      return res.status(400).send({
        allowed: false,
        message: "Код недійсний або невірний.",
      });
    }

    return res.status(200).send({
      allowed: true,
    });
  } catch (error) {
    console.error("Помилка при перевірки коду: ", error.message);
    return res.status(500).json({
      message: "Помилка при перевірки коду.",
    });
  }
};

export { 
  sendOtpHandler,
  verifyOtpHandler,
};
