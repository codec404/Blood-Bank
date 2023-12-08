import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import testRoute from "./routes/testRoute.js";
import authRoute from "./routes/authRoute.js";
import inventoryRoute from "./routes/inventoryRoute.js";
import analyticsRoute from "./routes/analyticsRoute.js";
import adminRoute from "./routes/adminRoute.js";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from 'url';

// .env configuration
dotenv.config();

// creating the app
const app = express();

//Database Connection
connectDb();

//Read JSON from request body -- Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Routes
app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/inventory", inventoryRoute);
app.use("/api/v1/analytics", analyticsRoute);
app.use("/api/v1/admin", adminRoute);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//STATIC FOLDER
app.use(express.static(path.join(__dirname, "./client/build")));

//STATIC ROUTE
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening to port number ${port}`);
});
