import express from "express";
import cors from "cors";
import uploadRoutes from "./api/routes/uploadRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", uploadRoutes);

const port = process.env.PORT || 3001;
app
  .listen(port, () => {
    console.log(`\nServer listening to port ${port}`);
  })
  .on("error", (err: any) => {
    console.error(err);
    process.exit(1);
  });
