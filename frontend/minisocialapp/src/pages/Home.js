import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import Feed from "../components/Feed";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <CreatePost />
        <Feed />
      </Container>
    </>
  );
}