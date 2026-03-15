import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  InputAdornment,
  Avatar
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const register = async () => {

    try {

      const response = await api.post("/auth/register", user);

      if (response.data) {
        alert("Registration Successful");
        navigate("/");
      }

    } catch (error) {

      alert("Registration Failed");

    }

  };

  return (

    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#4facfe,#00f2fe)"
      }}
    >

      <Paper elevation={12} sx={{ width: 380, padding: 4, borderRadius: 4, textAlign: "center" }}>

        <Avatar sx={{ bgcolor: "#2e7d32", margin: "auto", width: 56, height: 56, mb: 1 }}>
          <AdminPanelSettingsIcon />
        </Avatar>

        <Typography variant="h5" fontWeight="bold" mb={3}>
          Admin Registration
        </Typography>

        <TextField
          fullWidth
          label="Username"
          name="username"
          margin="normal"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            )
          }}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            )
          }}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            )
          }}
        />

        <Button
          variant="contained"
          fullWidth
          startIcon={<AppRegistrationIcon />}
          sx={{ mt: 2 }}
          onClick={register}
        >
          Register
        </Button>

        <Typography sx={{ mt: 2, cursor: "pointer", color: "blue" }} onClick={() => navigate("/")}>
          Back to Login
        </Typography>

      </Paper>

    </Box>

  );

}

export default Register;