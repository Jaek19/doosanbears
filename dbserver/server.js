const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

db.connect((err)=>{
    if(err){
        console.error('DB Connect Error : ', err);
    }else{
        console.log('DB Connected!');
    }
})

app.get('/api/cheers', (req, res) => {
    db.query(
      'SELECT id, nickname, message, created_at AS createdAt FROM cheer ORDER BY created_at DESC',
      (err, result) => {
        if (err) {
          console.error('DB SELECT Error:', err);
          return res.status(500).json({ error: err.message });
        }
        res.json(result);
      }
    );
  });

app.post('/api/cheers', (req, res)=>{
    const {nickname, message} = req.body;
    db.query('INSERT INTO cheer(nickname, message) VALUES (?, ?)',[nickname, message],
        (err,result)=>{
            if(err){
                console.error('DB INSERT Error:', err);
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: result.insertId });
        }
    );

})

app.listen(8080, ()=>{
    console.log(`db connect success`);
})