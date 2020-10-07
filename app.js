const express = require("express");
const mysql = require("mysql");
const app = express();
const path = require("path");
const PORT = 3000; // port number

app.get('/index',(req,res) => {
    res.sendFile(path.join(__dirname + "/pages/index.html"));
});

const db = mysql.createConnection({
    host: "localhost",
    PORT: "3306",
    user: "root",
    password:"",
    database:"newdb",
});

db.connect((err)=>{
    if(!err){
        console.log("Connected to mysql")
    }else{
        console.log("Error")
    }
});

//create database
app.get("/createDB", (req, res) =>{
    let sql = "CREATE DATABASE newdb";
    db.query(sql,(err,result)=>{
        if(!err){
            res.send("Created newdb");
        }else{
            res.send("db fails");
        }
    });
});

//create table
app.get("/createTable", (req, res) =>{
    let sql = "CREATE TABLE students (id int AUTO_INCREMENT,fname VARCHAR(255), lname VARCHAR(255), PRIMARY KEY(id))";
    db.query(sql,(err,result)=>{
        if(!err){
            res.send("Created table students");
        }else{
            res.send("sad-franz");
        }
    });
});

//drop
app.get("/drop", (req, res) =>{
    let sql = "DROP TABLE students";
    db.query(sql,(err,result)=>{
        if(!err){
            res.send("Drop table students");
        }else{
            res.send("sad-aj");
        }
    });
});

//insert values

app.get("/insert", (req, res) =>{
    let newRow = {fname: "Yukino", lname: "Yukinoshita"};
    let sql = "INSERT INTO students SET ?";
    db.query(sql, newRow, (err, result)=>{
        if(!err){
            res.send("Added Values");
        }else{
            res.send("sad-coco");
        }
    
    });
});


//read
app.get("/read", (req, res) =>{
    let sql = "SELECT * FROM students ";
    db.query(sql, (err, result)=>{
        if(!err){
            res.send(result);
        }else{
            res.send("sad-jom");
        }
    
    });
});

//update
app.get("/update", (req, res) =>{
    let sql = "UPDATE students SET fname='Hachiman', lname='Hikigaya' WHERE id = 1";
    db.query(sql, (err, result)=>{
        if(!err){
            res.send(result);
        }else{
            res.send("sad-gaea");
        }
    
    });
});


//delete
app.get("/delete", (req, res) =>{
    let sql = "DELETE FROM students WHERE id = 1";
    db.query(sql, (err, result)=>{
        if(!err){
            res.send(result);
        }else{
            res.send("sad-codes");
        }
    
    });
});



app.listen(PORT,()=>{
    console.log(`Connected to port ${PORT}`);
}); 