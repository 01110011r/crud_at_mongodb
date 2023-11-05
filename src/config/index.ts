import mongoose from "mongoose";


export async function mongoConnect(url:string) {
 try {
    await mongoose.connect(url);
    return mongoose;
 } catch (error:any) {
    console.log(error.message);
    return error;
 }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};