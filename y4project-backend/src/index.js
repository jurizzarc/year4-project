const express = require("express"); 
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Set up express
const app = express();
app.use(express.json()); // Set up middleware
app.use(cors());
// Allow body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Start up the server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`The server has started on port: ${PORT}.`));

// Connect to mongodb database
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log("MongoDB connection established.");
});

// Set up routes
app.use("/users", require("../routes/userRouter"));
app.use("/files", require("../routes/userUploadRouter"));