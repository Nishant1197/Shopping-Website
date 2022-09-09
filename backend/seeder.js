import mongoose from "mongoose";
import dotenv from 'dotenv'
import users from "./data/users.js";
import products from "./data/products.js";
import User from './models/userModal.js'
import Order from "./models/orderModel.js";
import connectDb from './config/db.js'
import Product from "./models/productModel.js";

dotenv.config()
connectDb()

const importData=async()=>{
    try{
        //Removing all the records from all the collections
    
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        //adding all the user records in USER collection
     const createdUsers =   await User.insertMany(users)
      
     //fetch the id of the admin user from list of users 
     const adminUser = createdUsers[0]._id
    
     // Adding the id of admin user as a user property in product field to tell this admin user has created this product
     const sampleProducts= products.map(product=>{
         return {...product,user:adminUser}
     })
  
     //addind all the products records in PRODUCT collection
     await Product.insertMany(sampleProducts)

     console.log('Data imported!');
     //exit from the process
     process.exit()


    }
    catch(err)
    {
        console.log(error);

        //exit with failure
        process.exit(1)
    }
}



const destroyData=async()=>{
    try{
        //Removing all the records from all the collections

        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

   
     console.log('Data Destroyed!');
     //exit from the process
     process.exit()


    }
    catch(err)
    {
        console.log(error);

        //exit with failure
        process.exit(1)
    }
}

if(process.argv[2]==='-d'){
    destroyData()
}
else{
    importData()
}
