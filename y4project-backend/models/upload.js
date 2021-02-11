const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    textDetection: { type: String, required: true },
    userId: { type: String, required: true },
    detections: [{ text: String }]
});

module.exports = Upload = mongoose.model('upload', uploadSchema);