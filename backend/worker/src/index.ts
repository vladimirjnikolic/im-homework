import sharp from "sharp";
import { getImageFromS3, uploadImageToS3 } from "./services/s3Service";
import { getMessage } from "./services/sqsService";

setInterval(async () => {
  try {
    const message = await getMessage();
    if (message) {
      console.log("Received message:", message.Body);
      const body = JSON.parse(message.Body as string);
      // Process the message here
      const imageBuffer = await getImageFromS3(body.fileName);
      let imageWidth: number;
      let imageHeight: number;
      switch (body.size) {
        case "qHD":
          imageWidth = 960;
          imageHeight = 540;
          break;
        case "HD":
          imageWidth = 1280;
          imageHeight = 720;
          break;
        case "HD+":
          imageWidth = 1600;
          imageHeight = 900;
          break;
        case "FHD":
          imageWidth = 1920;
          imageHeight = 1080;
          break;
        default:
          throw new Error("Invalid size");
      }

      const fileName = body.fileName.replace(
        /\.(jpg|jpeg|png)$/,
        "_resized.$1"
      );
      // Determine MIME type based on file extension
      let mimeType = "image/jpeg";
      if (fileName.endsWith(".png")) {
        mimeType = "image/png";
      } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
        mimeType = "image/jpeg";
      }

      try {
        const image = await sharp(imageBuffer)
          .resize(imageWidth, imageHeight)
          .toBuffer();
        await uploadImageToS3(image, fileName, mimeType);
      } catch (error) {
        await uploadImageToS3(
          Buffer.from("../error/error.png"),
          body.fileName.replace(/\.(jpg|jpeg|png)$/, "_error.$1"),
          mimeType
        );
      }
    }
  } catch (error) {
    console.error("Error receiving message:", error);
  }
}, 2000);
