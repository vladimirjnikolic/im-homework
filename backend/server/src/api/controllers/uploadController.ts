import { Request, Response } from "express";

export const uploadImage = async (req: Request, res: Response) => {
  res.send(
    "Successfully uploaded " + (req as any).files["file"].length + " files!"
  );
};
