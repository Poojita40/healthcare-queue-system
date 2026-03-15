import { TextField, Button, Typography, List, ListItem } from "@mui/material";
import { useState } from "react";
import api from "../api/api";
import PageContainer from "../components/PageContainer";

function WaitingTime(){

const [doctorId,setDoctorId]=useState("");
const [date,setDate]=useState("");
const [data,setData]=useState([]);

const getWaitingTime=()=>{

api.get("/appointments/waiting-time",{params:{doctorId,date}})
.then(res=>setData(res.data));

};

return(

<PageContainer>

<Typography variant="h5">Waiting Time</Typography>

<TextField label="Doctor ID" onChange={(e)=>setDoctorId(e.target.value)}/>
<br/><br/>

<TextField label="Date" onChange={(e)=>setDate(e.target.value)}/>
<br/><br/>

<Button variant="contained" onClick={getWaitingTime}>
Check Waiting Time
</Button>

<List>

{data.map((d,i)=>(
<ListItem key={i}>{d}</ListItem>
))}

</List>

</PageContainer>

);

}

export default WaitingTime;