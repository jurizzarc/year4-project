const mongoose = require("mongoose");

const userFileSchema = new mongoose.Schema({
    fileName: {type: String, required: true},
    userId: {type: String, required: true}
});

module.exports = UserFile = mongoose.model("userFile", userFileSchema);