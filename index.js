const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
var pool;
pool = new Pool({ 
    connectionString: 'postgres://tokimon:276assignment2@localhost/postgres'
});
pool.connect();
var app = express();

app.use(express.static(path.join(__dirname, '/public/')))
app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('tokimon.ejs'))
app.get('/add', (req, res) => res.render('add.ejs'))
app.get('/modify', (req, res) => res.render('modify.ejs'))
app.get('/delete', (req, res) => res.render('delete.ejs'))
app.get('/display', (req, res) => res.render('tokimon.ejs'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


app.post("/submit", function(req, res) {
    console.log(req.body.name);
    console.log(req.body.height);
    console.log(req.body.weight);
    console.log(req.body.flying);
    console.log(req.body.fighting);
    console.log(req.body.fire);
    console.log(req.body.water);
    console.log(req.body.electric);
    console.log(req.body.ice);
    console.log(req.body.total);
    console.log(req.body.trainerName);
    var getUsersQuery = `SELECT * FROM tokimons`;
    var submitQuery = `INSERT INTO tokimons(name, height, weight, flying, fighting, fire, water, electric, ice, total, trainername) VALUES('${req.body.name}',${req.body.height},${req.body.weight},${req.body.flying},${req.body.fighting},${req.body.fire},${req.body.water},${req.body.electric},${req.body.ice},${req.body.total},'${req.body.trainerName}')`;
    
    pool.query(submitQuery, (error, result) => {
        if (error)
            console.log(error);
        console.log ("should be success");
    });
    pool.query(getUsersQuery, (error, result) => {
    if (error)
      res.end(error);
    var results = {'rows': result.rows };
    console.log(results);
    });
    //res.send("hi");
    res.render('submit.ejs');
});

/*
app.post('/submit', (req,res) => {
    res.render(
    <iframe width="560" height="315" src="https://www.youtube.com/embed/rg6CiPI6h2g?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    );
    // var createTableQuery = `CREATE TABLE tokimon (
    //     tid serial,
    //     name varchar(max),
    //     height int,
    //     weight int,
    //     flying int,
    //     fighting int,
    //     fire int,
    //     water int,
    //     electric int,
    //     ice int,
    //     total int,
    //     trainerName varchar(max)
    // );`;

    // pool.query(createTableQuery, (error, result) => {
    //     if (error)
    //         res.end(error);
    // });

    var getQuery = `SELECT * FROM tokimons`;
    var submitQuery = `INSERT INTO tokimons (name, height, weight, flying, fighting, fire, water, electric, ice, total, trainername) VALUES ('${req.body.name}',${req.body.height},${req.body.weight},${req.body.flying},${req.body.fighting},${req.body.fire},${req.body.water},${req.body.electric},${req.body.ice},${req.body.total},'${req.body.trainerName}')`;
    console.log(getQuery);
    pool.query(getQuery, (error, result) => {
        // if (error)
        //     res.end(error);
        // var results = {'rows': result.rows[0] };
        console.log(result.rows[0]);
        res.render('pages/users', result.rows[0]);

    });

});
*/