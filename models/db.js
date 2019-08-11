const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const chalk    = require('chalk')
const config   = require('config')

let conn = null;
async function connectToDatabase() {
    // Make sure to add this so you can re-use `conn` between function calls.
    // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
    // context.callbackWaitsForEmptyEventLoop = false;
    
    // Because `conn` is in the global scope, Lambda may retain it between
    // function calls thanks to `callbackWaitsForEmptyEventLoop`.
    // This means your Lambda function doesn't have to go through the
    // potentially expensive process of connecting to MongoDB every time.
    if (conn == null) {
        console.log('No connection')
        // Explanation for these DB_OPTIONS settings - 
        // "bufferCommands":false, // Disable mongoose buffering
        // "bufferMaxEntries":0 // and MongoDB driver buffering
        // 
        // Buffering means mongoose will queue up operations if it gets
        // disconnected from MongoDB and send them when it reconnects.
        // With serverless, better to fail fast if not connected.
        // conn = await mongoose.connect('mongodb://localhost/spiked', process.env.DB_OPTIONS);
        conn = await mongoose.createConnection(config.mongodb.uri, config.mongodb.options);
        console.log('loading models now')

        // Load the models
        require('./event')(conn);
        require('./user')(conn);

        return conn
    } else {
        console.log('Found connection, returning')
        return conn
    }
};

module.exports = async (req, res) => {
    console.log('attempting to connect to DB')
    const db = await connectToDatabase()
    return db;
}