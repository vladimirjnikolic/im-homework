import { Router } from "express";
import { uploadImage } from "../controllers/uploadController";
import uploadMiddleware from "../middlewares/uploadMiddleware";
import { imageStatus } from "../controllers/downloadController";

const router = Router();

router.route("/upload").post(uploadMiddleware, uploadImage);
router.route("/check-status").get(imageStatus);

export default router;
