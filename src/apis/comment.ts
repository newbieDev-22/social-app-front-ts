import axios from "../config/axios";
import { ICommentInput } from "../data-type/comment";

class Comment {
  constructor() {}

  createComment(postId: number, message: ICommentInput) {
    return axios.post(`/comments/post/${postId}/`, message);
  }

  updateComment(commentId: number, message: ICommentInput) {
    return axios.patch(`/comments/${commentId}/`, message);
  }

  deleteComment(commentId: number) {
    return axios.delete(`/comments/${commentId}/`);
  }
}

const commentApi = new Comment();

export default commentApi;
