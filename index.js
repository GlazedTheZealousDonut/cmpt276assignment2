const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
var pool;
pool = new Pool({ 
    connectionString: process.env.DATABASE_URL
});
pool.connect();
var app = express();

app.use(express.static(path.join(__dirname, '/public/')))
app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
app.get('/', (req, res) => {
    var tableCreationQuery = `CREATE TABLE IF NOT EXISTS public.tokimons (tid serial, name varchar(20), height int, weight int, flying int, fighting int, fire int, water int, electric int, ice int, total int, trainername varchar(20))`
    pool.query(tableCreationQuery, (error, result) => {
    });
    res.render('tokimon.ejs')
});
app.get('/add', (req, res) => res.render('add.ejs'))

app.get('/display', (req, res) => {
    var getUsersQuery = `SELECT * FROM tokimons`;
    pool.query(getUsersQuery, (error, result) => {
        if (error)
            res.end(error);
        var results = {'rows': result.rows };
        res.render('display.ejs', results)
    });
});

app.get('/display/:tid', (req,res) => {
    req.params.tid // we can grab the id from the request HTML
    var IDQuery = `SELECT * FROM tokimons WHERE tid=${req.params.tid}`;
    pool.query(IDQuery, (error, result) => {
        if (error)
            res.end(error);
        var results = {'rows': result.rows };
        res.render('modify.ejs', results)
    });
});

app.post("/update", function(req, res) {
    var changeQuery = `UPDATE tokimons SET name = '${req.body.name}', height = ${req.body.height}, weight = ${req.body.weight}, flying = ${req.body.flying}, fighting = ${req.body.fighting}, fire = ${req.body.fire}, water = ${req.body.water}, electric = ${req.body.electric}, ice = ${req.body.ice}, total = ${req.body.total}, trainername = '${req.body.trainerName}' WHERE tid = ${req.body.tid}`;

    pool.query(changeQuery, (error, result) => {
        if (error)
            res.end(error);
    });

    var getUsersQuery = `SELECT * FROM tokimons`;
    setTimeout(function(){
        pool.query(getUsersQuery, (error, result) => {
            if (error)
                res.end(error);
            var results = {'rows': result.rows };
            res.render('display.ejs', results)
        });
    }, 500);
    
});

app.get('/remove/:tid', (req,res) => {
    req.params.tid // we can grab the id from the request HTML
    var deleteQuery = `DELETE FROM tokimons WHERE tid=${req.params.tid}`;
    pool.query(deleteQuery, (error, result) => {
        if (error)
            res.end(error);
        res.render('delete.ejs')
    });
});

app.post("/submit", (req, res) => {
    
    var submitQuery = `INSERT INTO tokimons(name, height, weight, flying, fighting, fire, water, electric, ice, total, trainername) VALUES('${req.body.name}',${req.body.height},${req.body.weight},${req.body.flying},${req.body.fighting},${req.body.fire},${req.body.water},${req.body.electric},${req.body.ice},${req.body.total},'${req.body.trainerName}')`;
    
    pool.query(submitQuery, (error, result) => {
        if (error)
            res.end(error);
    });
    
    res.render('submit.ejs')
});