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
      const fileName = (req as any).body.uploadId
        ? `${(req as any).body.uploadId}_${file.originalname}`
        : file.originalname;
      cb(null, fileName);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
});

const uploadMiddleware = upload.fields([{ name: "file", maxCount: 5 }]);

export default uploadMiddleware;
