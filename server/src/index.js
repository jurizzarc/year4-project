const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('../routes/user-routes');
const uploadRoutes = require('../routes/upload-routes');

// Set up the server
const app = express();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`The server has started on port: ${PORT}.`));

// Parse JSON
app.use(express.json()); 
app.use(cors());
// Transpile the request into something that mongo will understand
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) return console.error(err);
    console.log('MongoDB connection established.');
});

// Set up routes
app.get('/', (req, res) => {
    res.send(`Server is up on port: ${PORT}`);
});
app.use('/users', userRoutes);
app.use('/uploads', uploadRoutes);

require('../controllers/dictionary');