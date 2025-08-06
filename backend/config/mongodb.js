import mongoose from "mongoose";

const connectDB = async () => {

    // Connect to MongoDB using Mongoose
    mongoose.connection.on("connected", () => { // Event listener for successful connection
        console.log("MongoDB connected");
    })

    await mongoose.connect(`${process.env.MONGODB_URI}`) // Connect to MongoDB using the URI from environment variables

}

export default connectDB;


/*
why connecting to MongoDB 2 times !?
- The first connection is established when the application starts, and the second connection is used to ensure that the connection remains active and can handle requests.
- This is a common practice to ensure that the application can handle multiple requests and maintain a stable connection to the database.

explain the connectDB function:
- The `connectDB` function is an asynchronous function that connects to a MongoDB database using Mongoose.
- It listens for the "connected" event to log a message when the connection is successful.
- It uses the `mongoose.connect` method to connect to the database using the URI stored in the environment variable `MONGODB_URI`.
- The function exports the `connectDB` function so it can be used in other parts of the application, such as in the main server file to establish the database connection when the server starts.

difference between mongoDB and mongoose:
- MongoDB is a NoSQL database that stores data in a flexible, JSON-like format.
- Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js, used to define schemas, models, and interact with the MongoDB database in a more structured way.
*/