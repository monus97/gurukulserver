const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
const connection = mongoose.connection;
connection.once('open',(req,res)=>{
    console.log("MongoDB Connected...");
});