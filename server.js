const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();


const app = express();



app.use(cors());

app.use(express.json());



// Database Connection

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((error)=>{
    console.log(error);
});



// Routes

const ticketRoutes = require("./Routes/ticketRoutes");

app.use("/api/tickets",ticketRoutes);




// Test API

app.get("/",(req,res)=>{

    res.send("Customer Ticket Backend Running");

});




const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(`Server Running on ${PORT}`);

});