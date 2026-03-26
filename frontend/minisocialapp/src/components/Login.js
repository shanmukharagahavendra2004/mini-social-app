import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box
} from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", res.data.username);
    navigate("/home");
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ marginTop: 10, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: 3, textAlign: "center", fontWeight: "bold" }}>
            Login
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleLogin}
            >
              Login
            </Button>

            <Button
              onClick={() => navigate("/signup")}
            >
              Don't have an account? Signup
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}