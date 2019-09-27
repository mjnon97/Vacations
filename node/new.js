
var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser())


// app.use(cors({
//https://stackoverflow.com/questions/53002756/react-node-unable-to-pass-cookie-to-the-browser-crocs-error
//     'allowedHeaders': ['sessionId', 'Content-Type'],
//     'exposedHeaders': ['sessionId'],
//     'credentials': true,
//     'origin': ['http://localhost:3000', 'http://192.168.0.86:3000'], // here goes Frontend IP
// }))
myName6 = "test";

app.get('/reg', function (req, res) {
    res.cookie('m22', 's44')
    res.send('create myName')
})

app.get('/', function (req, res) {
    res.cookie('myName', 'shay', { maxAge: 110 })
    res.cookie('myName1', 'shay1')
    //res.cookie('myName3', 'shay2', { maxAge: 11900000000000000 })
    res.cookie('myName4', 'value', { expire: new Date(36 + Date.now()) });
    res.cookie(myName6, 'value', { expire: 40 + Date.now() });
    console.log(res.cookie(myName6, 'value', { expire: 40 + Date.now() }));
    res.send('create cookie myName')
})

app.get('/showCookie', function (req, res) {
    var cookie = req.cookies['myName4'];
    var cookie1 = req.cookies['myName6'];
    res.send(cookie)
    console.log(cookie, "ss")

})

app.get('/removeCookie', function (req, res) {
    res.clearCookie('myName', 'shay');
    res.send('remove cookie myName')

})

app.listen(4000, function () {
    console.log("Server Start");
})