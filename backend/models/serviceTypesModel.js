import { pool } from "../config/db.js";
import { getServiceTypesByServiceIdQuery } from "../queries/serviceTypesQueries.js";

export async function getServiceTypesByServiceId(serviceId) {
  try {
    const result = await pool.query(getServiceTypesByServiceIdQuery, [serviceId]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання типів послуги сталася помилка.");
  }
}

export default {
  getServiceTypesByServiceId,
};
