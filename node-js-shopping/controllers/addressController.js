import addressModel from "../models/addressModel.js"

// TODO : delete perticular product from cart, add product in a cart
const addAddress = async (req, res) => {
    try {
        const newAddress = new addressModel(req.body)
        const savedAddress = await newAddress.save()
        return res.status(200).json({ success: true, msg: "NEW ADDRESS ADDED SUCCESSFULLY.", data: savedAddress })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const getAddress = async (req, res) => {
    try {
        let addresses = await addressModel.find()
        return res.status(200).json({ success: true, msg: "ADDRESS FETCHED SUCCESSFULLY.", data: addresses })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const getAddressByUserId = async (req, res) => {
    try {
        const addressById = await addressModel.find({ userId: req.params.userId })
        console.log('addressById', addressById)
        return res.status(200).json({ success: true, msg: "ADDRESS FETCHED SUCCESSFULLY.", data: addressById })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const getAddressById = async (req, res) => {
    try {
        const addressByUserId = await addressModel.findById(req.params.id)
        return res.status(200).json({ success: true, msg: "ADDRESS FETCHED SUCCESSFULLY.", data: addressByUserId })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const deleteAddressById = async (req, res) => {
    try {
        const deletedAddress = await addressModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({ success: true, msg: "ADDRESS DELETED SUCCESSFULLY.", data: deletedAddress })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const deleteAddress = async (req, res) => {
    try {
        const deletedAddress = await addressModel.deleteMany()
        return res.status(200).json({ success: true, msg: "ALL ADDRESS DELETED SUCCESSFULLY.", data: deletedAddress })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const updateAddressById = async (req, res) => {
    try {
        const updatedAddress = await addressModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        return res.status(200).json({ success: true, msg: "ADDRESS UPDATED SUCCESSFULLY.", data: updatedAddress })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}


export { addAddress, getAddress, getAddressByUserId, getAddressById, deleteAddress, deleteAddressById, updateAddressById }