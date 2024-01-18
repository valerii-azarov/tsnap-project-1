import scheduleModel from "../models/scheduleModel.js";
import moment from "moment";

async function generateScheduleRecords(req, res) {
  try {
    let newRecordCount = 0;

    const today = moment();
    const startOfWeek = today.clone().startOf("isoWeek");
    const endOfWeek = today.clone().endOf("isoWeek");

    const intervals = await scheduleModel.getIntervals();

    for (let day = startOfWeek.clone(); day.isSameOrBefore(endOfWeek); day.add(1, "day")) {
      const currentDate = day.format("YYYY-MM-DD");
      const dayOfWeek = day.isoWeekday();

      for (let interval of intervals) {
        if (interval.day_of_week_id !== dayOfWeek) {
          continue;
        }

        if (await scheduleModel.hasRecordsForDate(currentDate, interval.office_id, interval.service_id)) {
          continue;
        }

        const startTime = moment(interval.start_time, "HH:mm:ss");
        const endTime = moment(interval.end_time, "HH:mm:ss");

        while (startTime.isBefore(endTime)) {
          const nextTime = startTime.clone().add(interval.interval, "minutes");

          if (nextTime.isAfter(endTime)) {
            break;
          }

          const currentTime = startTime.format("HH:mm:ss");

          await scheduleModel.insertScheduleRecord(interval.service_id, currentDate, currentTime, interval.office_id);

          newRecordCount++;

          startTime.add(interval.interval, "minutes");
        }
      }
    }

    console.log(`Генерація нових записів завершено. Створено нових записів: ${newRecordCount}`);
  } catch (error) {
    console.error("Помилка: ", error.message);
  }
}

async function updateAvailabilityStatus() {
  try {
    let updatedRecordCount = 0;

    const scheduleRecords = await scheduleModel.getAvailableScheduleRecords();

    for (const record of scheduleRecords) {
      const currentTime = moment();
      const recordDateTime = moment(record.date).add(moment.duration(record.time));

      if (recordDateTime.isBefore(currentTime)) {
        await scheduleModel.updateAvailabilityStatus(record.id);
        updatedRecordCount++;
      }
    }

    console.log(`Оновлення статусів "availability" завершено. Оновлено записів: ${updatedRecordCount}`);
  } catch (error) {
    console.error("Помилка:", error.message);
  }
}

async function getScheduleByOfficeIdAndServiceIdHandler(req, res) {
  try {
    const { officeId, serviceId } = req.params;

    const schedule = await scheduleModel.getScheduleByOfficeIdAndServiceId(officeId, serviceId);

    if (!schedule || Object.keys(schedule).length === 0) {
      return res.status(404).json({
        message: "Дані про розклад відсутні.",
      });
    }

    return res.status(200).json(schedule);
  } catch (error) {
    console.error("Помилка при отриманні розкладу: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні розкладу.",
    });
  }
}

export { 
  generateScheduleRecords, 
  updateAvailabilityStatus,
  getScheduleByOfficeIdAndServiceIdHandler,
};
