import { TextField, Button, Typography, List, ListItem } from "@mui/material";
import { useState } from "react";
import api from "../api/api";
import PageContainer from "../components/PageContainer";

function ViewQueue(){

const [doctorId,setDoctorId]=useState("");
const [date,setDate]=useState("");
const [queue,setQueue]=useState([]);

const getQueue=()=>{

api.get("/appointments/queue",{params:{doctorId,date}})
.then(res=>setQueue(res.data));

};

return(

<PageContainer>

<Typography variant="h5">Doctor Queue</Typography>

<TextField label="Doctor ID" onChange={(e)=>setDoctorId(e.target.value)}/>
<br/><br/>

<TextField label="Date" onChange={(e)=>setDate(e.target.value)}/>
<br/><br/>

<Button variant="contained" onClick={getQueue}>
View Queue
</Button>

<List>

{queue.map(q=>(
<ListItem key={q.id}>
Queue {q.queueNumber} - {q.patient.name}
</ListItem>
))}

</List>

</PageContainer>

);

}

export default ViewQueue;