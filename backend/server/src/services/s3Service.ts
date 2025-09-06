import {
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
});

export const getImageFromS3 = async (fileName: string) => {
  try {
    // Check if the object exists
    await s3Client.send(
      new HeadObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
      })
    );

    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
    });

    return await getSignedUrl(s3Client, command);
  } catch (err) {
    return null;
  }
};
