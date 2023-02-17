import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { addProduct, deleteProductById, deleteProducts, getProduct, getProductByCategory, getProductById, updateProductById } from "../controllers/productController.js";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/verifyToken.js";

const productRouter = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/product-images")
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, `${uuidv4()}-${originalname}`)
    }
})
const upload = multer({ storage })

productRouter.post("/", verifyTokenAndAdmin, upload.array("productImages"), addProduct);
productRouter.get("/", verifyToken, getProduct);
// productRouter.get("/:catgoryName", verifyToken, getProductByCategory);
productRouter.get("/:id", verifyToken, getProductById);
productRouter.delete("/:id", verifyTokenAndAdmin, deleteProductById);
productRouter.delete("/", verifyTokenAndAdmin, deleteProducts);
productRouter.put("/:id", verifyTokenAndAdmin, upload.array("productImages"), updateProductById);


export default productRouter