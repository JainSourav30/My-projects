const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jainsourav194:G3ekqk8Ty4Bj4QyT@cluster0.tymp1.mongodb.net/paytm');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique : true,
        trim : true,
        lowercase : true,
        minLength:3,
        maxLength:30
    },
    firstname:{
        type:String,
        required:true,
        trim:true,
        maxLength:30
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength : 6
    }
})

const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }}
);

const TransactionsSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    Amount:{
        type:Number,
        required:true
    },
    TransactionType:{
        type:String,
        required:true
    },
    CurrentStatus:{
        type:String,
        enum:['Pending','Failed','Completed'],
        default:'Completed'
    },
    CreatedAt:{
        type:Date,
        default:Date.now
    }
});
const Account = mongoose.model('Account',accountSchema);
const User = mongoose.model('User',userSchema);
const Transactions = mongoose.model('Transactions',TransactionsSchema)

module.exports = {
    User,
    Account,
    Transactions
};