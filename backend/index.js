const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
app.use(express.json())
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const routes = require('./routes');
var cors = require('cors')
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(cors())
app.use('/', routes)
app.listen(8000)