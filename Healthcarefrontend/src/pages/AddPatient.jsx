import { TextField, Button, Typography, Stack, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useState } from "react";
import api from "../api/api";
import PageContainer from "../components/PageContainer";

function AddPatient(){

const [patient,setPatient] = useState({
name:"",
email:"",
password:"",
phone:"",
gender:"",
address:"",
disease:""
});

const handleChange=(e)=>{
setPatient({...patient,[e.target.name]:e.target.value});
};

const submitPatient=()=>{

api.post("/patients",patient)
.then(()=>alert("Patient Added Successfully"));

};

return(

<PageContainer>

<Typography variant="h5">Add Patient</Typography>

<Stack spacing={2} marginTop={2}>

<TextField label="Name" name="name" onChange={handleChange}/>

<TextField label="Email" name="email" onChange={handleChange}/>

{/* PASSWORD FIELD AFTER EMAIL */}

<TextField
label="Password"
name="password"
type="password"
onChange={handleChange}
/>

<TextField label="Phone" name="phone" onChange={handleChange}/>

<FormControl fullWidth>
<InputLabel>Gender</InputLabel>
<Select
name="gender"
value={patient.gender}
label="Gender"
onChange={handleChange}
>
<MenuItem value="Male">Male</MenuItem>
<MenuItem value="Female">Female</MenuItem>
</Select>
</FormControl>

<TextField label="Address" name="address" onChange={handleChange}/>

<TextField label="Disease" name="disease" onChange={handleChange}/>

<Button variant="contained" onClick={submitPatient}>
Add Patient
</Button>

</Stack>

</PageContainer>

);

}

export default AddPatient;