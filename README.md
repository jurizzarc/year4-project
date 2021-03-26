# Year 4 Research Project: Reading Web Application
A web application where users can read PDFs, text in images, and handwritten notes on any screen size and web browser. The application lets the user customise the reading experience according to their preferences. Developed using MongoDB, Express, React, Node, and Google Cloud Vision API.

## Prerequisites
The following must be installed and set up:
1. Node
2. NPM
3. MongoDB
4. Google Cloud Project
5. Google Cloud Service Account
6. Cloud Storage Bucket
7. Cloud Vision API

## Installation
1. Make sure MongoDB is running in your system or sign up for MongoDB Atlas.
2. Clone this repository by entering `git clone https://github.com/jurizzarc/year4-project.git your-project` in the command line.
3. To install the dependencies in the server
```
cd your-project
cd server
npm install
```
4. To install the dependencies in the client
```
cd your-project
cd client
npm install
```

## Local Environment Variables
Duplicate the `.env.template` file in the server directory and rename it to `.env`. This file contains:
```
MONGODB_CONNECTION_STRING=Your MongoDB Connection String
JWT_SECRET=Your JSON Web Token
GCS_BUCKET=The name of your Google Cloud Storage Bucket
GCLOUD_PROJECT_ID=Your Google Cloud Project ID
```

## Google Cloud Service Account Key
Create a service account key on the Cloud Console and download the service account key JSON file as `credentials.json` to the server directory of your project.

## Starting the app
1. To start the app, make sure you're in the project directory.
2. In the command line, change the current working directory into server and enter `npm run start` to start the Node server and connect to MongoDB.
3. To start the client, change the current working directory into client and enter `npm start` in the command line.
4. Open your browser and go to `http://localhost:3000/`