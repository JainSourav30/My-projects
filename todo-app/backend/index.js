const express = require("express");
const mongoose = require("mongoose");
const app = express();
const {createTodo} = require("./types");
const {updateTodo} = require("./types");
const { todo } = require("./db");
const bodyParser = require('body-parser');
const cors = require("cors");

app.use(express.json());
app.use(bodyParser.json());
app.use(cors() );


// body {
    //title: string;
    //description: string; 
//}
app.post('/todo',async (req,res)=>{
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent the wrong inputs"
        });
        return;
    }
    await todo.create({
        title:createPayload.title,
        description:createPayload.description,
        completed:false
    });
    res.json({
        msg:"todo created"
    });
});



app.get('/todos',async (req,res)=>{
    const todos = await todo.find({});
    res.json(todos);

});
 
app.put('/completed ',async(req,res)=>{
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent the wrong inputs"
        });
        return;
    }
    await todo.update({
        _id: req.body.id
    },{
        completed: true
    }); 
    res.json({msg:"Todo marked as completed"});

});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
