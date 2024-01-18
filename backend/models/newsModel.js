import { pool } from "../config/db.js";
import { getNewsByPageQuery, getTotalNewsCountQuery, getFeaturedNewsQuery, getNewsByIdQuery } from "../queries/newsQueries.js";

export async function getNewsByPage(page, limit) {
  const offset = (page - 1) * limit;
  try {
    const result = await pool.query(getNewsByPageQuery, [limit, offset]);
    return result.rows;
  } catch (error) {
    throw new Error("Помилка при отриманні новин.");
  }
}

async function getTotalNewsCount() {
  try {
    const result = await pool.query(getTotalNewsCountQuery);
    return result.rows[0].total_count;
  } catch (error) {
    throw new Error("Помилка при отриманні загальної кількості новин.");
  }
}

export async function getFeaturedNews() {
  try {
    const result = await pool.query(getFeaturedNewsQuery);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час отримання важливого оголошення сталася помилка.");
  }
}

export async function getNewsById(newsId) {
  try {
    const result = await pool.query(getNewsByIdQuery, [newsId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Помилка при отриманні новини.");
  }
}

export default {
  getNewsByPage,
  getTotalNewsCount,
  getFeaturedNews,
  getNewsById,
};
