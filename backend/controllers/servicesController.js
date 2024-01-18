import servicesModel from "../models/servicesModel.js";

async function getPopularServicesHandler(req, res) {
  try {
    const services = await servicesModel.getPopularServices();

    if (!services || services.length === 0) {
      return res.status(404).json({
        message: "Дані про популярні сервіси відсутні.",
      });
    }

    return res.status(200).json(services);
  } catch (error) {
    logger.error("Помилка при отриманні популярних послуг: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні популярних послуг.",
    });
  }
}

async function getServicesByCategoryHandler(req, res) {
  try {
    const categoryId = req.params.categoryId;

    const services = await servicesModel.getServicesByCategory(categoryId);

    if (!services || services.length === 0) {
      return res.status(404).json({
        message: "Дані про сервіси відсутні.",
      });
    }

    return res.status(200).json(services);
  } catch (error) {
    logger.error("Помилка при отриманні послуг: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні послуг.",
    });
  }
}

async function getServiceInfoByServiceTypeIdHandler(req, res) {
  try {
    const serviceTypeId = req.params.serviceTypeId;

    const info = await servicesModel.getServiceInfoByServiceTypeId(serviceTypeId);
    
    if (!info) {
      return res.status(404).json({ 
        message: "Інформацію про послугу не знайдено." 
      });
    }

    return res.status(200).json(info);
  } catch (error) {
    logger.error("Помилка при отриманні інформації про послугу: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні інформації про послугу.",
    });
  }
}

export {
  getPopularServicesHandler,
  getServicesByCategoryHandler,
  getServiceInfoByServiceTypeIdHandler,
};
