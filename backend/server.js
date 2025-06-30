const express = require("express");
const cors = require("cors");
const mysql = require ("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sched',
});

db.connect(err => {
    if(err) throw err;
    console.log("MySQL connected...")
});

app.get('/api/items',( req,res)=> {
    db.query( "SELECT * FROM schedule ", ( err, results)=>{
        if (err)throw err;
        res.json(results);
    });
});

app.post('/api/items', (req,res)=> {
    const{Subject_Description, Day, Time, Room_Number} = req.body;
    db.query ("INSERT INTO schedule(Subject_Description, Day, Time, Room_Number) VALUES (?,?,?,?)",
     [Subject_Description, Day, Time, Room_Number], (err,result)=>{
        if(err) throw err;
        res.json ({id: result.inserted,})
    });
});


const PORT = 5002;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));




