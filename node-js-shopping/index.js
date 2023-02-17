import express, { application } from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/mongoDbConfig.js";
import userRouter from "./routers/userRouter.js";
import multer from "multer";
import bodyParser from "body-parser";
import cors from 'cors'
import categoryRouter from "./routers/categoryRouter.js";
import productRouter from "./routers/productRouter.js";
import cartRouter from "./routers/cartRouter.js";
import orderRouter from "./routers/orderRouter.js";
import path from 'path'
import addressRouter from "./routers/addressRouter.js";
const __dirname = path.resolve();

dotenv.config();
const { PORT } = process.env;

connectDatabase();
const app = express();
app.use(cors())

// POSTMAN ME JSON DATA REQ.BODY ME NAHI AATA JAB TAK YE NAHI LIKHTE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static("uploads"));
const directory = process.cwd()+"/uploads/"
app.use(express.static(directory))

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/address", addressRouter);

app.get("/api/test", async (req, res) => {
  return res.json({
    status: true,
    msg: "APP RUNNING",
  });
});

app.listen(PORT, () => {
  console.log(
    `\n################### BACKEND API RUNNING AT localhost:${PORT}/api ###################`
  );
});
