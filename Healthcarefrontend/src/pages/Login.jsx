import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  InputAdornment,
  Avatar
} from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const login = async () => {

    try {

      const response = await api.post("/auth/login", user);

      if (response.data) {

        localStorage.setItem("token", "loggedin");

        alert("Login Successful");

        navigate("/dashboard");

      } else {

        alert("Invalid Email or Password");

      }

    } catch (error) {

      alert("Login Failed");

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

        <Avatar sx={{ bgcolor: "#1976d2", margin: "auto", width: 56, height: 56, mb: 1 }}>
          <LocalHospitalIcon />
        </Avatar>

        <Typography variant="h5" fontWeight="bold" mb={3}>
          Healthcare System
        </Typography>

        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="primary" />
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
                <LockIcon color="primary" />
              </InputAdornment>
            )
          }}
        />

        <Button
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          sx={{ mt: 2 }}
          onClick={login}
        >
          Login
        </Button>

        <Typography
          sx={{ mt: 2, cursor: "pointer", color: "blue" }}
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register
        </Typography>

      </Paper>

    </Box>

  );

}

export default Login;