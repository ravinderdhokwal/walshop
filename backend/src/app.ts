import express from "express";
import type { Express } from "express";

const app: Express = express();

app.use(express.json());

// Importing routes
import testRoutes from "./routes/test.routes.js";

// Using routes
app.use("/api/v1", testRoutes);

export default app;