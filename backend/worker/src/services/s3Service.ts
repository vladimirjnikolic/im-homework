import {
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
});

export const getImageFromS3 = async (fileName: string): Promise<Buffer> => {
  const bucketName = process.env.BUCKET_NAME!;
  try {
    // Check if the object exists
    await s3Client.send(
      new HeadObjectCommand({
        Bucket: bucketName,
        Key: fileName,
      })
    );

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileName,
    });

    const response = await s3Client.send(command);

    if (!response.Body) {
      throw new Error("No body in S3 response.");
    }

    // response.Body is a ReadableStream in Node.js
    const chunks: Buffer[] = [];
    for await (const chunk of response.Body as any) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
  } catch (err) {
    console.error("Error getting image from S3:", err);
    throw err;
  }
};

export const uploadImageToS3 = async (
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
) => {
  const bucketName = process.env.BUCKET_NAME!;
  try {
    const uploadParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: fileBuffer,
      ContentType: mimeType,
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);
    console.log(`File uploaded successfully. ${fileName}`);
  } catch (err) {
    console.error("Error", err);
    throw err;
  }
};
