import { useEffect, useState } from "react";
import api from "../api/api";
import PageContainer from "../components/PageContainer";

import {
Table, TableBody, TableCell, TableContainer,
TableHead, TableRow, Paper, Typography, Button
} from "@mui/material";

function AppointmentList(){

const [appointments,setAppointments] = useState([]);

const loadAppointments = () => {

api.get("/appointments")
.then(res=>setAppointments(res.data));

};

useEffect(()=>{
loadAppointments();
},[]);

const cancelAppointment = (id) => {

api.delete(`/appointments/${id}`)
.then(()=>{
alert("Appointment Cancelled");
loadAppointments();
});

};

return(

<PageContainer>

<Typography variant="h5" gutterBottom>
Appointments
</Typography>

<TableContainer component={Paper}>

<Table>

<TableHead>

<TableRow>
<TableCell>ID</TableCell>
<TableCell>Patient</TableCell>
<TableCell>Doctor</TableCell>
<TableCell>Date</TableCell>
<TableCell>Time</TableCell>
<TableCell>Queue</TableCell>
<TableCell>Status</TableCell>
<TableCell>Action</TableCell>
</TableRow>

</TableHead>

<TableBody>

{appointments.map((a)=>(

<TableRow key={a.id}>

<TableCell>{a.id}</TableCell>
<TableCell>{a.patient.name}</TableCell>
<TableCell>{a.doctor.name}</TableCell>
<TableCell>{a.appointmentDate}</TableCell>
<TableCell>{a.appointmentTime}</TableCell>
<TableCell>{a.queueNumber}</TableCell>
<TableCell>{a.status}</TableCell>

<TableCell>

<Button
variant="contained"
color="error"
onClick={()=>cancelAppointment(a.id)}
>
Cancel
</Button>

</TableCell>

</TableRow>

))}

</TableBody>

</Table>

</TableContainer>

</PageContainer>

);

}

export default AppointmentList;