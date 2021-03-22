const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    textDetection: { type: String, required: true },
    hasHandwritingSystem: { type: Boolean, default: false },
    detections: [{ text: String }],
    userId: { type: String, required: true }
},
{
    timestamps: true
});

const Upload = mongoose.model('upload', uploadSchema);
module.exports = Upload;