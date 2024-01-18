import { pool } from "../config/db.js";
import { getAllCategoriesQuery } from "../queries/categoriesQueries.js";

export async function getAllCategories() {
  try {
    const result = await pool.query(getAllCategoriesQuery);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання категорій сталася помилка.");
  }
}

export default {
  getAllCategories,
};
