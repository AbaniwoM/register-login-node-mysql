const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(express.json());
console.log(cors)
app.use(cors({
  origin: "http://localhost:3000",
  credentials:true
}));

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

db.connect((err) => {
  if(err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }

  console.log('Connected to MySQL successfully');
})

app.post('/signup', (req, res) => {
   const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
   const values = [
      req.body.name,
      req.body.email,
      req.body.password
   ]
   db.query(sql, [values], (err, data) => {
      if(err) {
        return res.json("Error");
      }
      return res.json(data);
   });
});

app.post('/login', (req, res) => {
  const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
     if(err) {
       return res.json("Error");
     }
     if(data.length > 0) {
       return res.json("Success");
     } else {
       return res.json("Failed");
     }
  });
});

app.listen(8081, () => {
    console.log("listening");
})