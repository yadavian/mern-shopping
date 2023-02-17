import express from "express";
import { addToCart, getCart, getCartById, deleteCartById, deleteCarts, updateCartById } from "../controllers/cartController.js";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/verifyToken.js";

const cartRouter = express.Router();

cartRouter.post("/", verifyTokenAndAuthorization, addToCart);
cartRouter.get("/", verifyTokenAndAdmin, getCart);
cartRouter.get("/:id", verifyTokenAndAuthorization, getCartById);
cartRouter.delete("/:id", verifyTokenAndAuthorization, deleteCartById);
cartRouter.delete("/", verifyTokenAndAdmin, deleteCarts);
cartRouter.put("/:id", verifyTokenAndAuthorization, updateCartById);

export default cartRouter