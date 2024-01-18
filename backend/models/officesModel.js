import { pool } from "../config/db.js";
import { getAllOfficesByCityIdQuery } from "../queries/officesQueries.js";

export async function getAllOfficesByCity(cityId) {
  try {
    const result = await pool.query(getAllOfficesByCityIdQuery, [cityId]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання офісів сталася помилка.");
  }
}

export default {
  getAllOfficesByCity,
};
