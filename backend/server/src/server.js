const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db");
const config = require("./config");

const app = express();
app.use(morgan("dev")); 
app.use(cors());
app.use(express.json());

app.get("/", async (req,res)=> {
    res.status(200).send({API:"This is the TRIPS MANAGEMENT API"});
});

const startServer = async () =>{
    await db.connect();
    app.listen(config.SERVER_PORT, ()=>{
        const mode = config.NODE_ENV.toUpperCase();
        console.log(`Trips Management API Server (mode ${mode}) listening on port :${config.SERVER_PORT}`);
    });
}

startServer();