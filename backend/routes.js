import { Router } from "express";
import { prompt } from "./openai.js";

const router = Router();

router.route("/getresponse").post(prompt);

export default router;