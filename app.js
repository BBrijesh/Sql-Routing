var express = require("express");
var mysql = require("mysql");
var bodyParser = require('body-parser');


var app = express();
app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({ extended: false }))


// DataBase Connection ....................................

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"userdata",
});

con.connect();

app.get('/' , function(req,res){
    res.sendFile(__dirname + '/index.html');
});


// app.get('/ejs' , function(req,res){
//     res.render('index');
// });

app.get('/ejs' , function(req,res){

    var select_query = "select * from table1";

    con.query(select_query , function(error,result,field){
        if(error) throw error;
        res.render("index",{result})
    })
});


app.post('/ejs' ,function(req,res){

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var insert_query = "insert into table1(name,email,password)values('"+ name +"','"+ email +"','"+ password +"')";
    

    con.query(insert_query , function(error,result,field){
        if(error) throw error;
        res.redirect('/ejs');
    })
}); 

app.get('/delete/:id',function(req,res){

    var id = req.params.id;

    var delete_query = "delete from table1 where id = "+id;

    con.query(delete_query , function(error,result,field){
        if(error) throw error;
        res.redirect('/ejs');
    })
});



app.listen(3000);