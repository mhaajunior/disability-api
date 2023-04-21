import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as http from "http";
import * as bodyparser from "body-parser";

import householdRoutes from "./routes/household.route";

dotenv.config();

const app: Express = express();
const server: http.Server = http.createServer(app);
const port: Number = process.env.PORT ? parseInt(process.env.PORT) : 3008;

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());
app.use(cors());

app.use("/households", householdRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Server up and running!");
});

mongoose
  .connect(process.env.MONGO_CLIENT as string)
  .then((result) => {
    server.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
