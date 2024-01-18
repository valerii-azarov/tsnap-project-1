import { pool } from "../config/db.js";
import { getIntervalsQuery, hasRecordsForDateQuery, insertScheduleRecordQuery, getAvailableScheduleRecordsQuery, updateAvailabilityStatusQuery, getScheduleByOfficeIdAndServiceIdQuery } from "../queries/scheduleQueries.js";
import moment from "moment";

export async function getIntervals() {
  try {
    const result = await pool.query(getIntervalsQuery);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання інтервалів сталася помилка.");
  }
}

export async function hasRecordsForDate(date, officeId, serviceId) {
  try {
    const result = await pool.query(hasRecordsForDateQuery, [date, officeId, serviceId]);
    const count = parseInt(result.rows[0].count, 10);
    return count > 0;
  } catch (error) {
    throw new Error("Під час перевірки наявності записів на вказану дату, офіс та послугу сталася помилка.");
  }
}

export async function insertScheduleRecord(serviceId, date, time, officeId) {
  try {
    await pool.query(insertScheduleRecordQuery, [serviceId, date, time, null, true, officeId]);
  } catch (error) {
    throw new Error("Під час вставки запису в розклад сталася помилка.");
  }
}

export async function getAvailableScheduleRecords() {
  try {
    const result = await pool.query(getAvailableScheduleRecordsQuery);
    return result.rows;
  } catch (error) {
    throw new Error("Під час отримання доступних записів розкладу сталася помилка.");
  }
}

export async function updateAvailabilityStatus(recordId) {
  try {
    await pool.query(updateAvailabilityStatusQuery, [recordId]);
  } catch (error) {
    throw new Error("Під час оновлення статусу доступності сталася помилка.");
  }
}

export async function getScheduleByOfficeIdAndServiceId(officeId, serviceId) {
  try {
    const result = await pool.query(getScheduleByOfficeIdAndServiceIdQuery, [officeId, serviceId]);

    const scheduleByDate = {};
    
    result.rows.forEach((row) => {
      const date = moment(row.date).format("YYYY-MM-DD");
      const time = moment(row.time, "HH:mm:ss").format("HH:mm:ss");
      const id = row.id;
      const availability = row.availability;

      if (!scheduleByDate[date]) {
        scheduleByDate[date] = [];
      }

      scheduleByDate[date].push({ id, time, availability });
    });

    return scheduleByDate;
  } catch (error) {
    throw new Error("Під час отримання розкладу за офісом та послугою сталася помилка.");
  }
}

export default {
  getIntervals,
  hasRecordsForDate,
  insertScheduleRecord,
  getAvailableScheduleRecords,
  updateAvailabilityStatus,
  getScheduleByOfficeIdAndServiceId,
};
