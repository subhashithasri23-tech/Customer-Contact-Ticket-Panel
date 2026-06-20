import React,{useEffect,useState} from "react";
import axios from "axios";
import "./TicketPanel.css";


function TicketPanel(){

const ticketId="TKT-1001";

const [ticket,setTicket]=useState(null);
const [message,setMessage]=useState("");


const getTicket=async()=>{

const result=await axios.get(
`http://localhost:5000/api/tickets/${ticketId}`
);

setTicket(result.data);

};


useEffect(()=>{

getTicket();

},[]);



const sendReply=async()=>{


await axios.post(

`http://localhost:5000/api/tickets/${ticketId}/reply`,

{
sender:"Support Agent",
text:message
}

);


setMessage("");

getTicket();


};



if(!ticket)
return <h2>Loading...</h2>



return(

<div className="container">


<h1>
Customer Contact Ticket
</h1>


<h3>
Ticket ID : {ticket.ticketId}
</h3>



<div className="timeline">


{

ticket.messages.map((msg,index)=>(


<div
className={
msg.sender==="Customer"
?
"customer"
:
"support"
}

key={index}
>


<h4>
{msg.sender}
</h4>


<p>
{msg.text}
</p>


<small>
{new Date(msg.createdAt)
.toLocaleString()}
</small>


</div>


))

}



</div>



<textarea

value={message}

onChange={
(e)=>setMessage(e.target.value)
}

placeholder="Write reply..."

>


</textarea>



<button onClick={sendReply}>
Send Reply
</button>


</div>


)


}


export default TicketPanel;