const mongoose=require('mongoose');

mongoose.Promise=global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/taskmanager',{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:true,useFindAndModify:true}).then(()=>{
console.log("connected to Database")
}) 
.catch((error)=>{
  console.log("error");
});

module.export=mongoose;



