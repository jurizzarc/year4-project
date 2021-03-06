const path = require('path');
const fs = require('fs');
const { Storage } = require('@google-cloud/storage');
// Import Google Cloud client libraries
const vision = require('@google-cloud/vision').v1; 
const uuid = require('uuid');
const uuidv1 = uuid.v1;
const pdfjsLib = require('pdfjs-dist/es5/build/pdf');
const Upload = require('../models/upload');
const dotenv = require('dotenv');
dotenv.config();

// Create a Storage
const storage = new Storage({
    keyFilename: path.join(__dirname, '../credentials.json'),
    projectId: process.env.GCLOUD_PROJECT_ID
});
// Bucket where the uploads reside
const bucketName = process.env.GCS_BUCKET;
// Bucket in storage
const bucket = storage.bucket(bucketName);
// Create a Client
const client = new vision.ImageAnnotatorClient({
    keyFilename: path.join(__dirname, '../credentials.json'),
    projectId: process.env.GCLOUD_PROJECT_ID
});
// Google Cloud Test
async function listBuckets() {
    try {
        const results = await storage.getBuckets();
        const [buckets] = results;
        console.log('Buckets:');
        buckets.forEach(bucket => {
            console.log(bucket.name);
        });
    } catch (err) {
        console.error('ERROR:', err);
    }
}
listBuckets();

async function readJsonOutput(_jsonOutputFile) {
    return new Promise((resolve, reject) => {
        const readableStream = _jsonOutputFile.createReadStream();
        let buffer = '';
        readableStream.on('data', data => {
            buffer += data;
        });
        readableStream.on('error', err => {
            reject(err);
        });
        return readableStream.on('end', () => {
            const output = JSON.parse(buffer);
            const responses = output.responses;
            resolve(responses);
        });
    });
}

const upload_test = async (req, res) => {
    res.send(`Hello, it's working.`);
}

