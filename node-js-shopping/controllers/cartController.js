import cartModel from "../models/cartModel.js"

// TODO : delete perticular product from cart, add product in a cart
const addToCart = async (req, res) => {
    try {
        const newCart = new cartModel(req.body)
        const savedCart = await newCart.save()
        return res.status(200).json({ success: true, msg: "NEW ITEM ADDED TO CART SUCCESSFULLY.", data: savedCart })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const getCart = async (req, res) => {
    try {
        let carts = await cartModel.find()
        return res.status(200).json({ success: true, msg: "CART FETCHED SUCCESSFULLY.", data: carts })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const getCartById = async (req, res) => {
    try {
        const cartById = await cartModel.find({ userId: req.params.userId })
        return res.status(200).json({ success: true, msg: "CART FETCHED SUCCESSFULLY.", data: cartById })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const deleteCartById = async (req, res) => {
    try {
        const deletedCart = await cartModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({ success: true, msg: "CART DELETED SUCCESSFULLY.", data: deletedCart })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const deleteCarts = async (req, res) => {
    try {
        const deletedCarts = await cartModel.deleteMany()
        return res.status(200).json({ success: true, msg: "CARTS DELETED SUCCESSFULLY.", data: deletedCarts })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const updateCartById = async (req, res) => {
    try {
        const updatedCart = new cartModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        return res.status(200).json({ success: true, msg: "CARTS UPDATED SUCCESSFULLY.", data: updatedCategory })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}


export { addToCart, getCart, getCartById, deleteCartById, deleteCarts, updateCartById }