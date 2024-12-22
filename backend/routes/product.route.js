import express from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";



app.get("/",(req,res)=>{
    res.send("Server is ready");
});

app.get("/", async (req, res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    }catch(error){
        console.log("error in fetching products", error.message)
        res.status(500).json({success:false, message: "Server Error"});
    }
})
app.patch("/:id", async (req,res)=>{
    const{id}= req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.stat(404).json({success:false, message:"Invalid ID"})
    }
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success: true, data: updatedProduct});
    }catch (error){
        res.status(500).json({success:false, message: "Server Error"});
    }
})

app.post("/", async (req,res)=>{
    const product = req.body;
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message: "Please provice all fields"});
    }
    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct});
    } catch (error){
        console.error("Error in create product ", error.message);
        res.status(500).json({success:false, message: "Server Error"});

    }
});
app.delete("/:id", async (req,res) => {
    const {id} = req.params;
    console.log("id:", id);
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Product Deleted"});
    }catch (error){
        res.status(404).json({success:false, message: "Product not found"})
    }
});