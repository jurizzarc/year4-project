const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRoutes = require('../routes/user-routes');
const uploadRoutes = require('../routes/upload-routes');

// Set up express
const app = express();
// Set up middleware
app.use(express.json()); 
app.use(cors());
// Transpile the request into something that mongo will understand
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Start up the server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`The server has started on port: ${PORT}.`));

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log('MongoDB connection established.');
});

// Routes
app.use('/users', userRoutes);
app.use('/uploads', uploadRoutes);