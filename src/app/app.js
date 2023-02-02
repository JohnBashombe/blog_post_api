import fs from "fs";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import * as bodyParser from "body-parser";

import Routing from "./routes/index";
import port from "./helpers/portUtils";

require("dotenv").config();

const app = express();

const isProd = process.env.NOD_ENV === "production";
const logStream = fs.createWriteStream("combine.log", { flags: "a" });

app.use(cors());
app.use(
  morgan(isProd ? "combined" : "dev", { stream: isProd ? logStream : null })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Routing.run(app);

export const PORT = port;
export default app;
