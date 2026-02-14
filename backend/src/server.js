import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3306;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});
