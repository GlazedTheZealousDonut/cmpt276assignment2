const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000
/*
const {POOL} = require('pg');
var pool;
pool = new pool({ connectionString: process.env.DATABASE_URL});
*/
var app = express();

app.use(express.static(path.join(__dirname, '/public/')))
app.use(express.urlencoded({ extended:false }))
app.use(express.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('tokimon.ejs'))
app.get('/add', (req, res) => res.render('add.ejs'))
app.get('/modify', (req, res) => res.render('modify.ejs'))
app.get('/delete', (req, res) => res.render('tokimon.ejs'))
app.get('/display', (req, res) => res.render('tokimon.ejs'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
