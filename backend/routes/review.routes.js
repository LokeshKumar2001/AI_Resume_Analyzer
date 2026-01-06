import express from "express";
import { postResumeData } from "../controllers/review.controller.js";
const router = express.Router();

router.post("/review", postResumeData);

export default router;
