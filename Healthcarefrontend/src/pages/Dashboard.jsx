import React, { useState, useEffect, useRef } from "react";
import { 
  Grid, Paper, Typography, Box, Divider, Avatar, IconButton, 
  Badge, Menu, MenuItem, ListItemIcon, ListItemText, Tooltip, Fade 
} from "@mui/material";
import { styled } from '@mui/material/styles';

// Icons
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import CircleIcon from "@mui/icons-material/Circle";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import { useNavigate } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import api from "../api/api";

// --- STYLED COMPONENTS ---
const StyledStatCard = styled(Paper)(({ theme, accent }) => ({
  padding: theme.spacing(3),
  borderRadius: '24px',
  background: '#ffffff',
  border: '1px solid #f1f5f9',
  boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.04)',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0px 20px 45px rgba(0, 0, 0, 0.08)',
  }
}));

const ActionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '20px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  background: '#ffffff',
  border: '1px solid #f1f5f9',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: '#f8faff',
    borderColor: '#3b82f6',
    transform: 'translateY(-3px)',
    boxShadow: '0px 12px 25px rgba(59, 130, 246, 0.1)',
    '& .arrow-icon': { transform: 'translateX(5px)', color: '#3b82f6' }
  }
}));

function Dashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [anchorElNotify, setAnchorElNotify] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [stats, setStats] = useState({ patients: 0, doctors: 0, appointments: 0 });
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/150?u=admin");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/"); return; }
    
    const savedImg = localStorage.getItem("userPhoto");
    if (savedImg) setProfileImage(savedImg);

    api.get("/dashboard/stats")
      .then(res => setStats(res.data))
      .catch(err => console.log(err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem("userPhoto", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  // Date Formatter
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <PageContainer sx={{ backgroundColor: "#f8fafc", minHeight: "100vh", py: 4 }}>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*"
      />

      {/* --- TOP BAR --- */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 6 }}>
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ color: "#0f172a", letterSpacing: "-0.5px", mb: 0.5 }}>
            Welcome back, Administrator
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#64748b" }}>
            <CalendarTodayIcon sx={{ fontSize: 18 }} />
            <Typography variant="body1" fontWeight="500">
              {today}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
          <IconButton 
            onClick={(e) => setAnchorElNotify(e.currentTarget)}
            sx={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", p: 1.2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
          >
            <Badge color="error" variant="dot" overlap="circular">
              <NotificationsNoneIcon sx={{ color: "#475569" }} />
            </Badge>
          </IconButton>

          <Box sx={{ position: "relative" }}>
            <Avatar 
              src={profileImage} 
              onClick={(e) => setAnchorElProfile(e.currentTarget)}
              sx={{ 
                width: 56, 
                height: 56, 
                border: "4px solid #fff", 
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": { transform: 'scale(1.05)' }
              }} 
            />
            <IconButton 
              onClick={triggerFileSelect}
              sx={{ 
                position: "absolute", 
                bottom: -2, 
                right: -2, 
                backgroundColor: "#3b82f6", 
                color: "#fff",
                p: 0.6,
                border: "2px solid #fff",
                "&:hover": { backgroundColor: "#2563eb" }
              }}
            >
              <PhotoCameraIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* --- NOTIFICATION MENU --- */}
      <Menu
        anchorEl={anchorElNotify}
        open={Boolean(anchorElNotify)}
        onClose={() => setAnchorElNotify(null)}
        PaperProps={{ sx: { width: 320, mt: 1.5, borderRadius: 4, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' } }}
      >
        <Box sx={{ px: 2, py: 1.5 }}><Typography variant="subtitle1" fontWeight="800">Recent Alerts</Typography></Box>
        <Divider />
        <MenuItem onClick={() => setAnchorElNotify(null)} sx={{ py: 1.5 }}>
          <ListItemIcon><CircleIcon sx={{ fontSize: 8, color: '#3b82f6' }} /></ListItemIcon>
          <ListItemText primary="New patient record added" secondary="Just now" />
        </MenuItem>
        <MenuItem onClick={() => setAnchorElNotify(null)} sx={{ py: 1.5 }}>
          <ListItemIcon><CircleIcon sx={{ fontSize: 8, color: '#10b981' }} /></ListItemIcon>
          <ListItemText primary="Server sync complete" secondary="15 mins ago" />
        </MenuItem>
      </Menu>

      {/* --- PROFILE MENU --- */}
      <Menu
        anchorEl={anchorElProfile}
        open={Boolean(anchorElProfile)}
        onClose={() => setAnchorElProfile(null)}
        TransitionComponent={Fade}
        PaperProps={{ sx: { width: 220, mt: 1.5, borderRadius: 4, p: 1 } }}
      >
        <MenuItem onClick={triggerFileSelect}>
          <ListItemIcon><PhotoCameraIcon fontSize="small" /></ListItemIcon>
          Change Photo
        </MenuItem>
        <MenuItem onClick={() => setAnchorElProfile(null)}>
          <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
          Account Settings
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={handleLogout} sx={{ color: '#ef4444' }}>
          <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: '#ef4444' }} /></ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>

      {/* --- STATS GRID --- */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {[
          { label: "Total Patients", val: stats.patients, icon: <PeopleIcon />, color: "#3b82f6" },
          { label: "Doctors Active", val: stats.doctors, icon: <LocalHospitalIcon />, color: "#10b981" },
          { label: "Daily Appointments", val: stats.appointments, icon: <EventAvailableIcon />, color: "#f59e0b" }
        ].map((item, i) => (
          <Grid item xs={12} md={4} key={i}>
            <StyledStatCard accent={item.color}>
              <Box>
                <Typography variant="body2" sx={{ color: "#64748b", fontWeight: 700, mb: 0.5, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '1px' }}>
                  {item.label}
                </Typography>
                <Typography variant="h3" fontWeight="900" sx={{ color: "#1e293b" }}>
                  {item.val.toLocaleString()}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: `${item.color}12`, color: item.color, width: 60, height: 60, borderRadius: '20px' }}>
                {React.cloneElement(item.icon, { fontSize: "medium" })}
              </Avatar>
            </StyledStatCard>
          </Grid>
        ))}
      </Grid>

      {/* --- SYSTEM BANNER --- */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, mb: 6, borderRadius: "24px", 
          background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
          color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between",
          boxShadow: "0 12px 24px rgba(30, 41, 59, 0.15)"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <MonitorHeartIcon sx={{ color: "#10b981", fontSize: 40 }} />
          <Box>
            <Typography variant="h6" fontWeight="800">System Monitoring</Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>All healthcare modules are performing optimally.</Typography>
          </Box>
        </Box>
        <Typography variant="caption" sx={{ fontWeight: 800, px: 2, py: 1, bgcolor: "rgba(255,255,255,0.1)", borderRadius: 2 }}>
          STABLE
        </Typography>
      </Paper>

      {/* --- ACTIONS --- */}
      <Typography variant="h5" fontWeight="900" sx={{ mb: 4, color: "#0f172a" }}>Administrative Tools</Typography>
      
      <Grid container spacing={3}>
        {[
          { title: "Register Patient", icon: <PeopleIcon />, path: "/add-patient", color: "#3b82f6" },
          { title: "Onboard Doctor", icon: <LocalHospitalIcon />, path: "/add-doctor", color: "#10b981" },
          { title: "New Appointment", icon: <EventAvailableIcon />, path: "/book", color: "#f59e0b" },
          { title: "Patient Records", icon: <ListAltIcon />, path: "/patients", color: "#8b5cf6" },
          { title: "Live Queue", icon: <PeopleIcon />, path: "/queue", color: "#06b6d4" },
          { title: "Waiting Metrics", icon: <AccessTimeIcon />, path: "/waiting", color: "#ef4444" },
        ].map((action, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ActionCard onClick={() => navigate(action.path)}>
              <Avatar sx={{ bgcolor: `${action.color}15`, color: action.color, borderRadius: "14px", width: 50, height: 50 }}>
                {action.icon}
              </Avatar>
              <Typography variant="subtitle1" fontWeight="800" sx={{ flexGrow: 1, color: "#334155" }}>
                {action.title}
              </Typography>
              <ArrowForwardIosIcon className="arrow-icon" sx={{ fontSize: 14, color: "#cbd5e1", transition: "0.2s" }} />
            </ActionCard>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}

export default Dashboard;