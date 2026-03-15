import { useEffect, useState } from "react";
import api from "../api/api";
import PageContainer from "../components/PageContainer";

import {
Table, TableBody, TableCell, TableContainer,
TableHead, TableRow, Paper, Typography
} from "@mui/material";

function DoctorList(){

const [doctors,setDoctors] = useState([]);

useEffect(()=>{

api.get("/doctors")
.then(res=>setDoctors(res.data));

},[]);

return(

<PageContainer>

<Typography variant="h5" gutterBottom>
Doctors List
</Typography>

<TableContainer component={Paper}>

<Table>

<TableHead>

<TableRow>
<TableCell>ID</TableCell>
<TableCell>Name</TableCell>
<TableCell>Specialization</TableCell>
<TableCell>Available</TableCell>
</TableRow>

</TableHead>

<TableBody>

{doctors.map((d)=>(
<TableRow key={d.id}>
<TableCell>{d.id}</TableCell>
<TableCell>{d.name}</TableCell>
<TableCell>{d.specialization}</TableCell>
<TableCell>{d.available ? "Yes" : "No"}</TableCell>
</TableRow>
))}

</TableBody>

</Table>

</TableContainer>

</PageContainer>

);

}

export default DoctorList;