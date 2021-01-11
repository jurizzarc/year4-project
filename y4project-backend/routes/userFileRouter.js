const router = require("express").Router();
const auth = require("../middleware/auth");
const UserFile = require("../models/userFileModel");

router.post("/new", auth, async(req, res) => {
    try {
        const {fileName} = req.body;

        // Validation
        if (!fileName) {
            return res
                .status(400)
                .json({msg: "Not all fields have been filled in."});
        }

        const newUserFile = new UserFile({
            fileName,
            userId: req.user
        });

        const savedUserFile = await newUserFile.save();
        res.json(savedUserFile);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get("/all", auth, async(req, res) => {
    const userFiles = await UserFile.find({
        userId: req.user
    });
    res.json(userFiles);
});

router.delete("/delete/:id", auth, async(req, res) => {
    const userFile = await UserFile.findOne({
        userId: req.user, 
        _id: req.params.id
    });

    if (!userFile) {
        return res
            .status(400)
            .json({msg: "No file found with this ID that belongs to the current user."});
    }

    const deletedUserFile = await UserFile.findByIdAndDelete(req.params.id);
    res.json(deletedUserFile);
});

module.exports = router;