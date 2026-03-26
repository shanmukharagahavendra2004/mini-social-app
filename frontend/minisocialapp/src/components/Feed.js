import { useEffect, useState } from "react";
import API from "../api/api";
import PostCard from "./PostCard";
import { Container, Typography, Box } from "@mui/material";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/posts/feed").then(res => setPosts(res.data));
  }, []);

  return (
    <Container maxWidth="sm" sx={{ marginTop: 2 }}>
      
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        Feed
      </Typography>

      <Box>
        {posts.map((p) => (
          <PostCard key={p._id} post={p} />
        ))}
      </Box>

    </Container>
  );
}