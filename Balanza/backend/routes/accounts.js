const express = require('express');
const { Account, Transactions, User } = require('../db');
const { authMiddleware } = require('../middleware');
const AccountRouter = express.Router();
const mongoose = require('mongoose'); 


// Get account balance
AccountRouter.get('/balance',authMiddleware,async (req,res)=>{
    try {
        // console.log("User ID from Token:", req.userid);
        const account = await Account.findOne({ userId: req.userid });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.json({ balance: account.balance });
    } catch (error) {
        console.error("Error fetching balance:", error);
        res.status(500).json({ message: "facing some error", error: error.message });
    }
})

//Send money to another account
AccountRouter.post('/transfer',authMiddleware,async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    const {amount , to, transactiontype} = req.body;
    console.log(req.userid);
    const sender = await Account.findOne({userId:req.userid}).session(session);
    console.log(sender);
    if(!sender){
        await session.abortTransaction();
        return res.status(400).json({
            message:"cannot find the sender!"
        })
    }
    if(sender.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"insufficient balance"
        })
    }

    const reciever = await Account.findOne({userId:to}).session(session);
    if(!reciever){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid account details"
        })
    }
    await Account.updateOne({userId:req.userid},{$inc:{balance: -amount}}).session(session);
    await Account.updateOne({userId:to},{$inc:{balance: amount}}).session(session);
    const Reciever = await User.findOne({_id:to});
    const Rfirstname = Reciever.firstname;
    const Rlastname = Reciever.lastname;

    await Transactions.create({
        senderId:req.userid,
        recieverId:to,
        Amount:amount,
        TransactionType:transactiontype,
        recieverfirst:Rfirstname,
        recieverlast:Rlastname,
    });

    await session.commitTransaction();
    res.status(200).json({
        message:"Transfer Successful"
    })
})

//Getting Transaction of a single user
AccountRouter.get('/debit',authMiddleware,async(req,res)=>{
    try{
        const sender = req.userid;
        console.log(sender);
        const transactionarray = await Transactions.find({senderId:req.userid});
        res.json({transactionarray});
    }catch(error){
        console.error('No transactions available');
        res.status(500).json({ message: "facing some error", error: error.message });
    }
})


module.exports = AccountRouter;