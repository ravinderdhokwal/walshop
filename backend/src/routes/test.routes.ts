import { Router } from "express";
import { testController } from "../controllers/test.controllers.js";

const router: Router = Router();

router.get("/test", testController);


export default router;