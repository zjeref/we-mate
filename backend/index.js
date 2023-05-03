require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/user-routes')

mongoose.connect('mongodb://127.0.0.1:27017/wemate')
    .then(()=> {console.log("DB CONNECTED")})
    .catch(err => {console.log(err)});

app.use(cors());
app.use(express.json())


app.use('/api/user', userRoutes);


app.listen(process.env.PORT, ()=> console.log('Listening on port '+ process.env.PORT));