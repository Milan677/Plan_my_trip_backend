const express=require("express");
const userRouter=express.Router();

const{tripModel}=require("../model/user");

//..... create a new trip.........
userRouter.post("/",async(req,res)=>{
    try {
        const post=new tripModel(req.body);
        await post.save();
        res.status(201).json({"msg":"new post created"})
    } catch (error) {
       res.status(400).json({"msg":"something went wrong","message":error.message}) 
    }
});

//....... retrive all trip.......
userRouter.get("/",async(req,res)=>{
    try {
        const posts= await tripModel.find();
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json({"msg":"something went wrong","message":error.message}) 
    }
})

//...... delete a post.....
userRouter.delete("/:id",async(req,res)=>{
    try {
        const deletedPost=await tripModel.findByIdAndDelete({_id:req.params.id});
        res.status(200).json(deletedPost)
    } catch (error) {
        res.status(400).json({"msg":"something went wrong","message":error.message}) 
    }
})
//....... filter and sort.......
userRouter.get("/filter-sort",async(req,res)=>{
    try {
        const{destination,sortBy}=req.query;
        const filteredData=destination?{destination}:{};
        const sort = sortBy === 'Desc' ? { budget: -1 } : sortBy === 'Asc' ? { budget: 1 } : {};
        const data=await tripModel.find(filteredData).sort(sort);
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({"msg":"something went wrong","message":error.message}) 
    }
})

module.exports={userRouter}