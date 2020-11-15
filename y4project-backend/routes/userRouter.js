// Creates a router
const router = require("express").Router();

// Execute this function when we make a HTTP request to /test on our server
router.get("/test", (req, res) => {
    // Sends a string
    res.send("Hello, it's working.");
});

module.exports = router;