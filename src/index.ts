import express, { Express, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import multer, { FileFilterCallback } from "multer";
import * as http from "http";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.route";
import disableRoutes from "./routes/disable.route";
import consistencyRoutes from "./routes/consistency.route";
import memberRoutes from "./routes/member.route";
import accomRoutes from "./routes/accom.route";

import connectDB from "./config/db";
import { notFound, errorHandler } from "./middleware/errorMiddleWare";
import { protect, verifyApiKey } from "./middleware/authMiddleware";
import { IRequest } from "./models/dto/request.dto";

connectDB();

const app: Express = express();
const server: http.Server = http.createServer(app);
const port: Number = process.env.PORT ? parseInt(process.env.PORT) : 3008;

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const fileStorage = multer.diskStorage({
  destination: (
    req: IRequest,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    cb(null, "./src/uploads");
  },
  filename: (
    req: IRequest,
    file: Express.Multer.File,
    cb: FileNameCallback
  ) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (
  req: IRequest,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype === "text/csv") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(multer({ storage: fileStorage, fileFilter }).single("fileData"));

app.use("/users", userRoutes);
app.use("/disables", protect, disableRoutes);
app.use("/consistencies", protect, consistencyRoutes);
app.use("/members", protect, memberRoutes);
app.use("/accommodation", verifyApiKey, accomRoutes);

app.get("/", (req: IRequest, res: Response) => {
  res.status(200).send("Server up and running!");
});

app.use(notFound);
app.use(errorHandler);

server.listen(port, () => console.log(`Server started on port ${port}`));
