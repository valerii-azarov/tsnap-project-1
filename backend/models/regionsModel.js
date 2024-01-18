import { pool } from "../config/db.js";
import { getAllRegionsQuery, getAppearanceByCityIdQuery } from "../queries/regionsQueries.js";

export async function getAllRegions() {
  try {
    const result = await pool.query(getAllRegionsQuery);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання регіонів сталася помилка.");
  }
}

export async function getAppearanceByCityId(cityId) {
  try {
    const result = await pool.query(getAppearanceByCityIdQuery, [cityId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час отримання даних сталася помилка.");
  }
}

export default {
  getAllRegions,
  getAppearanceByCityId,
};
