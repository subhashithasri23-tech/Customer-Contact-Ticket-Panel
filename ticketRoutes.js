const express = require("express");

const router = express.Router();

const Ticket = require("../models/Ticket");


// Create new ticket

router.post("/", async(req,res)=>{

    try{

        const ticket = new Ticket(req.body);

        await ticket.save();

        res.json(ticket);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});



// Get all tickets

router.get("/", async(req,res)=>{

    try{

        const tickets = await Ticket.find();

        res.json(tickets);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});




// Get ticket by ID

router.get("/:ticketId", async(req,res)=>{


    try{

        const ticket = await Ticket.findOne({
            ticketId:req.params.ticketId
        });


        res.json(ticket);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }


});




// Add reply message

router.put("/:ticketId/message", async(req,res)=>{


try{


const ticket = await Ticket.findOne({
    ticketId:req.params.ticketId
});


ticket.messages.push({

    sender:req.body.sender,

    text:req.body.text

});


await ticket.save();


res.json(ticket);


}
catch(error){

res.status(500).json({
    message:error.message
});

}


});



module.exports = router;