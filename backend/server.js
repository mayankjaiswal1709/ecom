const { log } = require('console');
const app = require ('./app');
const dotenv = require('dotenv');
const connectDatabase =require("./config/database")

// Handling Uncought Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting Down the server due to uncaught Exception`);
    process.exit(1);
})



// dotenv
dotenv.config({path:"backend/config/config.env"});

// connecting to databse
connectDatabase()


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on htttp://localhost:${process.env.PORT}`)
})

// unhandled Promise Rejaction
process.on("unhandledRejection",err=>{
    console.log(`Eroor:${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejaction `);

    server.close(()=>{
        process.exit(1); 
    });
});