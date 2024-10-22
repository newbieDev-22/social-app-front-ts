import { ICommentData } from "./comment";

interface IPostInput {
  message?: string;
}

interface IPostData {
  id: number;
  message: string;
  userId: number;
  user: {
    firstName: string;
    lastName: string;
  };
  comments: ICommentData[];
}

interface IPostItem {
  postId: number;
  isCreator: boolean;
  firstName: string;
  lastName: string;
  content: string;
  comments: ICommentData[];
}

export type { IPostInput, IPostData, IPostItem };
