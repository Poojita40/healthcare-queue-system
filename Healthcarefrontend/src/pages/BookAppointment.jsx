import { TextField, Button, Typography, Stack } from "@mui/material";
import { useState } from "react";
import api from "../api/api";
import PageContainer from "../components/PageContainer";

function BookAppointment(){

const [data,setData]=useState({
patientId:"",
doctorId:"",
date:"",
time:"",
problem:""
});

const handleChange=(e)=>{
setData({...data,[e.target.name]:e.target.value});
};

const bookAppointment=()=>{

api.post("/appointments/book",null,{params:data})
.then(()=>alert("Appointment Booked"));

};

return(

<PageContainer>

<Typography variant="h5">Book Appointment</Typography>

<Stack spacing={2} marginTop={2}>

<TextField label="Patient ID" name="patientId" onChange={handleChange}/>

<TextField label="Doctor ID" name="doctorId" onChange={handleChange}/>

<TextField label="Date" name="date" onChange={handleChange}/>

<TextField label="Time" name="time" onChange={handleChange}/>

<TextField label="Problem" name="problem" onChange={handleChange}/>

<Button variant="contained" onClick={bookAppointment}>
Book Appointment
</Button>

</Stack>

</PageContainer>

);

}

export default BookAppointment;