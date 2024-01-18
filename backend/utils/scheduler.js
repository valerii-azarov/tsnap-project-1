import { generateScheduleRecords, updateAvailabilityStatus } from "../controllers/scheduleController.js";
import moment from "moment";

const runFunctions = () => {
  const functionsToRun = {
    generateScheduleRecords,
    updateAvailabilityStatus,
  };

  Object.entries(functionsToRun).forEach(([name, fn]) => {
    try {
      fn();
      console.log(`Функція "${name}" успішно виконана (${moment().format("YYYY-MM-DD, HH:mm:ss")})`);
    } catch (error) {
      console.error(`Помилка при виконанні функції ${name}: ${error.message}`);
    }
  });

  const nextMinute = moment().add(1, "minute");
  const delay = nextMinute.diff(moment());
  setTimeout(runFunctions, delay);
}

export default runFunctions;
