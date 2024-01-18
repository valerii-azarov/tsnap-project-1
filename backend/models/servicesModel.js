import { pool } from "../config/db.js";
import { getPopularServicesQuery, getServicesByCategoryIdQuery, getServiceInfoByServiceTypeIdQuery } from "../queries/servicesQueries.js";

export async function getPopularServices() {
  try {
    const result = await pool.query(getPopularServicesQuery);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання популярних послуг сталася помилка.");
  }
}

export async function getServicesByCategory(categoryId) {
  try {
    const result = await pool.query(getServicesByCategoryIdQuery, [categoryId]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання послуг сталася помилка.");
  }
}

export async function getServiceInfoByServiceTypeId(serviceTypeId) {
  try {
    const result = await pool.query(getServiceInfoByServiceTypeIdQuery, [serviceTypeId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час отримання інформації про послугу сталася помилка.");
  }
}

export default {
  getPopularServices,
  getServicesByCategory,
  getServiceInfoByServiceTypeId,
};
