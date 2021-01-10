const {ApolloServer, gql} = require("apollo-server-express");
const {createWriteStream, existsSync, mkdirSync} = require("fs");
const path = require("path");
const express = require("express"); 
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const files = [];

const typeDefs = gql`
    type Query {
        files: [String]
    }

    type Mutation {
        uploadFile(file: Upload!): Boolean
    }
`;

const resolvers = {
    Query: {
        files: () => files
    },
    Mutation: {
        uploadFile: async (_, {file}) => {
            const {createReadStream, filename} = await file;

            await new Promise(res =>
                createReadStream()
                    .pipe(createWriteStream(path.join(__dirname, "./images", filename)))
                    .on("close", res)
            );

            files.push(filename);

            return true;
        }
    }
};

existsSync(path.join(__dirname, "./images")) || mkdirSync(path.join(__dirname, "./images"));

// Create Apollo server
const server = new ApolloServer({typeDefs, resolvers});
// Set up express
const app = express();
app.use(express.json()); // Set up middleware
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "./images")));
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
app.use("/users", require("./routes/userRouter"));