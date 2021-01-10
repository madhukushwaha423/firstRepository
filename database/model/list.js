const mongoose=require('mongoose');
const listSchema=mongoose.Schema({
    title:{
        type:String,
        trim:true,
        minlength:3
    }
})

const list=mongoose.model('list',listSchema);

module.exports=list;