const express = require('express');
const sessions = require('express-session');
const path = require('path');
const app = express();
const PORT = 65535;
const oneHour = 1000 * 60 * 60;
const myusername = 'T-mann';
const mypassword = '123';

var session;
var chat_messages = ["hei"];

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(sessions({
    secret: "tisisasecretkey",
    saveUninitialized: true, 
    cookie: {
        maxAge: oneHour
    }, 
    resave: false
}));

app.get('/', function (req, res) {
    session = req.session;
    if (session.userid){
        res.sendFile('public/chat.html', {root:__dirname});
    } else {
        res.sendFile('public/login.html', {root:__dirname});
    } 
});

app.get('/load_messages', function (req, res) {
    if (session.userid){
        res.json({liste: chat_messages});
    }
});

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/'); 
});

app.post('/ask', (req, res) => {
    var chat_message = req.body.chat_message;
    console.log("message is: ",chat_message);
    if (chat_message){
        chat_messages.push(chat_message);
        console.log("message sent");
        console.log(chat_messages);
        res.json({success: true});
    } else {
        res.json({success: false, message: "No message sent"});
    }
});

app.post('/user',(req,res) => {
    if (req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session);
        res.sendFile('public/chat.html', {root:__dirname});
    } else {
        res.send('Invalid username or password');
    }
});

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`)); 

app.listen(80);