import citiesModel from "../models/citiesModel.js";

async function getAllCitiesHandler(req, res) {
  try {
    const cities = await citiesModel.getAllCities();

    if (!cities || cities.length === 0) {
      return res.status(404).json({
        message: "Дані про міста відсутні.",
      });
    }

    return res.status(200).json(cities);
  } catch (error) {
    logger.error("Помилка при отриманні міст: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні міст.",
    });
  }
}

export { 
  getAllCitiesHandler,
};
