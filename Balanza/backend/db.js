import mongoose from 'mongoose';
import { number } from 'zod';

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
    },
    customtags:[{type:String}]
})

// const accountSchema = new mongoose.Schema({
//     userId:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref:'User',
//         required:true
//     },
//     balance:{
//         type:Number,
//         required:true
//     }}
// );

const TransactionsSchema = new mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    Amount:{
        type:Number,
        required:true
    },
    Tag:{
        type:String,
        required:true
    },
    CreatedAt:{
        type:Date,
        default:Date.now
    }
    // SChema to include when transactions on app are functional

        // senderId:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'User',
        //     required:true
        // },
        // recieverId:{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'User',
        //     required:true
        // },
        // recieverfirst:{
        //     type:String,
        //     required:true
        // },
        // recieverlast:{
        //     type:String,
        //     required:true
        // },
        // CurrentStatus:{
        //     type:String,
        //     enum:['Pending','Failed','Completed'],
        //     default:'Completed'
        // },
});
const TagSchema = new mongoose.Schema({
    Tag:{
        type:String,
        required:true
    },
    TotalSpent:{
        type:Number,
        default:0
    },
    Goal:{
        type:Number,
        default:2000
    },
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    History: [
        {
            month: String,  
            year: Number,   
            amount: {
                type:Number,
                default:0
            }  
        }
    ]
})

//const Account = mongoose.model('Account',accountSchema);
const User = mongoose.model('User',userSchema);
const Transactions = mongoose.model('Transactions',TransactionsSchema)
const TagSpending = mongoose.model('TagSpending',TagSchema)

export { User, Transactions, TagSpending };