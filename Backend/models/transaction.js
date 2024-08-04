const mongoose=require('mongoose');
const transactionSchema=new mongoose.Schema({
    price:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    datetime:{
        type:Date,
        required:true
    }
})

const TransactionModel=new mongoose.model('Transaction',transactionSchema);

module.exports=TransactionModel;