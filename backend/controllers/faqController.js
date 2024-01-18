import faqModel from "../models/faqModel.js";

async function getAllFAQHandler(req, res) {
  try {
    const faq = await faqModel.getAllFAQ();

    if (!faq || faq.length === 0) {
      return res.status(404).json({
        message: "Дані про FAQ відсутні.",
      });
    }

    return res.status(200).json(faq);
  } catch (error) {
    console.error("Помилка при отриманні FAQ: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні FAQ.",
    });
  }
}

export {
  getAllFAQHandler,
};
