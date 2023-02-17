import express from "express";
import multer from "multer";
import { addCategory, deleteCategories, deleteCategoryById, getCategory, getCategoryById, updateCategoryById } from "../controllers/categoryController.js";
import { v4 as uuidv4 } from 'uuid';
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/verifyToken.js";

const categoryRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/category-images")
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, `${uuidv4()}-${originalname}`)
    }
})
const upload = multer({ storage })

categoryRouter.post("/", verifyTokenAndAdmin, upload.single("categoryImage"), addCategory);
categoryRouter.get("/", verifyToken, getCategory);
categoryRouter.get("/:id", verifyTokenAndAuthorization, getCategoryById);
categoryRouter.delete("/:id", verifyTokenAndAdmin, deleteCategoryById);
categoryRouter.delete("/", verifyTokenAndAdmin, deleteCategories);
categoryRouter.put("/:id", verifyTokenAndAdmin, upload.single("categoryImage"), updateCategoryById);

export default categoryRouter