const express = require('express');
var app = express();
var mysql = require('mysql');
var session = require('express-session')

var bodyParser = require('body-parser');
var jsdom = require('jsdom');
var http = require('http');
var Cookies = require('cookies');
var cookieParser = require('cookie-parser');
const cors = require("cors");
const socketIO = require('socket.io')


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "reactexam",
});

app.use(bodyParser.json());

app.use(cookieParser())

const port = 5000
const server = http.createServer(app)

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'credentials': true,
    'origin': ['http://localhost:3000', 'http://192.168.0.86:3000'], // here goes Frontend IP
}))
myName6 = "test";



//////////////////////
// find if a user in db and return the data
app.get('/Login', (req, res) => {
    var Email = req.query.Email;
    var Password = req.query.Password;
    var sql = `SELECT * FROM accounts WHERE Email LIKE ('${Email}') AND password LIKE ('${Password}')`;
    con.query(sql, async function (err, result, fields) {
        res.send(result);
    });
});
// get all info in user
app.get('/infouser', (req, res) => {
    var id = req.query.id;
    var sql = `SELECT * FROM accounts WHERE id LIKE ('${id}')`;
    con.query(sql, async function (err, result, fields) {
        res.send(result);
    });
});
// Register
app.get('/Register', async (req, res) => {

    var Email = req.query.Email;
    var Name = req.query.Name;
    var Password = req.query.Password;
    var Admin = "0";
    var sql = `INSERT INTO accounts (Email, Name, Password, Admin) VALUES ('${Email}','${Name}', '${Password}','${Admin}')`;
    con.query(sql, async function (err, result) {
        if (err) throw err;
    });
    res.send("success");
});

// save ID IN session
app.get('/setthesession', (req, res) => {
    var id = req.query.id;
    res.cookie('id', id, { maxAge: 11900000 });
    res.send('create cookie')
});
// find the session
app.get('/findthesession', (req, res) => {
    var cookieid = req.cookies['id'];
    res.send(cookieid);
});
// remove the cookie
app.get('/removeCookie', function (req, res) {
    res.clearCookie('id', '0');
    res.send('remove cookie myName')

})
// get all cards in vacation
app.get('/vacation', (req, res) => {
    con.query("SELECT * FROM vacation", async function (err, result, fields) {
        res.send(result);

    });
});
// add Follow in vacation accoun
app.get('/AddFollow', async (req, res) => {

    var iduser = req.query.iduser;
    var idvacation = req.query.idvacation;
    var location = req.query.location;
    var sql = `INSERT INTO users_vacation (iduser, idvacation, location) VALUES ('${iduser}','${idvacation}', '${location}')`;
    con.query(sql, async function (err, result) {
        if (err) throw err;
    });
    res.send("success");
});
// delet Follow in vacation accoun
app.get('/deletFollow', async (req, res) => {
    var id = req.query.id;
    var idvacation = req.query.idvacation;
    var sql = `DELETE FROM users_vacation WHERE users_vacation.iduser = ${id} AND users_vacation.idvacation = ${idvacation}`;
    con.query(sql, async function (err, result) {
        if (err) throw err;
    });
    res.send("Delete Vacation is success");
});
// My Vacation
app.get('/MyVacation', (req, res) => {
    var id = req.query.id;
    var sql = `SELECT vacation.id, vacation.location,users_vacation.iduser,vacation.imge ,vacation.start_date ,vacation.end_date, vacation.price FROM vacation INNER JOIN users_vacation ON vacation.id=users_vacation.idvacation ;`;
    con.query(sql, async function (err, result, fields) {
        var arr = [];
        for (let i = 0; i < result.length; i++) {
            if (id == result[i].iduser) {
                arr.push(result[i]);
            };
        };
        res.send(arr);
    });
});

// home a card folows
// My CheckVaction
app.get('/CheckVaction', (req, res) => {
    var id = req.query.id;
    var idvacation = req.query.idvacation;
    var sql = `SELECT * FROM users_vacation WHERE iduser = ${id} AND idvacation = ${idvacation}`;
    con.query(sql, async function (err, result, fields) {
        res.send(result);
    });
});





// /////////////////////////////////////////////ADMIN


app.get('/DeleteVacation', async (req, res) => {
    var id = req.query.id;
    var sql = `DELETE FROM vacation WHERE vacation.id = ${id}`;
    con.query(sql, async function (err, result) {
        if (err) throw err;
    });
    res.send("Delete Vacation is success");
});

// add Vacation in vacations accoun
app.get('/AddVacation', async (req, res) => {
    var HOTEL = req.query.HOTEL;
    var LOCATION = req.query.LOCATION;
    var PRICE = req.query.PRICE;
    var IMGE = req.query.IMGE;
    var START_DATE = req.query.START_DATE;
    var END_DATE = req.query.END_DATE;
    var sql = `INSERT INTO vacation (location,hotel, price, imge,start_date,end_date) VALUES ('${LOCATION}','${HOTEL}','${PRICE}', '${IMGE}', '${START_DATE}', '${END_DATE}')`;
    con.query(sql, async function (err, result) {
        if (err) throw err;
    });
    res.send("success");
});

// update Vacation  in vacations 
app.get('/updateVacation', async (req, res) => {
    var id = req.query.id;
    var HOTEL = req.query.HOTEL;
    var LOCATION = req.query.LOCATION;
    var PRICE = req.query.PRICE;
    var IMGE = req.query.IMGE;
    var START_DATE = req.query.START_DATE;
    var END_DATE = req.query.END_DATE;
    var sql = `UPDATE vacation SET location = '${LOCATION}',hotel = '${HOTEL}', start_date = '${START_DATE}', end_date = '${END_DATE}', imge = '${IMGE}', price = ${PRICE} WHERE   vacation.id = ${id};`;
    con.query(sql, async function (err, result) {
        if (err) throw err;
    });
    res.send("success");
});


// join in grafh
app.get('/MyGrafh', (req, res) => {
    var id = req.query.id;
    var sql = `SELECT * From users_vacation`;
    con.query(sql, async function (err, result, fields) {
        res.send(result);
    });
});



server.listen(port, () => console.log(`Listening on port ${port}`))
