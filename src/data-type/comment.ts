interface ICommentInput {
  message?: string;
}

interface ICommentData {
  id: number;
  message: string;
  userId: number;
  user: {
    firstName: string;
    lastName: string;
  };
}

interface ICommentItem {
  postId: number;
  commentId: number;
  isCommenter: boolean;
  firstName: string;
  lastName: string;
  message: string;
}

export type { ICommentInput, ICommentData, ICommentItem };
