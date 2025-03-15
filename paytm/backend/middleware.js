const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('./config');

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({message:"Unauthorized"});
    }
    const token =  authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        if(decoded){
            req.userid = decoded.userid;
            next();
        }
        else{
            res.status(403).json({message:"can't find the balance for this account"});
        }
    }catch(e){
        return res.status(403).json({message:"facing some error"});
    }
};

module.exports={
    authMiddleware
};