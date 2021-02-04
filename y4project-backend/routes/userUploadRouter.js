const router = require("express").Router();
const Multer = require("multer");
const path = require("path");
const {Storage} = require("@google-cloud/storage");
const auth = require("../middleware/auth");
const uuid = require("uuid");
const uuidv1 = uuid.v1;
const UserUpload = require("../models/userUploadModel");
require("dotenv").config();

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    credentials: {
        client_email: process.env.GCLOUD_CLIENT_EMAIL,
        private_key: process.env.GCLOUD_PRIVATE_KEY
    }
});

const multer = Multer({
    storage: Multer.memoryStorage()
});

const bucket = storage.bucket(process.env.GCS_BUCKET);

router.post("/new", [auth, multer.single('file')], async(req, res) => {
    //console.log(req.file);
    //console.log(req.user);

    try {
        const newFileName = uuidv1() + "_" + req.file.originalname;
        const textDetection = req.body.textDetection;
        const userId = req.user;
        const blob = bucket.file(newFileName);
        const blobStream = blob.createWriteStream();

        blobStream.on("error", err => console.log(err));

        blobStream.on("finish", () => {
            const publicUrl = `https://storage.googleapis.com/files-to-read/${blob.name}`;

            const newUserUpload = new UserUpload({
                fileName: blob.name,
                publicUrl: publicUrl,
                textDetection: textDetection,
                userId: userId
            });

            newUserUpload.save();

            console.log(blob);
            console.log(newUserUpload);
        });

        blobStream.end(req.file.buffer);

        res.json(newUserUpload);
    } catch (err) {
        res.json(err);
    }
});

router.get("/all", auth, async(req, res) => {
    const userUploads = await UserUpload.find({
        userId: req.user
    });
    res.json(userUploads);
});

router.get("/read/:id", auth, async(req, res) => {
    const userUpload = await UserUpload.findById(req.params.id);
    res.json(userUpload);
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