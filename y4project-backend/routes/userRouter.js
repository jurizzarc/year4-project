// Creates a router
const router = require("express").Router();
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");

// Execute this function when we make a HTTP request to /test on our server
router.get("/test", (req, res) => {
    // Sends a string
    res.send("Hello, it's working.");
});

router.post("/register", async (req, res) => {
    try {
        let {email, password, passwordCheck, displayName} = req.body;

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

        const existingUser = await User.findOne({email: email});
        if (existingUser) {
            return res
                .status(400)
                .json({msg: "An account with this e-mail address already exists."});
        }

        if (!displayName) {
            displayName = email;
        }

        const salt = await bycrypt.genSalt();
        const passwordHash = await bycrypt.hash(password, salt);

        // Save user to database
        const newUser = new User({
            email,
            password: passwordHash,
            displayName
        });

        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        // Validate
        if (!email || !password) {
            return res
                .status(400)
                .json({msg: "Not all fields have been filled in."});
        }

        const user = await User.findOne({email: email});
        if (!user) {
            return res
                .status(400)
                .json({msg: "No account with this e-mail address has been registered."});
        }

        const isMatching = await bycrypt.compare(password, user.password);
        if (!isMatching) {
            return res
                .status(400)
                .json({msg: "Invalid credentials."});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.delete("/delete", auth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// endpoint that checks if token is valid or not
router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            return res.json(false);
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.json(false);
        }

        const user = await User.findById(verified.id);
        if (!user) {
            return res.json(false);
        }

        return res.json(true);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// endpoint for getting user information
router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json(user);
});

module.exports = router;