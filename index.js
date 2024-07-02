// index.js
const express = require('express');
const path = require('path');
const connectToMongoDB = require('./connect');
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const URL = require('./models/url'); // Ensure correct import

const app = express();
const PORT = 2100;
 
connectToMongoDB('mongodb://localhost:27017/short-url').then(() => console.log('Mongodb connected!'));

app.set('view engine', 'ejs'); // for server side rendering
app.set('views', path.resolve('./views'));

app.use(express.json()); // Correct usage
app.use(express.urlencoded({ extended: false }));

app.use('/url', urlRoute);
app.use('/', staticRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
