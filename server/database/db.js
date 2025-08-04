import mongoose from "mongoose";
export const dbConnection = ()=>{
    const connectionString = process.env.MONGO_URI;
    
    // For MongoDB Atlas, the database name is typically included in the connection string
    // If using a local connection, we need to specify the dbName
    const options = process.env.NODE_ENV === "development" ? { dbName: "CHIT_CHAT" } : {};
    
    mongoose.connect(connectionString, options)
    .then(() => {
        console.log("Connected to database.");
    })
    .catch((err)=>{
        console.log(`Error connecting to database: ${err.message || err}`);
    });
};