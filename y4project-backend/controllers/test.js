// Import Google Cloud client libraries
const vision = require('@google-cloud/vision').v1; 
// Create a Client
const client = new vision.ImageAnnotatorClient();
// Bucket where the uploads reside
const bucketName = process.env.GCS_BUCKET;
// Path to PDF file within bucket
const fileName = `path/to/${blob.name}`;
// The folder to store the results
const outputPrefix = 'results';

const gcsSourceUri = `gs://${bucketName}/${fileName}`;
const gcsDestinationUri = `gs://${bucketName}/${outputPrefix}`;

const inputConfig = {
    // Supported mime types are: 'application/pdf' and 'image/tiff'
    mimeType: 'application/pdf',
    gcsSource: {
        uri: gcsSourceUri
    },
};
const outputConfig = {
    gcsDestination: {
        uri: gcsDestinationUri
    },
};
const features = [{ type: 'DOCUMENT_TEXT_DETECTION' }];
const request = {
    requests: [
        {
            inputConfig: inputConfig,
            features: features,
            outputConfig: outputConfig,
        },
    ],
};

const [operation] = client.asyncBatchAnnotateFiles(request).catch(e => { console.log(e) });
const [filesResponse] = operation.promise().catch(e => { console.log(e) });
const destinationUri = filesResponse.responses[0].outputConfig.gcsDestination.uri;
console.log(`JSON saved to: ${destinationUri}`);