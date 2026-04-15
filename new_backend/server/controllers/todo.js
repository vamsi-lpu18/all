const todo=require('../models/todo');

module.exports.create=async (req,res)=>{
    try {
        const{title,message,completed}=req.body;
        if(!title || !message){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        const newTodo =await todo.create({
            title,
            message,
            completed
        });
        await newTodo.save();
        console.log("Todo created successfully", newTodo);
       return res.status(201).json(newTodo);
    } catch (error) {
        
    }
} 
module.exports.getAll=async(req,res)=>{
    try {
        const todos=await todo.find();
        console.log("Todos fetched successfully", todos);
        return res.status(200).json(todos);
    } catch (error) {
        
    }
}
module.exports.deleteTodo=async(req,res)=>{
    try {
        const{id}=req.params;       
        await todo.findByIdAndDelete(id);
        console.log("Todo deleted successfully");
        return res.status(200).json({message:"Todo deleted successfully"});
    } catch (error) {
        
    }   
}
           