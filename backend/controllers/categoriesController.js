import categoryModel from "../models/categoriesModel.js";

async function getAllCategoriesHandler(req, res) {
  try {
    const categories = await categoryModel.getAllCategories();

    if (!categories || categories.length === 0) {
      return res.status(404).json({
        message: "Дані про категорії відсутні.",
      });
    }

    return res.status(200).json(categories);
  } catch (error) {
    console.error("Помилка при отриманні категорій: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні категорій.",
    });
  }
}

export { 
  getAllCategoriesHandler,
};
