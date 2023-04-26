import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer, { FileFilterCallback } from "multer";
import * as dotenv from "dotenv";
import * as http from "http";
import * as bodyparser from "body-parser";

import householdRoutes from "./routes/household.route";
import disableRoutes from "./routes/disable.route";
import consistencyRoutes from "./routes/consistency.route";

dotenv.config();

const app: Express = express();
const server: http.Server = http.createServer(app);
const port: Number = process.env.PORT ? parseInt(process.env.PORT) : 3008;

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const fileStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    cb(null, "./src/uploads");
  },
  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype === "text/csv") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(multer({ storage: fileStorage, fileFilter }).single("fileData"));
app.use(cors());

app.use("/households", householdRoutes);
app.use("/disables", disableRoutes);
app.use("/consistencies", consistencyRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Server up and running!");
});

mongoose
  .connect(process.env.MONGO_CLIENT as string)
  .then((result) => {
    console.log("connected");
    server.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
