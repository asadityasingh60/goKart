const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//Handling Uncaught Exception --->  Uncaught means that the error was not caught in the catch part of the try-catch block.
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
})


//Config
dotenv.config({path:"backend/config/config.env"});  // This configs the "listen" to connect to config.env in config folder


//Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT,()=>{              //process.env looks for a variable named PORT in config.env
    console.log(`Server is Working on http://localhost:${process.env.PORT}`)
});

//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the Server due to unhandled promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
});