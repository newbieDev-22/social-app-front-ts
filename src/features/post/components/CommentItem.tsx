import { useState } from "react";
import usePost from "../../../hooks/usePost";
import commentApi from "../../../apis/comment";
import { toast } from "react-toastify";
import { ICommentItem } from "../../../data-type/comment";
import { Avatar, Box, TextField, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        my: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mx: "1rem",
          mb: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            mb: "0.25rem",
          }}
        >
          <Avatar sx={{ bgcolor: deepPurple[500] }}>{firstName[0] || ""}</Avatar>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {firstName} {lastName}
          </Typography>
        </Box>
        {isCommenter && (
          <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {isEdit ? (
              <SaveIcon
                onClick={handleEdit}
                fontSize="large"
                sx={{ cursor: "pointer" }}
              ></SaveIcon>
            ) : (
              <EditIcon
                onClick={() => setIsEdit(true)}
                fontSize="large"
                sx={{ cursor: "pointer" }}
              ></EditIcon>
            )}
            <DeleteIcon
              onClick={handleDelete}
              fontSize="large"
              sx={{ cursor: "pointer" }}
            ></DeleteIcon>
          </Box>
        )}
      </Box>
      <TextField
        id="outlined-read-only-input"
        value={editComment}
        onChange={(e) => setEditComment(e.target.value)}
        placeholder="What's on your mind"
        sx={{ mx: "1rem" }}
        disabled={!isEdit}
      />
    </Box>
  );
}
