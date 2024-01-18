import fs from "fs";
import path from "path";

const __dirname = path.resolve();

export const imageRequest = async (req, res) => {
  try {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, "images", imageName);

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({
        message: "Зображення не знайдено.",
      });
    }

    return res.sendFile(imagePath);
  } catch (error) {
    logger.error("Помилка при отриманні зображення: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні зображення.",
    });
  }
};
