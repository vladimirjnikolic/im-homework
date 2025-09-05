import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/upload", async (req: Request, res: Response) => {
  console.log("Received upload request");
  res.status(200);
  res.send("Image received and processed");
});

const port = process.env.PORT || 3001;
app
  .listen(port, () => {
    console.log(`\nServer listening to port ${port}`);
  })
  .on("error", (err: any) => {
    console.error(err);
    process.exit(1);
  });
