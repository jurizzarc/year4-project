const path = require('path');
const { Storage } = require('@google-cloud/storage');
// Import Google Cloud client libraries
const vision = require('@google-cloud/vision').v1; 
const uuid = require('uuid');
const uuidv1 = uuid.v1;
const Upload = require('../models/upload');
require('dotenv').config();

const storage = new Storage({
    keyFilename: path.join(__dirname, '../credentials.json'),
    projectId: 'year-4-project-301322'
});
// Bucket where the uploads reside
const bucketName = process.env.GCS_BUCKET;
const bucket = storage.bucket(bucketName);
// Create a Client
const client = new vision.ImageAnnotatorClient({
    keyFilename: path.join(__dirname, '../credentials.json'),
    projectId: 'year-4-project-301322'
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
// listBuckets();

const upload_test = async (req, res) => {
    res.send(`Hello, it's working.`);
}

const upload_new = async (req, res) => {
    try {
        const newFileName = uuidv1() + '_' + req.file.originalname;
        const textDetection = req.body.textDetection;
        const userId = req.user;
        const blob = bucket.file(newFileName);
        const blobStream = blob.createWriteStream();

        blobStream.on('error', err => console.log(err));
        // End the stream
        blobStream.end(req.file.buffer);
        // Emit after all data has been flushed to Cloud Storage
        blobStream.on('finish', async () => {
            // File within bucket
            const fileName = blob.name;
            // The folder in the bucket where results are stored
            const outputPrefix = 'results';
            // Path to uploaded file
            const gcsSourceUri = `gs://${bucketName}/${fileName}`;
            // Path to JSON response
            // const gcsDestinationUri = `gs://${bucketName}/${outputPrefix}/`;

            // Run if the uploaded file is PDF
            if (textDetection == 'digi-text-pdf') {
                // File type and PDF's path 
                const inputConfig = {
                    mimeType: 'application/pdf',
                    gcsSource: {
                        uri: gcsSourceUri
                    },
                };

                // Response JSON's path
                // const outputConfig = {
                //     gcsDestination: {
                //         uri: gcsDestinationUri
                //     },
                // };

                // Type of annotation to be performed on the file
                const features = [{ type: 'DOCUMENT_TEXT_DETECTION' }];
                // Build the fileRequest object for the uploaded file
                const fileRequest = {
                    inputConfig: inputConfig,
                    features: features,
                    // Annotate the first two pages and the last one (max 5 pages)
                    // First page starts at 1, and not 0. Last page is -1
                    pages: [1, 2, -1]
                    //outputConfig: outputConfig
                }
                // Add each `AnnotateFileRequest` object to the batch request
                const request = {
                    requests: [fileRequest]
                };
                
                // const [result] = await client.asyncBatchAnnotateFiles(request);
                // const [filesResponse] = await result.promise();
                // const destinationUri = filesResponse.responses[0].outputConfig.gcsDestination.uri;
                // console.log(`JSON saved to: ${destinationUri}`);

                // Small batch file annotation
                const [result] = await client.batchAnnotateFiles(request);
                // Process the result. Get first results since only one file was sent
                const responses = result.responses[0].responses;
                for (const response of responses) {
                    console.log(`Full text: ${response.fullTextAnnotation.text}`);
                }
            }
            // Run if the uploaded file is an image
            if (textDetection == 'digi-text-img') {
                const [result] = await client.textDetection(`gs://${bucketName}/${fileName}`);
                const detections = result.textAnnotations[0].description;
                console.log(`Full Text: ${detections}`);
            }
            // Run if the uploaded file is a handwritten text
            if (textDetection == 'hndwrtng-img') {
                const [result] = await client.documentTextDetection(`gs://${bucketName}/${fileName}`);
                const fullTextAnnotation = result.fullTextAnnotation;
                console.log(`Full Text: ${fullTextAnnotation.text}`);
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const upload_get_user_uploads = async (req, res) => {
    try {
        const uploads = await Upload.find({
            userId: req.user
        });
        res.json(uploads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const upload_read_text = async (req, res) => {
    try {
        const upload = await Upload.findById(req.params.id);
        res.json(upload);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

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