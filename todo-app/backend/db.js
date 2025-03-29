const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://jainsourav194:G3ekqk8Ty4Bj4QyT@cluster0.tymp1.mongodb.net/todos?retryWrites=true&w=majority');

 const todoSchema = new mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
 });

 const todo = mongoose.model("todos",todoSchema);
 module.exports = {
    todo
 }