import orderModel from "../models/orderModel.js"

// TODO : delete perticular product from order, add product in a order
const addOrder = async (req, res) => {
    console.log('req.body  =>>', req.body)
    let orderPrize = 0

    for (let i = 0; i < req.body.products.length; i++) {
        // console.log('req.body[i] ==>', req.body.products[i])
        let products = req.body.products[i];
        console.log('totalPrize', products.prize * products.quantity)
        orderPrize += products.prize * products.quantity
    }

    let updatedOrder = { ...req.body, amount: orderPrize }
    // console.log('updatedOrder', updatedOrder)

    try {
        const newOrder = new orderModel(updatedOrder)
        const savedOrder = await newOrder.save()
        return res.status(200).json({ success: true, msg: "NEW ORDER ADDED SUCCESSFULLY.", data: savedOrder })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const getOrder = async (req, res) => {
    try {
        let orders = await orderModel.find().populate('products')
        return res.status(200).json({ success: true, msg: "ORDERS FETCHED SUCCESSFULLY.", data: orders })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const getOrderById = async (req, res) => {
    try {
        const cartById = await orderModel.find({ userId: req.params.userId })
        return res.status(200).json({ success: true, msg: "ORDER FETCHED SUCCESSFULLY.", data: cartById })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const deleteOrderById = async (req, res) => {
    try {
        const deletedCart = await orderModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({ success: true, msg: "ORDER DELETED SUCCESSFULLY.", data: deletedCart })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const deleteOrders = async (req, res) => {
    try {
        const deletedCarts = await orderModel.deleteMany()
        return res.status(200).json({ success: true, msg: "ORDERS DELETED SUCCESSFULLY.", data: deletedCarts })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const updateOrderById = async (req, res) => {
    try {
        const updatedCart = new orderModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        return res.status(200).json({ success: true, msg: "ORDER UPDATED SUCCESSFULLY.", data: updatedCategory })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}


export { addOrder, getOrder, getOrderById, deleteOrderById, deleteOrders, updateOrderById }