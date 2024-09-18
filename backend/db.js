const mongoose = require('mongoose')

const connectToDataBase = async ()=>{
    try{
        await mongoose.connect(process.env.MONGOURL);
        console.log("Mongoodb connected successfully");
    }
    catch(error){ 
        console.log("Error while connecting database");
        console.log(error);
        
    }
}
module.exports=connectToDataBase;
