import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import app from "./app.js";
import { APP_NAME } from "./constants.js";
import { connectDB } from "./configs/database.configs.js";


const PORT: number = parseInt(process.env.PORT || "8001", 10);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is live at port no. ${PORT}. Check: http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.send(`<h3>${APP_NAME} Services</h3>`)
});