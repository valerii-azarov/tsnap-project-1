import serviceTypesModel from "../models/serviceTypesModel.js";

async function getServiceTypesByServiceIdHandler(req, res) {
  try {
    const serviceId = req.params.serviceId;

    const serviceTypes = await serviceTypesModel.getServiceTypesByServiceId(serviceId);

    if (!serviceTypes || serviceTypes.length === 0) {
      return res.status(404).json({
        message: "Дані про типи послуги відсутні.",
      });
    }

    return res.status(200).json(serviceTypes);
  } catch (error) {
    console.error("Помилка при отриманні типів послуги: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні типів послуги.",
    });
  }
}

export {
  getServiceTypesByServiceIdHandler,
};
