import { useState } from "react";
import Avatar from "../../../components/Avatar";
import AddComment from "./AddComment";
import CommentContainer from "./CommentContainer";
import postApi from "../../../apis/post";
import usePost from "../../../hooks/usePost";
import { toast } from "react-toastify";
import { DeleteIcon, EditIcon, SaveIcon } from "../../../icons";
import { IPostItem } from "../../../data-type/post";
import Input from "../../../components/Input";

export default function PostItem({
  postId,
  isCreator,
  firstName,
  lastName,
  content,
  comments,
}: IPostItem) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { handleUpdatePost, handleDeletePost } = usePost();
  const [editContent, setEditContent] = useState<string>(content);

  if (!handleUpdatePost || !handleDeletePost) return null;

  const handleEdit = async () => {
    if (isEdit) {
      await postApi.updatePost(postId, { message: editContent });
      handleUpdatePost(postId, { message: editContent });
      setIsEdit(false);
      toast.success("Post updated successfully");
    } else {
      setIsEdit(true);
    }
  };

  const handleDelete = async () => {
    await postApi.deletePost(postId);
    handleDeletePost(postId);
    toast.success("Post deleted successfully");
  };

  return (
    <div className="shadow-md border border-gray-300 rounded-lg my-4 md:w-3/5 sm: w-4/5 m-auto py-2">
      <div className="flex justify-evenly items-center pt-4">
        <div className="flex flex-col justify-between items-center h-full w-full gap-4 pl-4 pr-8">
          <div className="flex justify-between items-center h-full w-full gap-4">
            <div className="flex w-full items-center font-bold text-lg">
              <Avatar name={firstName} width="px-3" />
              <h6>
                {firstName} {lastName}
              </h6>
            </div>
            {isCreator && (
              <div className="flex gap-2 justify-center items-center ">
                {isEdit ? (
                  <SaveIcon onClick={handleEdit} className={"w-6 h-6"} />
                ) : (
                  <EditIcon onClick={handleEdit} className={"w-6 h-6"} />
                )}
                <DeleteIcon onClick={handleDelete} className={"w-7 h-7"} />
              </div>
            )}
          </div>
          <div className="w-full ">
            {isEdit ? (
              <Input
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
            ) : (
              <textarea
                className="w-full h-full px-4 resize-none focus:outline-none p-2 bg-gray-100 rounded-lg"
                disabled
                value={content}
              ></textarea>
            )}
          </div>
        </div>
      </div>
      {comments.length > 0 && (
        <div className="border mx-6 my-4 rounded-lg">
          <CommentContainer comments={comments} postId={postId} />
        </div>
      )}
      <div className="border mx-6 my-4 rounded-lg">
        <AddComment postId={postId} />
      </div>
    </div>
  );
}
