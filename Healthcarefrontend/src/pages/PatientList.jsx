import { useEffect, useState } from "react";
import api from "../api/api";
import PageContainer from "../components/PageContainer";

import {
Table, TableBody, TableCell, TableContainer,
TableHead, TableRow, Paper, Typography
} from "@mui/material";

function PatientList(){

const [patients,setPatients] = useState([]);

useEffect(()=>{

api.get("/patients")
.then(res=>setPatients(res.data));

},[]);

return(

<PageContainer>

<Typography variant="h5" gutterBottom>
Patients List
</Typography>

<TableContainer component={Paper}>

<Table>

<TableHead>

<TableRow>
<TableCell>ID</TableCell>
<TableCell>Name</TableCell>
<TableCell>Email</TableCell>
<TableCell>Phone</TableCell>
<TableCell>Gender</TableCell>
<TableCell>Disease</TableCell>
</TableRow>

</TableHead>

<TableBody>

{patients.map((p)=>(
<TableRow key={p.id}>
<TableCell>{p.id}</TableCell>
<TableCell>{p.name}</TableCell>
<TableCell>{p.email}</TableCell>
<TableCell>{p.phone}</TableCell>
<TableCell>{p.gender}</TableCell>
<TableCell>{p.disease}</TableCell>
</TableRow>
))}

</TableBody>

</Table>

</TableContainer>

</PageContainer>

);

}

export default PatientList;