const upload_new = async (req, res) => {
    try {
        // Extract name of file
        const originalFileName = path.parse(req.file.originalname).name;
        // Extract file extension
        const fileExt = path.parse(req.file.originalname).ext;
        // Generate random file name for uploaded file
        const newFileName = originalFileName + '_' + uuidv1();
        // Full file name + ext
        const fullFileName = `${newFileName}${fileExt}`;
        // Get type of text detection
        const textDetection = req.body.textDetection;
        // Get boolean value if handwritten file follows a system
        let hasHandwritingSystem;
        if (req.body.hasHandwritingSystem) {
            hasHandwritingSystem = req.body.hasHandwritingSystem;
        } else {
            hasHandwritingSystem = false;
        }
        // Get id of user
        const userId = req.user;
        // Where the number of pages of a PDF file is stored
        let numPages;
        // Create object to be stored in the bucket
        const blob = bucket.file(fullFileName);
        // Create writable stream
        const blobStream = blob.createWriteStream();

        // Error handling
        blobStream.on('error', err => console.log(err));
        // End the stream
        blobStream.end(req.file.buffer);
        // Emit after all data has been flushed to Storage
        blobStream.on('finish', async () => {
            // Object or uploaded file in the bucket
            const objectName = blob.name;
            // Public URL to object
            const objectURL = `https://storage.googleapis.com/${bucketName}/${objectName}`;
            // Create new Upload or object to be stored in the database
            const newUpload = new Upload({
                fileName: objectName,
                textDetection: textDetection,
                hasHandwritingSystem: hasHandwritingSystem,
                userId: userId
            });

            // The folder in the bucket where JSON output is stored
            const outputFolder = 'results';
            // JSON output file prefix. So that the prefix of JSON output
            // is the same as the name of the uploaded file where text is extracted 
            const outputFilePrefix = newFileName + '_';
            // Path to object or upload
            const gcsSourceUri = `gs://${bucketName}/${objectName}`;
            // Path to output folder
            const gcsDestinationUri = `gs://${bucketName}/${outputFolder}/${outputFilePrefix}`;

            // Run if uploaded file is a PDF document
            if (textDetection == 'digi-text-pdf') {
                // Get page count of PDF file
                let loadingTask = pdfjsLib.getDocument(objectURL);
                loadingTask.promise
                    .then(function (pdf) {
                        numPages = pdf.numPages;
                        console.log(`Number of pages: ${numPages}`);
                    })
                    .catch(function (err) {
                        console.error(`Error: ${err}`);
                    });

                // File type and PDF's path 
                const inputConfig = {
                    mimeType: 'application/pdf',
                    gcsSource: {
                        uri: gcsSourceUri
                    },
                };
                // Response JSON's path
                const outputConfig = {
                    gcsDestination: {
                        uri: gcsDestinationUri
                    },
                };
                // Type of annotation to be performed on the file
                const features = [{ type: 'DOCUMENT_TEXT_DETECTION' }];
                // Build the fileRequest object for the uploaded file
                const fileRequest = {
                    inputConfig: inputConfig,
                    features: features,
                    outputConfig: outputConfig
                }
                // Add each `AnnotateFileRequest` object to the batch request
                const request = {
                    requests: [fileRequest]
                };
                
                // Offline asynchronous request. Can process up to 2000 pages
                const [result] = await client.asyncBatchAnnotateFiles(request);
                const [filesResponse] = await result.promise();
                const destinationUri = filesResponse.responses[0].outputConfig.gcsDestination.uri;
                console.log(`JSON saved to: ${destinationUri}`);
                const jsonOutputFileName = 'output-1-to-' + numPages + '.json';

                // Get JSON response file
                const jsonOutputFile = bucket.file(`${outputFolder}/${outputFilePrefix}${jsonOutputFileName}`);
                const detections = await readJsonOutput(jsonOutputFile).catch(e => { console.log(e) });
                for (const detection of detections) {
                    const textFromFile = detection.fullTextAnnotation.text;
                    const text = { text: textFromFile };
                    newUpload.detections.push(text);
                }
            }
            // Run if uploaded file is image
            if (textDetection == 'digi-text-img') {
                const [result] = await client.textDetection(gcsSourceUri);
                const textFromFile = result.textAnnotations[0].description;
                console.log(`Full Text: ${textFromFile}`);
                // Push extracted text to detections array of newUpload object
                const text = { text: textFromFile };
                newUpload.detections.push(text);
            }
            // Run if uploaded file is a handwritten text
            if (textDetection == 'hndwrtng-img') {
                const [result] = await client.documentTextDetection(gcsSourceUri);
                const textFromFile = result.fullTextAnnotation.text;
                console.log(`Full Text: ${textFromFile}`);
                // Push extracted text to detections array of newUpload object
                const text = { text: textFromFile };
                newUpload.detections.push(text);
            }

            // Insert newUpload to the database
            const savedUpload = await newUpload.save();
            res.json(savedUpload);
            console.log(savedUpload);
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const upload_get_user_uploads = async (req, res) => {
    try {
        const uploads = await Upload.find({
            userId: req.user
        });
        res.json(uploads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const upload_read_text = async (req, res) => {
    try {
        const upload = await Upload.findById(req.params.id);
        res.json(upload);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const upload_delete = async (req, res) => {
    try {
        const upload = await Upload.findOne({
            userId: req.user, 
            _id: req.params.id
        });
        if (!upload) {
            return res
                .status(400)
                .json({ msg: 'No file found with this ID that belongs to the current user.' });
        }
        // Delete upload from MongoDB
        const deletedUpload = await Upload.findByIdAndDelete(req.params.id);
        // Delete upload from bucket
        bucket.file(deletedUpload.fileName).delete();
        console.log('File deleted from Cloud Storage.');
        res.json(deletedUpload);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    upload_test,
    upload_new,
    upload_get_user_uploads,
    upload_read_text,
    upload_delete
}