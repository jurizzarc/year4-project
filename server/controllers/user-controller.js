const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const user_test = async (req, res) => {
    res.send(`Hello, it's working.`);
}

const user_register = async (req, res) => {
    try {
        let { displayName, email, password, passwordCheck } = req.body;

        // Validate
        if (!displayName || !email || !password || !passwordCheck) {
            return res
                .status(400)
                .json({ 
                    msg: "We couldn't register you. Not all fields have been filled in." 
                });
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({ 
                    msg: "We couldn't register you. Please provide a password that's at least 6 characters long." 
                });
        }

        if (password !== passwordCheck) {
            return res
                .status(400)
                .json({ 
                    msg: "We couldn't register you. Please enter the same password twice for verification."
                });
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res
                .status(400)
                .json({ 
                    msg: "We couldn't register you. An account with this e-mail address already exists." 
                });
        }

        const salt = await bycrypt.genSalt();
        const passwordHash = await bycrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: passwordHash,
            displayName
        });

        // Save user to database
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const user_login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Validate
        if (!email || !password) {
            return res
                .status(400)
                .json({
                    msg: "We couldn't sign you in. Please fill in the fields."
                });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res
                .status(400)
                .json({
                    msg: 'No account with this e-mail address has been registered.'
                });
        }

        const isMatching = await bycrypt.compare(password, user.password);
        if (!isMatching) {
            return res
                .status(400)
                .json({ 
                    msg: "We couldn't sign you in. Check your e-mail address and password, then try again." 
                });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const user_delete = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const user_is_token_valid = async (req, res) => {
    try {
        const token = req.header('x-auth-token');
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
        res.status(500).json({ error: err.message });
    }
}

const user_get_info = async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        displayName: user.displayName,
        id: user._id
    });
}

module.exports = {
    user_test,
    user_register,
    user_login,
    user_delete,
    user_is_token_valid,
    user_get_info
}