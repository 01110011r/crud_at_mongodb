import mongoose from "mongoose";


export const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        maxLength:100,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        trim:true,
        unique:true
    }
});