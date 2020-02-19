const express = require('express');
const app = express();
const port = process.env.PORT || 1234
const mysql = require('mysql');
const _ = require('lodash');
const async =require('async');
const bodyParser = require('body-parser');
const generateData = require('./generatefunction');
const { performance } = require('perf_hooks');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());



// post route to create a table with given sql schema.
app.post('/createtable', (req, res) => {
    const query = req.body;
    if ( ( query.split(" ")[0].toLowerCase() !== 'create') || (query.split(" ")[1].toLowerCase() !== 'table')) {
        return res.send("you can only create a table here. ");
    }

    const connection = mysql.createConnection({
        host: process.env.DB_WRITER_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_USER_PASSWORD || '',
        database: process.env.DB_NAME || 'god_service'
    });

    connection.query(query, (err, rows, fields) => {
        if (err) {
            return res.send(err);
        }
        return res.send([rows, fields]);
    });
});


app.get('/', (req, res) => {
    return res.send('success');
});

app.post("/query",(req,res)=>{
    const query = req.body;
    const connection = mysql.createConnection({
        host: process.env.DB_READER_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_USER_PASSWORD || '',
        database: process.env.DB_NAME || 'god_service'
    });
    let startQuery, endQuery;

    startQuery = performance.now();
    connection.query(query,(err,rows)=>{
        endQuery = performance.now();
        if(err){return res.send(err);}

        return res.send({
            status: 'success',
            QueryExecutionTime: endQuery - startQuery,
            length: rows && rows.length,
            entries: rows
        });
    });
  });


  //post route to create a fake data on a given table.

app.post("/generatedata/:tablename/:limit", (req,res)=>{
    const connection = mysql.createConnection({
        host: process.env.DB_WRITER_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_USER_PASSWORD || '',
        database: process.env.DB_NAME || 'god_service'
    });

    let tablename =req.params.tablename;
    let limit = parseInt(req.params.limit);
    let fields= [];
    
    async.waterfall([
        function (cb) {
            let query= `describe ${tablename}`;

            connection.query(query,(err,rows)=>{
                if(err){ return cb(err);}

                rows.shift();

               _.forEach(rows ,function(item){
                   fields.push(item.Field);
               });

               return cb(null, fields);
            });
        },
        function (fields, cb) {
            let sqlquery =`INSERT INTO ${tablename} (${fields.join(", ")}) VALUES ?`;

            async.timesSeries(limit/100, function(n, next){
               let dataset = [];

               for( j=0; j<100; j++){
                   let items= [];
                   _.forEach(fields, function(item){
                       items.push(generateData[`${item}Generate`].handler());
                   });
                   dataset.push(items);
               }
               connection.query(sqlquery, [dataset], (err)=>{
                   if(err){ return next(err);}
                   return next(null);
               });
            }, function (err) {
                return cb(err);
            });
        }
    ], function(err){
       if(err){return res.send(err)} 

       return res.send('success');
    });
});


app.listen(port, () => {
    console.log(`server is at port ${port}`);
});