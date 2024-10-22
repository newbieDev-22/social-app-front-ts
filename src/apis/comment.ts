import axios from "../config/axios";

interface IMessageInput {
  massage: string;
}

class Comment {
  constructor() {}

  createComment(postId: number, message: IMessageInput) {
    return axios.post(`/comments/post/${postId}`, message);
  }

  updateComment(commentId: number, message: IMessageInput) {
    return axios.patch(`/comments/${commentId}`, message);
  }

  deleteComment(commentId: number) {
    return axios.delete(`/comments/${commentId}`);
  }
}

const commentApi = new Comment();

export default commentApi;
