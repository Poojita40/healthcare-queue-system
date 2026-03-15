import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PatientLogin() {

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "http://localhost:8081/patients/login",
        {
          id: id,
          password: password
        }
      );

      // save patient id
      localStorage.setItem("patientId", res.data.id);

      navigate("/patient-dashboard");

    } catch (error) {
      alert("Invalid ID or Password");
    }

  };

  return (

    <div style={{ textAlign: "center", marginTop: "80px" }}>

      <h2>Patient Login</h2>

      <input
        type="number"
        placeholder="Patient ID"
        onChange={(e) => setId(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

    </div>

  );

}

export default PatientLogin;