import { pool } from "../config/db.js";
import { getAllFAQQuery } from "../queries/faqQueries.js";

export async function getAllFAQ() {
  try {
    const result = await pool.query(getAllFAQQuery);
    return result.rows;
  } catch (error) {
    throw new Error("Помилка при отриманні FAQ.");
  }
}

export default {
  getAllFAQ,
};
