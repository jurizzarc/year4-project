const {ApolloServer, gql} = require("apollo-server-express");
const fs = require("fs");
const path = require("path");
const express = require("express"); 
const {Storage} = require("@google-cloud/storage");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

function generateFileName(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
 }

const files = [];

const typeDefs = gql`
    type File {
        url: String!
    }

    type Query {
        files: [String]
    }

    type Mutation {
        uploadFile(file: Upload!): Boolean
    }
`;

const gc = new Storage({
    keyFilename: path.join(__dirname, "../year-4-project-301322-018fde286833.json"),
    projectId: "year-4-project-301322"
});

const filesToReadBucket = gc.bucket("files-to-read");

const resolvers = {
    Query: {
        files: () => files
    },
    Mutation: {
        uploadFile: async (parent, {file}) => {
            const {createReadStream, filename, mimetype, encoding} = await file;
            const {ext} = path.parse(filename);
            const randomFileName = generateFileName(6) + ext;
            const stream = createReadStream();
            //const pathName = path.join(__dirname, `../images/${randomFileName}`);
            //await stream.pipe(fs.createWriteStream(pathName));

            // Upload file to cloud storage bucket
            await new Promise(res =>
                stream.pipe(
                    filesToReadBucket.file(randomFileName).createWriteStream({
                        resumable: false,
                        gzip: true
                    })
                )
                .on("finish", res)
            );

            files.push(randomFileName);

            return true;
        }
    }
};

// Create Apollo server
const server = new ApolloServer({
    typeDefs, 
    resolvers
});

// Set up express
const app = express();
app.use(express.json()); // Set up middleware
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "../images")));
server.applyMiddleware({app});

// Start up the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`The server has started on port: ${PORT}.`));

// Set up mongoose
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if (err) throw err;
    console.log("MongoDB connection established.");
});

// Set up routes
app.use("/users", require("../routes/userRouter"));
app.use("/files", require("../routes/userFileRouter"));