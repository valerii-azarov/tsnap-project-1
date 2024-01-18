import { pool } from "../config/db.js";
import { getScheduleDateAndTimeQuery, getScheduleBookingDetailsQuery, getScheduleAvailabilityQuery, insertBookingQuery, updateScheduleAvailabilityToFalseQuery, updateScheduleAvailabilityToFalseAndBookingIdQuery } from "../queries/bookingQueries.js";

export async function getDateAndTime(scheduleId) {
  try {
    const result = await pool.query(getScheduleDateAndTimeQuery, [scheduleId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Під час отримання дати та часу сталася помилка.");
  }
}

export async function getBookingDetails(regCode, phone) {
  try {
    const result = await pool.query(getScheduleBookingDetailsQuery, [regCode, phone]);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання деталей бронювання сталася помилка.");
  }
}

export async function checkAvailability(scheduleId) {
  try {
    const result = await pool.query(getScheduleAvailabilityQuery, [scheduleId]);
    return result.rows[0].availability;
  } catch (error) {
    throw new Error("Під час перевірки доступності сталася помилка.");
  }
}

export async function createBooking(surname, name, patronymic, phone, categoryId, serviceId, serviceTypeId) {
  try {
    const result = await pool.query(insertBookingQuery, [surname, name, patronymic, phone, categoryId, serviceId, serviceTypeId, 1]);
    return result.rows[0].id;
  } catch (error) {
    throw new Error("Під час створення бронювання сталася помилка.");
  }
}

export async function updateScheduleAvailabilityToFalse(scheduleId) {
  try {
    await pool.query(updateScheduleAvailabilityToFalseQuery, [scheduleId]);
  } catch (error) {
    throw new Error("Під час оновлення доступності розкладу сталася помилка.");
  }
}

export async function updateScheduleAvailabilityToFalseAndBookingId(scheduleId, newTicketId) {
  try {
    await pool.query(updateScheduleAvailabilityToFalseAndBookingIdQuery, [newTicketId, scheduleId]);
  } catch (error) {
    throw new Error("Під час оновлення доступності та ID бронювання розкладу сталася помилка.");
  }
}

export default {
  getDateAndTime,
  getBookingDetails,
  checkAvailability,
  createBooking,
  updateScheduleAvailabilityToFalse,
  updateScheduleAvailabilityToFalseAndBookingId,
};
