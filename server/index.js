const express = require('express'); // import express
const mongoose = require('mongoose'); // import mongoose
const cors = require('cors'); // import cors
const UserModel = require('C:/Projet_api/Projet-api-react/server/models/Users.js'); // import user model


const app = express(); // create express app
app.use(express.json()); // use express json
app.use(cors()); // use cors

mongoose.connect('mongodb://127.0.0.1:27017/test')

app.get('/getUsers',(req, res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})
app.listen(3001, () => {
    console.log('Server Is Running')
}); // listen on port 3001