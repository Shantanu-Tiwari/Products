import mongoose from "mongoose";
import Product from "../models/product.model.js";

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch products" });
    }
};

// Create a new product
export const createProduct = async (req, res) => {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    if (isNaN(price) || price <= 0) {
        return res.status(400).json({ success: false, message: "Price must be a positive number" });
    }

    const newProduct = new Product({ name, price, image });

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in creating product:", error.message);
        res.status(500).json({ success: false, message: "Failed to create product" });
    }
};

// Update an existing product
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error in updating product:", error.message);
        res.status(500).json({ success: false, message: "Failed to update product" });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
        console.log("Error in deleting product:", error.message);
        res.status(500).json({ success: false, message: "Failed to delete product" });
    }
};
