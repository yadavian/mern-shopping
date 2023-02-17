import categoryModel from '../models/categoryModel.js';

const addCategory = async (req, res) => {
    try {
        const newCategory = new categoryModel({
            categoryName: req.body.categoryName,
            // categoryImage: `category-images/${req.file.filename}`
            categoryImage: `category-images/${req.file.filename}`
        });
        const savedCategory = await newCategory.save();
        return res.status(200).json({ success: true, msg: "NEW CATEGORY ADDED SUCCESSFULLY.", data: savedCategory })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const getCategory = async (req, res) => {
    try {
        const allCategories = await categoryModel.find();
        return res.status(200).json({ success: true, msg: "CATEGORIES FETCHED  SUCCESSFULLY.", data: allCategories })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const getCategoryById = async (req, res) => {
    try {
        const categoiesById = await categoryModel.findById(req.params.id)
        return res.status(200).json({ success: true, msg: "CATEGORY FETCHED SUCCESSFULLY.", data: categoiesById })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const deleteCategoryById = async (req, res) => {
    try {
        const deleteCategoryById = await categoryModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({ success: true, msg: "CATEGORY DELETED SUCCESSFULLY.", data: deleteCategoryById })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const deleteCategories = async (req, res) => {
    try {
        const deletedCategories = await categoryModel.deleteMany()
        return res.status(200).json({ success: true, msg: "CATEGORIES DELETED SUCCESSFULLY.", data: deletedCategories })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}

const updateCategoryById = async (req, res) => {
    try {
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        )
        return res.status(200).json({ success: true, msg: "CATEGORY UPDATED SUCCESSFULLY.", data: updatedCategory })
    } catch (error) {
        return res.status(400).json({ success: false, msg: "SOMETHING WENT WRONG.", data: error.message })
    }
}


export { addCategory, getCategory, getCategoryById, deleteCategoryById, deleteCategories, updateCategoryById }