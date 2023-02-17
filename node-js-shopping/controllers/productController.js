import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
    console.log('req.files', req.file)
    try {
        let arrayOfFileNames = []
        await req.files.map((d, i) => {
            arrayOfFileNames.push(`product-images/${d.filename}`)
        })

        console.log('arrayOfFileNames', arrayOfFileNames)

        const newProduct = await new productModel({
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            productImages: arrayOfFileNames,
            categories: req.body.categories,
            size: req.body.size,
            color: req.body.color,
            prize: req.body.prize,
            ratings: req.body.ratings,
            discount: req.body.discount,
            productStock: req.body.productStock,
        });
        const savedProduct = await newProduct.save();
        return res.status(200).json({ success: true, msg: "NEW PROUCT ADDED SUCCESSFULLY.", data: savedProduct })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", error: error.message })
    }
}

const getProduct = async (req, res) => {
    // console.log('req.query', req.query)
    let products;
    try {
        if (req.query.categories) {
            products = await productModel.find({ categories: req.query.categories });
        } else {
            products = await productModel.find();
        }
        return res.status(200).json({ success: true, msg: "PROUCTS FETCHED SUCCESSFULLY.", data: products })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", error: error.message })
    }
}

const getProductById = async (req, res) => {
    try {
        const productById = await productModel.findById(req.params.id)
        return res.status(200).json({ success: true, msg: "PROUCT FETCHED BY ID SUCCESSFULLY.", data: productById })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", error: error.message })
    }
}

const getProductByCategory = async (req, res) => {
    try {
        console.log('req.params', req.params)
        const productByCategory = await productModel.find({ categories: req.params.catgoryName })
        return res.status(200).json({ success: true, msg: "PROUCT FETCHED BY CATEGORY SUCCESSFULLY.", data: productByCategory })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", error: error.message })
    }
}

const deleteProductById = async (req, res) => {
    try {
        const deleteProductById = await productModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({ success: true, msg: "PROUCT DELETED BY ID SUCCESSFULLY.", data: deleteProductById })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", error: error.message })
    }
}

const deleteProducts = async (req, res) => {
    try {
        const deleteProducts = await productModel.deleteMany()
        return res.status(200).json({ success: true, msg: "PROUCTS DELETED SUCCESSFULLY.", deleteProducts })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", error: error.message })
    }
}

const updateProductById = async (req, res) => {
    console.log('req.files', req.files)
    console.log('req.body', req.body)
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        )
        return res.status(200).json({ success: true, msg: "UPDATED PRODUCT BY ID SUCCESSFULLY.", data: updatedProduct })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", error: error.message })
    }
}


export { addProduct, getProduct, getProductByCategory, getProductById, deleteProductById, deleteProducts, updateProductById }