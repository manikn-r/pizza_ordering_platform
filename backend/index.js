import express from "express";
import cors from "cors";
import crypto from "crypto";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { type } from "os";

dotenv.config(); // Initialize dotenv

// const express = require("express");
// const cors = require("cors");
// const crypto = require("crypto");
// const Razorpay = require("razorpay");
// require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.listen("4050", () => {
    console.log("server started");

})
// Connect to MongoDB using the hidden string
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Successfully connected to MongoDB!");
    })
    .catch((err) => {
        console.error("❌ Error connecting to MongoDB:", err.message);
    });
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userName: {type: String, required: true},
    paymentId: { type: String, required: true },
    orderId: { type: String, required: true },
    items: { type: Array }, // Array of pizzas ordered
    createdAt: { type: Date, default: Date.now },
    amount:{type: Number}
});

const Order = mongoose.model("pizza_collection", orderSchema);

app.post("/makeOrder", (req, res) => {
    try {
        console.log(req.body);

        const options = {
            amount: req.body.amount,
            currency: "INR",
            receipt: `receipt_order_${Math.random() * 1000}`, // Unique receipt ID
        }
        // Initialize Razorpay Instance
        const razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        console.log(options);
        console.log(razorpayInstance);

        razorpayInstance.orders.create(options, (e, order) => {
            if (e) {
                res.status(500).send(e)
            } else {
                console.log(order);

                res.status(200).json({ data: order })
            }
        })

    } catch (e) {
        console.log("Server Error:", e.message);

        // FIX 2: Send e.message so you don't just get {} in your browser DevTools!
        res.status(500).json({ error: e.message });
    }
})

app.get("/getUsers", async (req, res)=>{
    const usersList = await Order.find()
    console.log(usersList);
    
    res.send(usersList);
})

app.post("/verifyPayment", (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            userId, cartItems, userName, amount
        } = req.body;
    console.log(req.body);

        const key_secret = process.env.RAZORPAY_KEY_SECRET;

        // Step 1: Create the string to be hashed
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", key_secret)
            .update(sign.toString())
            .digest("hex");
        if (expectedSignature === razorpay_signature) {
            // Signature matches: Payment is successful and authentic

            // TODO: Save payment details in your database here
            // e.g., update order status to "Paid"
            // C. SAVE TO MONGODB HERE!
            const newOrder = new Order({
                userId: userId,
                items: cartItems,
                userName: userName,
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
                amount: amount / 100
            });
            console.log("amount "+ amount);
            
            // console.log(newOrder);

            newOrder.save(); // This actually writes it to your database
            console.log("order added to DB");


            return res.status(200).json({
                success: true,
                message: "Payment verified successfully",
                payment_id: razorpay_payment_id
            });
        } else {
            // Signature doesn't match: Payment is either manipulated or failed
            return res.status(400).json({
                success: false,
                message: "Invalid signature, payment verification failed"
            });
        }
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: "Invalid signature, payment verification failed"
        });
    }
})