import express from "express";
import { addAddress, deleteAddress, deleteAddressById, getAddress, getAddressById, getAddressByUserId, updateAddressById } from "../controllers/addressController.js";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/verifyToken.js";

const addressRouter = express.Router();

addressRouter.post("/", verifyToken, addAddress);
addressRouter.get("/", verifyTokenAndAdmin, getAddress);
addressRouter.get("/:userId", verifyToken, getAddressByUserId);
// addressRouter.get("/:id", verifyToken, getAddressById);
addressRouter.delete("/:id", verifyToken, deleteAddressById);
addressRouter.delete("/", verifyTokenAndAdmin, deleteAddress);
addressRouter.put("/:id", verifyToken, updateAddressById);

export default addressRouter