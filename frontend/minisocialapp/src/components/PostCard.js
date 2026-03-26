import { useState } from "react";
import API from "../api/api";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  TextField,
  Button,
  Avatar,
  Box,
  Alert
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export default function PostCard({ post }) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const likePost = async () => {
    try {
      await API.put(`/posts/like/${post._id}`, {
        username: localStorage.getItem("username")
      });
      window.location.reload();
    } catch (err) {
      setError("Failed to like post");
    }
  };

  const addComment = async () => {
    if (!comment.trim()) return;

    try {
      await API.post(`/posts/comment/${post._id}`, {
        username: localStorage.getItem("username"),
        comment
      });
      window.location.reload();
    } catch (err) {
      setError("Failed to add comment");
    }
  };

  return (
    <Card sx={{ marginBottom: 3, borderRadius: 3, boxShadow: 3 }}>
      {error && <Alert severity="error">{error}</Alert>}

      <CardHeader
        avatar={
          <Avatar>
            {post.username?.[0]?.toUpperCase() || "U"}
          </Avatar>
        }
        title={post.username || "Unknown"}
        subheader={
          post.createdAt
            ? new Date(post.createdAt).toLocaleString()
            : ""
        }
      />

      <CardContent>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {post.text || ""}
        </Typography>

        {post.image && (
          <img
            src={`http://localhost:5000/uploads/${post.image}`}
            alt=""
            style={{ width: "100%", borderRadius: "10px" }}
          />
        )}
      </CardContent>

      <CardActions>
        <IconButton onClick={likePost}>
          <FavoriteIcon />
        </IconButton>
        <Typography>{post.likes?.length || 0}</Typography>

        <IconButton>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <Typography>{post.comments?.length || 0}</Typography>
      </CardActions>

      <CardContent>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button variant="contained" onClick={addComment}>
            Post
          </Button>
        </Box>
      </CardContent>

      <CardContent>
  <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
    Comments:
  </Typography>

  {post.comments?.length === 0 && (
    <Typography variant="body2">No comments yet</Typography>
  )}

  {post.comments?.map((c, index) => (
    <Typography key={index} variant="body2">
      <b>{c.username}:</b> {c.comment}
    </Typography>
  ))}
</CardContent>
    </Card>
  );
}