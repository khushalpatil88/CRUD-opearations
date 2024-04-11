const connection=require('./connection');
const express= require('express');
const bodyparser = require('body-parser');

var app = express();
app.use(bodyparser.json())

app.get('/employees',(req,res)=>{
    connection.query('SELECT * FROM employee',(err,rows)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(rows);
        }
    })
})

app.get('/employees/:id',(req,res)=>{
    connection.query('SELECT * FROM employee WHERE id=?',[req.params.id],(err,rows)=>{
        if(err){
            console.log(err)
        }else{
            res.send(rows);
        }
    })
})

app.delete('/employees/:id',(req,res)=>{
    connection.query('DELETE FROM employee WHERE id=?',[req.params.id],(err,rows)=>{
        if(err){
            console.log(err)
        }else{
            res.send(rows);
        }
    })
})

app.post('/employees', (req, res) => {
    var emp = req.body;
    var values = [emp.name, emp.salary]; 

    connection.query('INSERT INTO employee(name, salary) VALUES(?, ?)', values, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error inserting employee");
        } else {
            res.status(200).send("Employee inserted successfully");
        }
    });
});

app.patch('/employees', (req, res) => {
    var emp = req.body;
    connection.query('UPDATE employee set ? WHERE id='+emp.id,[emp], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error inserting employee");
        } else {
            res.status(200).send("Employee inserted successfully");
        }
    });
});

app.put('/employees', (req, res) => {
    var emp = req.body;
    connection.query('UPDATE employee set ? WHERE id='+emp.id,[emp], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error inserting employee");
        } else {
             if(rows.affectedRows==0){
                var values = [emp.name, emp.salary]; 
 
             connection.query('INSERT INTO employee(name, salary) VALUES(?, ?)', values, (err, rows) => {
             if (err) {
             console.log(err);
            res.status(500).send("Error inserting employee");
        } else {
            res.status(200).send("Employee inserted successfully");
        }
    });

            }else{
                res.status(200).send("Employee inserted successfully");
              }
           
        }
    });
});

app.listen(8000,()=>{
    console.log('express server is runninf on port 8000');
})