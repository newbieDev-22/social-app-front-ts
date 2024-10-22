import { useState } from "react";
import Avatar from "../../../components/Avatar";
import usePost from "../../../hooks/usePost";
import commentApi from "../../../apis/comment";
import Input from "../../../components/Input";
import { toast } from "react-toastify";
import { DeleteIcon, EditIcon, SaveIcon } from "../../../icons";
import { ICommentItem } from "../../../data-type/comment";

export default function CommentItem({
  postId,
  commentId,
  isCommenter,
  firstName,
  lastName,
  message,
}: ICommentItem) {
  const { handleUpdateComment, handleDeleteComment } = usePost();
  const [isEdit, setIsEdit] = useState(false);
  const [editComment, setEditComment] = useState<string>(message);

  if (!handleUpdateComment || !handleDeleteComment) return null;

  const handleEdit = async () => {
    if (isEdit) {
      await commentApi.updateComment(commentId, { message: editComment });
      handleUpdateComment(postId, commentId, { message: editComment });
      setIsEdit(false);
      toast.success("Comment updated successfully");
    } else {
      setIsEdit(true);
    }
  };

  const handleDelete = async () => {
    await commentApi.deleteComment(commentId);
    handleDeleteComment(postId, commentId);
    toast.success("Comment deleted successfully");
  };

  return (
    <div className="flex flex-col justify-between items-center h-full w-full gap-4 pl-4 pr-8 py-2">
      <div className="flex justify-between items-center h-full w-full gap-4">
        <div className="flex  w-full items-center font-bold">
          <Avatar name={firstName} width="px-3" />
          <h6>
            {firstName} {lastName}
          </h6>
        </div>
        {isCommenter && (
          <div className="flex gap-2 justify-center items-center ">
            {isEdit ? (
              <SaveIcon onClick={handleEdit} className={"w-5 h-5"} />
            ) : (
              <EditIcon onClick={handleEdit} className={"w-5 h-5"} />
            )}
            <DeleteIcon onClick={handleDelete} className={"w-6 h-6"} />
          </div>
        )}
      </div>
      <div className="w-full ">
        {isEdit ? (
          <Input value={editComment} onChange={(e) => setEditComment(e.target.value)} />
        ) : (
          <textarea
            className="w-full h-full px-4 resize-none focus:outline-none p-2 bg-gray-100 rounded-lg"
            disabled
            value={message}
          ></textarea>
        )}
      </div>
    </div>
  );
}
