import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (

    <AppBar position="static">

      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer", fontWeight: "bold" }}
          onClick={() => navigate("/dashboard")}
        >
          🏥 Smart Healthcare System
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>

          <Button
            color="inherit"
            startIcon={<DashboardIcon />}
            onClick={() => navigate("/dashboard")}
            sx={{ fontWeight: isActive("/dashboard") ? "bold" : "normal" }}
          >
            Dashboard
          </Button>

          <Button
            color="inherit"
            startIcon={<PeopleIcon />}
            onClick={() => navigate("/patients")}
          >
            Patients
          </Button>

          <Button
            color="inherit"
            startIcon={<LocalHospitalIcon />}
            onClick={() => navigate("/doctors")}
          >
            Doctors
          </Button>

          <Button
            color="inherit"
            startIcon={<EventAvailableIcon />}
            onClick={() => navigate("/appointments")}
          >
            Appointments
          </Button>

          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={logout}
          >
            Logout
          </Button>

        </Box>

      </Toolbar>

    </AppBar>

  );

}

export default Navbar;