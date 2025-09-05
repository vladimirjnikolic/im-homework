import { Request, Response } from "express";
import { sendMessage } from "../../services/sqsService";

type RequestWithFiles = Request & {
  files: { [fieldname: string]: Express.Multer.File[] };
};

export const uploadImage = async (req: Request, res: Response) => {
  if (
    !(req as RequestWithFiles).files ||
    (req as RequestWithFiles).files["file"].length === 0
  ) {
    return res.status(400).send("No files were uploaded.");
  } else {
    try {
      await sendMessage(
        req.body.size,
        req.body.uploadId,
        (req as RequestWithFiles).files["file"].map((f: any) => f.key)
      );
    } catch (error) {
      console.error("Error sending message to SQS:", error);
      return res.status(500).send("Error processing upload.");
    }
  }
  res.send(
    "Successfully uploaded " + (req as any).files["file"].length + " files!"
  );
};
