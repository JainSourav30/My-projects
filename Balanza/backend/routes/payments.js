const express = require('express');
const zod = require('zod');
const { authMiddleware } = require('../middleware');
const { Transactions, TagSpending } = require('../db');
const PaymentRouter = express.Router();

PaymentRouter.post('/addpayment',authMiddleware,async(req,res)=>{
    try{
        const newtransaction = await Transactions.create({
            UserId:req.userid,
            Amount:req.body.amount,
            Tag:req.body.tag
        })
        const updatedSpending = await TagSpending.findOneAndUpdate({
            UserId:req.userid,Tag:req.body.tag
        },
        {$inc:{TotalSpent : req.body.amount}}
        );

        console.log(updatedSpending);
        res.status(200).json({
            message:"Payment addedSuccessfully"})
    }catch(error){
        res.status(403).json({message:"Couldn't get the payment for this tag"});
    }
})

PaymentRouter.get('/all',authMiddleware,async(req,res)=>{
    try {
        const tag = req.query.tag;  
        if (!tag) {
            return res.status(400).json({ message: "Tag is required" });
        }

        const transaction = await Transactions.findOne({ 
            UserId: req.userid, 
            Tag: { $regex: new RegExp(`^${tag}$`, "i") }  // Case-insensitive regex match
        });

        if (!transaction) {
            return res.status(404).json({ message: "No transactions found for this tag" });
        }

        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: "Error fetching transaction", error });
    }
});

//fetching Alltags data Here
PaymentRouter.get('/alltags',authMiddleware,async (req,res)=>{
    try{
        //console.log("UserID from Middleware:", req.userid);
        const Alltags = await TagSpending.find({UserId:req.userid}).select("Tag TotalSpent Goal");
        res.json({Alltags});

    }catch(error){
        res.status(403).json({message:"Couldn't get the following tag info"});
    }
});

//Getting single tag data here
PaymentRouter.get('/tagdata',authMiddleware,async(req,res)=>{
    try {
        const { tag } = req.query;
        if (!tag) {
            return res.status(400).json({ message: "Tag is required" });
        }

        // Find the tag for the authenticated user
        const singletagdata = await TagSpending.findOne({ UserId: req.userid, Tag: tag }).select("Tag TotalSpent");

        if (!singletagdata) {
            return res.status(404).json({ message: "No tag available for this user" });
        }

        res.status(200).json({singletagdata});

    } catch (error) {
        console.error("Error fetching tag data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

module.exports = PaymentRouter; 