import express from "express";
import { addOrder, deleteOrderById, deleteOrders, getOrder, getOrderById, updateOrderById } from "../controllers/orderController.js";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/verifyToken.js";

const orderRouter = express.Router();

orderRouter.post("/", verifyToken, addOrder);
orderRouter.get("/", verifyToken, getOrder);
orderRouter.get("/:userId", verifyToken, getOrderById);
orderRouter.delete("/:id", verifyToken, deleteOrderById);
orderRouter.delete("/", verifyToken, deleteOrders);
orderRouter.put("/:id", verifyToken, updateOrderById);

export default orderRouter