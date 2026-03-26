import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.js";
import SignupPage from "./pages/SignupPage.js";
import Home from "./pages/Home.js";
import { CssBaseline, Box } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
}

export default App;