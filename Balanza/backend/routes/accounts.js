import express from 'express';
import mongoose from 'mongoose';

import { TagSpending, Transactions, User } from '../db.js';
import { authMiddleware } from '../middleware.js';

const AccountRouter = express.Router();


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
        const transactionarray = await Transactions.find({UserId:req.userid}).select("Amount Tag CreatedAt _id");
        res.json({transactionarray});
    }catch(error){
        console.error('No transactions available');
        res.status(500).json({ message: "facing some error", error: error.message });
    }
})

AccountRouter.delete('/:id', authMiddleware,async (req, res) => {
    const transactionId = req.params.id;
    const userId = req.userid; //setting this from auth middleware
    const {TagName,amount} = req.body;
    try {
        // 1. Delete the transaction
        const deletedTransaction = await Transactions.findOneAndDelete({
          _id: transactionId,
          UserId: userId
        });
    
        if (!deletedTransaction) {
          return res.status(404).json({ message: 'Transaction not found or not authorized' });
        }
    
        // 2. Decrement the TotalSpent from TagSpending
        await TagSpending.findOneAndUpdate(
          { UserId: userId, Tag: TagName },
          { $inc: { TotalSpent: -amount } }
        );
    
        res.status(200).json({ message: 'Transaction deleted and amount updated', deletedTransaction });
    
      } catch (error) {
        console.error('Error in deleting transaction or updating tag spending:', error);
        res.status(500).json({ message: 'Server error' });
      }
  });


export default AccountRouter;