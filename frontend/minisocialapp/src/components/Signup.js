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
  Box,
  Alert
} from "@mui/material";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Await API call, no unused variable
      await API.post("/auth/signup", {
        username,
        email,
        password
      });

      alert("Signup successful");
      navigate("/");
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError("Server not responding");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ marginTop: 10, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            sx={{ marginBottom: 3, textAlign: "center", fontWeight: "bold" }}
          >
            Signup
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <Box
            component="form"
            onSubmit={handleSignup}
            sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 2 }}
          >
            <TextField
              label="Username"
              fullWidth
              required
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Signup"}
            </Button>

            <Button onClick={() => navigate("/")}>
              Already have an account? Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
