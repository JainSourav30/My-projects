const express = require('express');
const {JWT_SECRET} = require('../config');
const jwt = require('jsonwebtoken');
const zod = require('zod');
const {User, Account, TagSpending} = require('../db.js')
const {authMiddleware} = require('../middleware');

const UserRouter= express.Router();


// Creating zod object to verify signup body
const signupbody = zod.object({
    username:zod.string().trim().email(),
    firstname:zod.string().trim(),
    lastname:zod.string().trim(),
    password:zod.string().trim()
});
const tags =['Food','Travel','Shopping','Subscriptions','Utilities','Groceries','Others']

UserRouter.post('/signup',async(req,res)=>{
    const parsedBody = signupbody.safeParse(req.body);

    if (!parsedBody.success) {
        console.log("Validation Failed:", parsedBody.error);
        return res.status(411).json({ message: "Invalid inputs", error: parsedBody.error });
    }

    //First checkpoint to validate the input
    // if(!success){
    //     return res.status(411).json({
    //         message:"Email already taken / Incorrect inputs"
    //      })
    // }

    //Checking if user already exists
    const existinguser = await User.findOne({
        username:req.body.username
    });
    if(existinguser){
        return res.status(409).json({
            message:"User already exists!"
        })
    }
    
    //Creating a new user
    const newuser = await User.create({
        username:req.body.username,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        password:req.body.password
    })
    // await newuser.save();
    const userid = newuser._id; // Mongo Db return ._id and not .id
    //The function inside map() is async, but map() itself does not handle Promises.
    // tags.map(async(tag,index)=>{
    //     await TagSpending.create({
    //         UserId:userid,
    //         Tag:tag,
    //     })
    // })

    for(const tag of tags){
        await TagSpending.create({
                UserId:userid,
                Tag:tag,
        })
    }


    // await Account.create({
    //     userId:userid, //Use the returned user id to create account mapping to same person
    //     balance: 1 + Math.random()*10000
    // })
    
    // const token = jwt.sign({
    //     userid
    // },JWT_SECRET);
    // Checks : console.log(req.body.username);
    // Checks : console.log("🔑 JWT_SECRET is:", JWT_SECRET);
    const token = jwt.sign({ userid }, JWT_SECRET);
    // Checks : console.log("✅ Generated Token:", token);

    res.status(200).json({
        message:"User created Successfully",
        token:token
    })

});

//zod object for signin body
const signinbody = zod.object({
    username:zod.string().email(),
    password:zod.string()
})

UserRouter.post('/signin',async (req,res)=>{
    const body = req.body;
    const {success} = signinbody.safeParse(body);
    if(!success){
        return res.status(401).json({
            message:"Invalid SignIn details!"
        })
    }

    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })

    if(user){
        const token = jwt.sign({
            userid: user._id
        },JWT_SECRET)

        res.json({
            token:token,
            firstname:user.firstname,
            lastname:user.lastname
        })
        return;
    }

    res.status(409).json({
        message:"Error while logging in"
    })
})

// Information update zod object
const updateinfo = zod.object({
    firstname:zod.string().optional(),
    lastname:zod.string().optional(),
    password:zod.string().optional()
})

//Update user info
UserRouter.put('/',authMiddleware,async(req,res)=>{
    const {success} = updateinfo.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        });
    }
    await User.updateOne({_id:req.userid},req.body);
    res.status(200).json({
        message:"Updated Successfully!"
    })
})


//Get user info
// Implement debouncing here
UserRouter.get('/bulk', async(req,res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
        $or:[
            {firstname:{$regex:filter, $options:"i"}},
            {lastname:{$regex:filter, $options:"i"}}
        ]
    });
    
    res.json({
        user:users.map((user)=>({
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            _id:user._id
        }))
    })
})

module.exports = UserRouter; 