import { useState, useEffect, createContext } from "react";
import postApi from "../apis/post";
import useAuth from "../hooks/useAuth";

const PostContext = createContext();

export default function PostContextProvider({ children }) {
  const { authUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setIsPostsLoading(true);
      const postResult = await postApi.getAllPosts();
      setPosts(postResult.data.posts);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPostsLoading(false);
    }
  };

  useEffect(() => {
    if (authUser) {
      fetchPosts();
    }
  }, [authUser]);

  const handleAddPost = (post) => {
    setPosts([post, ...posts]);
  };

  const handleUpdatePost = (postId, updatedPost) => {
    const index = posts.findIndex((p) => p.id === postId);
    const newPosts = [...posts];
    newPosts[index]["message"] = updatedPost.message;
    setPosts(newPosts);
  };

  const handleDeletePost = (postId) => {
    const newPosts = posts.filter((post) => post.id !== postId);
    setPosts(newPosts);
  };

  const handleAddComment = (postId, comment) => {
    const index = posts.findIndex((p) => p.id === postId);
    const newPosts = [...posts];
    newPosts[index]["comments"] = [...newPosts[index]["comments"], comment];
    setPosts(newPosts);
  };

  const handleUpdateComment = (postId, commentId, updatedComment) => {
    const index = posts.findIndex((p) => p.id === postId);
    const newPosts = [...posts];
    const commentIndex = newPosts[index]["comments"].findIndex(
      (comment) => comment.id === commentId
    );
    newPosts[index]["comments"][commentIndex]["message"] = updatedComment.message;
    setPosts(newPosts);
  };

  const handleDeleteComment = (postId, commentId) => {
    const index = posts.findIndex((p) => p.id === postId);
    const newPosts = [...posts];
    newPosts[index]["comments"] = newPosts[index]["comments"].filter(
      (comment) => comment.id !== commentId
    );
    setPosts(newPosts);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        isPostsLoading,
        handleAddPost,
        handleUpdatePost,
        handleDeletePost,
        handleAddComment,
        handleUpdateComment,
        handleDeleteComment,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export { PostContext };
