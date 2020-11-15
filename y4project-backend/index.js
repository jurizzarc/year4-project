const express = require("express"); 
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Set up express
const app = express();
app.use(express.json()); // Set up middleware
app.use(cors());

// Start up the server
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`The server has started on port: ${PORT}.`));

// Set up mongoose
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}, (err) => {
    if (err) throw err;
    console.log("MongoDB connection established.");
});