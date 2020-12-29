// Creates a router
const router = require("express").Router();
const User = require("../models/userModel");

// Execute this function when we make a HTTP request to /test on our server
router.get("/test", (req, res) => {
    // Sends a string
    res.send("Hello, it's working.");
});

router.post("/register", async (req, res) => {
    try {
        const {email, password, passwordCheck, displayName} = req.body;

        // Validate
        if (!email || !password || !passwordCheck) {
            return res
                .status(400)
                .json({msg: "Not all fields have been filled in."});
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({msg: "The password must be at least 6 characters long."});
        }

        if (password !== passwordCheck) {
            return res
                .status(400)
                .json({msg: "Enter the same password twice for verification."});
        }

        const existingUser = await User.find({email: email});
        if (existingUser) {
            return res
                .status(400)
                .json({msg: "An account with this e-mail address already exists."});
        }

        if (!displayName) {
            displayName = email;
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;