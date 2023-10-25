const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./middlewares/auth');
const Task = require('./models/Task')
require('dotenv').config();
require('./db');
const PORT = 8000;

app.use(cors());

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Task Manager API is working!'
    })
});

app.post('/register', async (req, res) => {
    
    try {
    const { name, email, password } = req.body;
    console.log(name)
    console.log(email)
    console.log(password)
        const user = new User({ name, email, password });
        const data=await user.save();
        console.log("user",user)
        console.log("data",data)
        res.json({ user, message: "User Register Successfully" });
    }

    catch (err) {
        console.log("error",err)
        res.json({ error: err });
    }

});
app.post('/login', async (req, res) => {
   try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if(!user){
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        console.log("fasle")
        res.json('false');
    }
    const token = jwt.sign({
        _id: user._id.toString()
    }, process.env.JWT_SECRET_KEY );
    res.json({ user, token , message: "Logged in successfully"});
   }
    catch (err) {
        res.json({ error: err.message });
    }
 });
 app.post('/task',auth, async (req, res) => {
    console.log("ok")
    try{
       const description=req.body.description
       console.log(description)
     // description, completed from req.body
     // owner : req.user._id
     const task = new Task({
        // description:description
         ...req.body,
         owner: req.user._id
     });
     console.log(task)
     const data1=await task.save();
     console.log("task",data1)
     res.status(201).json({task, message: "Task Created Successfully"});
    }
    catch(err){
          res.json({error: err});
    }
 });
 
 app.post('/usertask', auth, async (req, res) => {
    try{
        const tasks = await Task.find({
            owner: req.user._id
        })
        console.log(tasks)
        res.json({tasks, count: tasks.length, message: "Tasks Fetched Successfully"});
    }
    catch(err){
        res.json({error: err});
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});