import app from "./app.js";
import { checkConnection } from "./config/db.js";
import runFunctions from "./utils/scheduler.js";

const port = process.env.PORT || 5000;

app.listen(port, "192.168.0.181", () => {
  console.log(`Сервер розпочав роботу на порту ${port}.`);
});

checkConnection();
runFunctions();
