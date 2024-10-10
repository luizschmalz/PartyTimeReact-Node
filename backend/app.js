const express = require('express');
const cors = require('cors');

const app = express();
const routes = require('./routes/router');

app.use(cors());


app.use(express.json());


app.use('/api', routes);


app.listen(3000, function() {
    console.log('Server is running on port 3000');
});


const conn = require('./db/conn');
conn();
