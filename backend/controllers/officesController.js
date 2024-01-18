import officesModel from "../models/officesModel.js";

async function getAllOfficesByCityIdHandler(req, res) {
  try {
    const cityId = req.params.cityId;

    const offices = await officesModel.getAllOfficesByCity(cityId);

    if (!offices || offices.length === 0) {
      return res.status(404).json({
        message: "Дані про офіси відсутні.",
      });
    }

    return res.status(200).json(offices);
  } catch (error) {
    console.error("Помилка при отриманні офісів: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні офісів.",
    });
  }
}

export {
  getAllOfficesByCityIdHandler,
};
