import Spinner from "../../../components/Spinner";
import useAuth from "../../../hooks/useAuth";
import usePost from "../../../hooks/usePost";
import PostItem from "./PostItem";

export default function PostContainer() {
  const { authUser } = useAuth();

  const { posts, isPostsLoading } = usePost();
  if (!authUser || !posts) return null;
  if (isPostsLoading) return <Spinner />;

  return (
    <div>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          postId={post.id}
          isCreator={post.userId === authUser.id}
          firstName={post.user.firstName}
          lastName={post.user.lastName}
          content={post.message}
          comments={post.comments}
        />
      ))}
    </div>
  );
}
