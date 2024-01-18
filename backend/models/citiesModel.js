import { pool } from "../config/db.js";
import { getAllCitiesQuery } from "../queries/citiesQueries.js";

export async function getAllCities() {
  try {
    const result = await pool.query(getAllCitiesQuery);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання міст сталася помилка.");
  }
}

export default {
  getAllCities,
};
