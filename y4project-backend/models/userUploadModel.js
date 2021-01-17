const mongoose = require("mongoose");

const userUploadSchema = new mongoose.Schema({
    fileName: {type: String, required: true},
    publicUrl: {type: String, required: true},
    userId: {type: String, required: true}
});

module.exports = UserUpload = mongoose.model("user_upload", userUploadSchema);