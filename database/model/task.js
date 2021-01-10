const mongoose=require('mongoose');

const taskSchema=mongoose.Schema({
    title:
    {
    type:String,
    trim:true,
    minlength:3
    },
    _listId:
    {
       type:mongoose.Types.ObjectId,
       require:true
    },
    completed:
    {
        type:Boolean,
        default:false,
        require:true
    }

})
const tasks=mongoose.model('tasks',taskSchema);
module.exports=tasks;