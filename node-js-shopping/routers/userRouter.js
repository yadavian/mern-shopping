import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { deleteUser, deleteUsers, getUserById, getUsers, userLogin, userRegister, userUpdateProfile, verifyOtp } from "../controllers/userController.js";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/verifyToken.js";

const userRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/profile-images")
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, `${uuidv4()}-${originalname}`)
    }
})
const upload = multer({ storage })

userRouter.post("/register", upload.single("profilePicture"), userRegister);
userRouter.post('/verify-otp', verifyOtp)
userRouter.post('/login', userLogin)
userRouter.get('/', verifyTokenAndAdmin, getUsers)
userRouter.get('/:id', verifyTokenAndAuthorization, getUserById)
userRouter.put("/:id", verifyTokenAndAuthorization, upload.single("profilePicture"), userUpdateProfile);
userRouter.delete('/:id', verifyTokenAndAuthorization, deleteUser)
userRouter.delete('/', verifyTokenAndAdmin, deleteUsers)


userRouter.get("/test-router", async (req, res) => {
    return res.json({
        status: true,
        msg: "USER ROUTER RUNNING",
    });
});

export default userRouter;
