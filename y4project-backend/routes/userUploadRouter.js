const router = require("express").Router();
const Multer = require("multer");
const path = require("path");
const {Storage} = require("@google-cloud/storage");
const auth = require("../middleware/auth");
const uuid = require("uuid");
const uuidv1 = uuid.v1;
const UserUpload = require("../models/userUploadModel");

const gc = new Storage({
    keyFilename: path.join(__dirname, "../year-4-project-301322-a41a4f2c2c40.json"),
    projectId: "year-4-project-301322"
});

const filesToReadBucket = gc.bucket("files-to-read");

const multer = Multer({
    storage: Multer.memoryStorage()
});

router.post("/new", [auth, multer.single('file')], async(req, res) => {
    //console.log(req.file);
    //console.log(req.user);
    const newFileName = uuidv1() + "_" + req.file.originalname;
    const userId = req.user;
    const blob = filesToReadBucket.file(newFileName);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", err => console.log(err));

    blobStream.on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/files-to-read/${blob.name}`;

        const newUserUpload = new UserUpload({
            fileName: newFileName,
            publicUrl: publicUrl,
            userId: userId
        });

        newUserUpload.save();
    });

    blobStream.end(req.file.buffer);
});

router.get("/all", auth, async(req, res) => {
    const userUploads = await UserUpload.find({
        userId: req.user
    });
    res.json(userUploads);
});

router.delete("/delete/:id", auth, async(req, res) => {
    const userUpload = await UserUpload.findOne({
        userId: req.user, 
        _id: req.params.id
    });

    if (!userUpload) {
        return res
            .status(400)
            .json({msg: "No file found with this ID that belongs to the current user."});
    }

    const deletedUserUpload = await UserUpload.findByIdAndDelete(req.params.id);
    res.json(deletedUserUpload);
});

module.exports = router;