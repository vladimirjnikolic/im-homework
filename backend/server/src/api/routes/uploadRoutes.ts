import { Router } from "express";
import { uploadImage } from "../controllers/uploadController";
import uploadMiddleware from "../middlewares/uploadMiddleware";

const router = Router();

router.route("/upload").post(uploadMiddleware, uploadImage);

export default router;
