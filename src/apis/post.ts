import axios from "../config/axios";

interface IPostInput {
  message: string;
}

class Post {
  constructor() {}

  createPost = (message: IPostInput) => axios.post("/posts", message);
  updatePost = (postId: number, message: IPostInput) =>
    axios.patch(`/posts/${postId}`, message);
  deletePost = (postId: number) => axios.delete(`/posts/${postId}`);
  getAllPosts = () => axios.get("/posts");
}

const postApi = new Post();

export default postApi;
