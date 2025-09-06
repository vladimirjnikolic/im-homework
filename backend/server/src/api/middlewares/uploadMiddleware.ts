import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.BUCKET_NAME!,
    metadata: function (req, file, cb) {
      cb(null, Object.assign({}, (req as any).body));
    },
    key: function (req, file, cb) {
      const originalName = file.originalname;
      const uploadId = (req as any).body.uploadId;
      const dotIndex = originalName.lastIndexOf(".");
      const nameWithoutExt =
        dotIndex !== -1 ? originalName.substring(0, dotIndex) : originalName;
      const ext = dotIndex !== -1 ? originalName.substring(dotIndex + 1) : "";
      const fileName = uploadId
        ? `${nameWithoutExt}_${uploadId}${ext ? "." + ext : ""}`
        : originalName;
      cb(null, fileName);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
});

const uploadMiddleware = upload.fields([{ name: "file", maxCount: 5 }]);

export default uploadMiddleware;
