import bookingModel from "../models/bookingModel.js";
import { sendSms } from "../utils/sendSms.js";
import { minutesBeforeAppointment } from "../config/constants.js";
import moment from "moment";

async function canBookAppointmentHandler(req, res) {
  try {
    const { selectedRecordId } = req.body;

    const scheduleDetails = await bookingModel.getDateAndTime(selectedRecordId);

    if (!scheduleDetails) {
      return res.status(404).json({
        message: "Запис не знайдено.",
      });
    }

    const appointmentDate = moment(scheduleDetails.date);
    const timeOfAppointment = moment(scheduleDetails.time, "HH:mm:ss");
    appointmentDate.set({
      hour: timeOfAppointment.get("hour"),
      minute: timeOfAppointment.get("minute"),
      second: timeOfAppointment.get("second"),
    });

    const currentTime = moment();
    const endBookingTime = appointmentDate.clone().subtract(minutesBeforeAppointment, "minutes");

    if (currentTime.isAfter(endBookingTime)) {
      await bookingModel.updateScheduleAvailabilityToFalse(selectedRecordId);

      return res.status(400).json({
        allowed: false,
        message: `Вибачте за незручності, але бронювання можливе лише протягом ${minutesBeforeAppointment} хвилин до візиту. Дякуємо за розуміння!`,
      });
    }

    return res.status(200).json({
      allowed: true,
    });
  } catch (error) {
    console.error("Помилка при перевірці бронювання: ", error.message);
    return res.status(500).json({
      message: "Помилка при перевірці бронювання.",
    });
  }
}

async function createBookingHandler(req, res) {
  try {
    const { surname, name, patronymic, phone, categoryId, serviceId, serviceTypeId, scheduleId } = req.body;

    const isAvailable = await bookingModel.checkAvailability(scheduleId);

    if (!isAvailable) {
      return res.status(400).json({
        message: "Місце вже зайняте.",
      });
    }

    const newTicketId = await bookingModel.createBooking(surname, name, patronymic, phone, categoryId, serviceId, serviceTypeId);

    await bookingModel.updateScheduleAvailabilityToFalseAndBookingId(scheduleId, newTicketId);

    const message = `Ваш електронний талон №${newTicketId}. Дотримуйтеся часу візиту до ЦНАПу, візьміть необхідні документи та підготуйте свій талон для подтвердження. Дякуємо за вибір нашого сервісу!`;

    await sendSms(phone, message);

    return res.status(200).json({
      message: `Електронний талон з ID${newTicketId} успішно створено.`,
      id: newTicketId,
    });
  } catch (error) {
    console.error("Помилка при створенні електронного талону: ", error.message);
    return res.status(500).json({
      message: "Помилка при створенні електронного талону.",
    });
  }
}

async function checkBookingStatusHandler(req, res) {
  try {
    const { regCode, phone } = req.body;

    const details = await bookingModel.getBookingDetails(regCode, phone);

    if (!details || details.length === 0) {
      return res.status(404).json({
        message: "Ваш електронний талон не знайдено.",
      });
    }

    return res.status(200).json(details);
  } catch (error) {
    console.error("Помилка при отриманні інформації про статус електронного талону: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні інформації про статус електронного талону.",
    });
  }
}

export { 
  canBookAppointmentHandler,
  createBookingHandler,
  checkBookingStatusHandler,
};
