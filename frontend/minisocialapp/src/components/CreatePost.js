import { useState } from "react";
import API from "../api/api";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Typography
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

export default function CreatePost() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handlePost = async () => {
  const formData = new FormData();

  formData.append("username", localStorage.getItem("username")); // IMPORTANT
  formData.append("text", text);

  if (image) {
    formData.append("image", image);
  }

  try {
    await API.post("/posts/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    window.location.reload();
  } catch (err) {
    console.log("Error creating post", err);
  }
};
  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto", borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Create Post
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="What's on your mind?"
          variant="outlined"
          onChange={(e) => setText(e.target.value)}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
          
          <Button
            variant="outlined"
            component="label"
            startIcon={<ImageIcon />}
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>

          <Button
            variant="contained"
            onClick={handlePost}
          >
            Post
          </Button>

        </Box>
      </CardContent>
    </Card>
  );
}