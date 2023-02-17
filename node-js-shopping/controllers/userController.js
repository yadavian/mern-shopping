import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import CryptoJS from "crypto-js";
import dotenv from 'dotenv'


dotenv.config();
const { CRYPTO_SECRET_KEY, JWT_SECRET_KEY } = process.env

const userRegister = async (req, res) => {

    console.log('req.file', req.files)
    console.log('req.body', req.body)
    try {
        // WITHOUT ENCRYPTION
        // const newUser = new userModel(req.body);

        const newUser = new userModel({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: CryptoJS.AES.encrypt(req.body.password, CRYPTO_SECRET_KEY).toString(),
            profileImage: req.file !== undefined ? `profile-images/${req.file.filename}` : ""
        });
        const savedUser = await newUser.save();
        return res.status(200).json({ success: true, msg: "USER REGISTERED SUCCESSFULLY.", data: savedUser })
    } catch (error) {
        return res.status(400).json({ success: false, msg: error.message, data: error.message })
    }
}


const verifyOtp = async (req, res) => {
    try {
        const user = await userModel.find({ phoneNumber: req.body.phoneNumber });
        if (user?.length > 0) {
            if (req.body.otp == 12345) {
                const { password, ...others } = user
                return res.status(200).json({ success: true, msg: "PHONE NUMBER VERIFIED SUCCESSFULLY.", data: user })
            } else {
                return res.status(400).json({ success: false, msg: "INVALID OTP." })
            }
        } else {
            return res.status(400).json({ success: false, msg: "USER NOT FOUND WITH THIS PHONE NUMBER." })
        }
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const userLogin = async (req, res) => {
    try {
        const fetchUser = await userModel.findOne({ email: req.body.email });
        if (fetchUser) {

            //WITH DECRYPTION
            const hashedPassword = CryptoJS.AES.decrypt(fetchUser.password, CRYPTO_SECRET_KEY);
            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8) // 12345 

            // WITHOUT DECRYPTION
            // if (fetchUser.password == req.body.password) {

            // EMAIL SE DATA FETCH KARKE USKA PASSWORD JO PASSWORD BHEJA H OOSE SE MATCH KARTE H
            if (originalPassword == req.body.password) {
                // SET ACCESS TOKEN WHEN LOGIN SUCCESS
                // PAYLOAD KE SATH KEY ENCRYPT KARTE HAI AUR JAB DECRYPT HIGA TOH PAYLOAD MILEGA
                const accessToken = jwt.sign(
                    {
                        id: fetchUser.id,
                        isAdmin: fetchUser.isAdmin
                    },
                    JWT_SECRET_KEY,
                    { expiresIn: "3d" })

                // FETCH USER VALID JSON NAHI H, MONGO OBJECT HAI ISLIYE USKO _DOC LAGAKE DESTRUCTURE KARTE H
                const { password, ...userWOPassword } = fetchUser._doc;
                res.header('Authorization', 'Bearer ' + accessToken);
                return res.status(200).json({ success: true, msg: "LOGGED IN SUCCESSFULLY.", data: { ...userWOPassword, accessToken } })
            } else {
                return res.status(400).json({ success: false, msg: "INCORRECT PASSWORD, PLEASE TRY AGAIN." })
            }
        } else {
            return res.status(400).json({ success: false, msg: "USER NOT FOUND." })
        }
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const userUpdateProfile = async (req, res) => {
    const { password, ...others } = req.body;
    
    console.log('>>>>>>>>>>>>>>>>>>')
    console.log('req.body', req.body)
    
    console.log('>>>>>>>>>>>>>>>>>>')
    console.log('req.file', req.files)

    const updatedProfile = { ...others, profileImage: `profile-images/${req.file.filename}` }

    console.log('>>>>>>>>>>>>>>>>>>')
    console.log('>>>>updatedProfile', updatedProfile)

    try {
        const updateBook = await userModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: updatedProfile
            },
            { new: true }
        )
        console.log('updateBook', updateBook)
        return res.status(200).json({ success: true, msg: "USER UPDATED SUCCESSFULLY.", data: updateBook })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({ success: true, msg: "USER DELETED SUCCESSFULLY.", data: deletedUser })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const deleteUsers = async (req, res) => {
    try {
        const deletedUser = await userModel.deleteMany()
        return res.status(200).json({ success: true, msg: "USER DELETED SUCCESSFULLY.", data: deletedUser })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const getUsers = async (req, res) => {
    try {
        const allUsers = await userModel.find();
        return res.status(200).json({ success: true, msg: "FETCHED ALL USERS SUCCESSFULLY.", data: allUsers })

    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        return res.status(200).json({ success: true, msg: "USER FETCHED SUCCESSFULLY.", data: user })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}


export { userRegister, userLogin, userUpdateProfile, deleteUser, deleteUsers, getUserById, verifyOtp, getUsers }