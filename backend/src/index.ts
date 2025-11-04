import dotenv from "dotenv";
import app from "./app.js";
dotenv.config({ path: "./.env" });
import type { Request, Response } from "express";
import { APP_NAME } from "./constants.js";


const PORT: number = parseInt(process.env.PORT || "8001", 10);


app.listen(PORT, () => {
    console.log(`Server is live at port no. ${PORT}. Check: http://localhost:${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
    res.send(`<h3>${APP_NAME} Services</h3>`)
});