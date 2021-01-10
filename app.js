const express=require('express');

const app=express();

const cors=require('cors');

const mongoose=require('./database/mongoose');

const list=require('./database/model/list');
const tasks=require('./database/model/task');

app.use(express.json());
app.use(cors());
/*
List: create,update,readall,Readone,delete
Task: create,update,readall,Readone,delete
*/
app.post('/lists',(req,res)=>{
    new list({title:req.body.title}).save()
    .then(task=>res.send(task))
    .catch((error)=>console.log(error));
})

app.get('/lists',(req,res)=>{
    list.find({})
    .then(lists=>{res.send(lists)})
    .catch((error)=>console.log(error));
});

app.get('/lists/:listId',(req,res)=>{
    list.find({_id:req.params.listId})
    .then(lists=>res.send(lists))
    .catch((error)=>console.log(error));
});

app.patch('/lists/:listId',(req,res)=>{
    list.findOneAndUpdate({'_id':req.params.listId},{$set:req.body})
    .then(lists=>res.send(lists))
    .catch((error)=>console.log(error));
})
app.delete('/lists/:listId',(req,res)=>{
    const deleteTask=(list)=>{
        tasks.deleteMany({_listId:list._id})
        .then(()=>list)
        .catch((error)=>console.log(error))
    };
list.findByIdAndDelete(req.params.listId)
    .then((list)=>res.send((deleteTask(list))))  
    .catch((error)=>console.log(error))
 
    });

/*Task List*/
app.get('/lists/:listId/tasks',(req,res)=>{
    tasks.find({_listId:req.params.listId})
    .then(tasks=>res.send(tasks))
    .catch((error)=>console.log(error))
})
app.post('/lists/:listId/tasks',(req,res)=>{
    (new tasks({'_listId':req.params.listId,'title':req.body.title}))
    .save()
    .then(tasks=>res.send(tasks))
    .catch((error)=>console.log(error));
})

app.get('/lists/:listId/tasks/:taskId',(req,res)=>{
    tasks.findOne({'_listId':req.params.listId,'_id':req.params.taskId})
    .then(tasks=>res.send(tasks))
    .catch((error)=>console.log(error))
})

app.patch('/lists/:listId/tasks/:taskId',(req,res)=>{
    tasks.findOneAndUpdate({'_listId':req.params.listId,'_id':req.params.taskId},{$set:req.body})
    .then(tasks=>res.send(tasks))
    .catch((error)=>console.log(error))
})

app.delete('/lists/:listId/tasks/:taskId',(req,res)=>{
    tasks.findOneAndDelete({'_listId':req.params.listId,'_id':req.params.taskId})
    .then(tasks=>res.send(tasks))
    .catch((error)=>console.log(error))
})



app.listen(3000,()=>{console.log("Server is running at Port number 3000")});





