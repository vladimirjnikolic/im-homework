import { Request, Response } from "express";
import { getImageFromS3 } from "../../services/s3Service";

export const imageStatus = async (req: Request, res: Response) => {
  // Check if resized image exists in S3
  // If exists, return the signed URL
  // If not, return processing status
  const originalName = decodeURIComponent(req.query.fileName as string);
  const uploadId = (req as any).body.uploadId;
  if (!originalName || !uploadId) {
    return res.status(400).send("Missing fileName or uploadId parameter.");
  }

  const dotIndex = originalName.lastIndexOf(".");
  const nameWithoutExt =
    dotIndex !== -1 ? originalName.substring(0, dotIndex) : originalName;
  const ext = dotIndex !== -1 ? originalName.substring(dotIndex + 1) : "";
  const fileName = `${nameWithoutExt}_${uploadId}_resized${
    ext ? "." + ext : ""
  }`;

  const downloadUrl = await getImageFromS3(fileName);
  if (downloadUrl) {
    return res.send({ downloadUrl });
  }

  // Check if there is an error image
  const errorFileName = `${nameWithoutExt}_${uploadId}_error${
    ext ? "." + ext : ""
  }`;
  const errorUrl = await getImageFromS3(errorFileName);
  if (errorUrl) {
    return res.status(410).send("Image processing failed.");
  }
  res.status(304).send();
};
