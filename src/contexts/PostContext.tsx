import { useState, useEffect, createContext } from "react";
import postApi from "../apis/post";
import useAuth from "../hooks/useAuth";
import {
  IAuthProviderValue,
  IPostProviderValue,
  IReactChildren,
} from "../data-type/react-type";
import { IPostData, IPostInput } from "../data-type/post";
import { ICommentData, ICommentInput } from "../data-type/comment";

const PostContext = createContext<IPostProviderValue>({});

export default function PostContextProvider({ children }: IReactChildren) {
  const { authUser }: IAuthProviderValue = useAuth();
  const [posts, setPosts] = useState<IPostData[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState<boolean>(false);

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

  const handleAddPost = (post: IPostData) => {
    const newPostList = [post, ...posts];
    setPosts(newPostList);
  };

  const handleUpdatePost = (postId: number, updatedPost: IPostInput) => {
    const index = posts.findIndex((p) => p.id === postId);
    const newPosts = [...posts];
    if (index !== -1 && updatedPost.message) {
      newPosts[index]["message"] = updatedPost.message;
      setPosts(newPosts);
    }
  };

  const handleDeletePost = (postId: number) => {
    const newPosts = posts.filter((post) => post.id !== postId);
    setPosts(newPosts);
  };

  const handleAddComment = (postId: number, comment: ICommentData) => {
    const index = posts.findIndex((p) => p.id === postId);
    const newPosts = [...posts];
    newPosts[index]["comments"] = [...newPosts[index]["comments"], comment];
    setPosts(newPosts);
  };

  const handleUpdateComment = (
    postId: number,
    commentId: number,
    updatedComment: ICommentInput
  ) => {
    const index = posts.findIndex((p) => p.id === postId);
    const newPosts = [...posts];
    if (index !== -1 && updatedComment.message) {
      const commentIndex = newPosts[index]["comments"].findIndex(
        (comment) => comment.id === commentId
      );
      newPosts[index]["comments"][commentIndex]["message"] = updatedComment.message;
      setPosts(newPosts);
    }
  };

  const handleDeleteComment = (postId: number, commentId: number) => {
    const index = posts.findIndex((p) => p.id === postId);
    const newPosts = [...posts];
    newPosts[index]["comments"] = newPosts[index]["comments"].filter(
      (comment) => comment.id !== commentId
    );
    setPosts(newPosts);
  };

  const postProviderValue: IPostProviderValue = {
    posts,
    isPostsLoading,
    handleAddPost,
    handleUpdatePost,
    handleDeletePost,
    handleAddComment,
    handleUpdateComment,
    handleDeleteComment,
  };

  return (
    <PostContext.Provider value={postProviderValue}>{children}</PostContext.Provider>
  );
}

export { PostContext };
