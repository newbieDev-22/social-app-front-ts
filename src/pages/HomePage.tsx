import CreatePost from "../features/post/components/CreatePost";
import PostContainer from "../features/post/components/PostContainer";
import Navbar from "../layout/Navbar";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <CreatePost />
      <PostContainer />
    </div>
  );
}
