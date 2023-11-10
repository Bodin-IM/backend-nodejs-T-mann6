const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080

var tasks = ["tøm oppvaskmaskinen", "gå med søpla"]

app.use(express.static('public'))
app.use(express.json())

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/hei', function (req, res) {
    res.send("hei!");
});

app.get('/load_tasks', function (req, res) {
    res.json({liste: tasks})
});

app.delete('/delete/:index', (req, res) => {
    var index = parseInt(req.params.index)
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1)
        res.json({success: true})
    } else {
        res.json({success: false})
    }
})

app.post('/ask', (req, res) => {
    var task = req.body.task;
    console.log(task)
    if (task){
        tasks.push(task)
        console.log("task added")
        console.log(tasks)
        res.json({success: true})
    } else {
        res.json({success: false, message: "No task sent"})
    }
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is succesfully running, and app is listening on port "+ PORT)
    else
        console.log("Error occurred, server can't start", error)    
});

app.listen(8);