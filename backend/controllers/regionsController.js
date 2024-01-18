import regionsModel from "../models/regionsModel.js";

async function getAllRegionsHandler(req, res) {
  try {
    const regions = await regionsModel.getAllRegions();

    if (!regions || regions.length === 0) {
      return res.status(404).json({
        message: "Дані про регіони відсутні.",
      });
    }

    return res.status(200).json(regions);
  } catch (error) {
    logger.error("Помилка при отриманні регіонів: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні регіонів.",
    });
  }
}

async function getAppearanceByCityIdHandler(req, res) {
  try {
    const cityId = req.params.cityId;

    const appearance = await regionsModel.getAppearanceByCityId(cityId);

    if (!appearance) {
      return res.status(404).json({
        message: "Дані про налаштування відсутні для вказаного міста.",
      });
    }

    return res.status(200).json(appearance);
  } catch (error) {
    logger.error("Помилка при отриманні даних: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні даних.",
    });
  }
}

export { 
  getAllRegionsHandler,
  getAppearanceByCityIdHandler,
};
