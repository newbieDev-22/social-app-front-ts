import { useState } from "react";
import AddComment from "./AddComment";
import CommentContainer from "./CommentContainer";
import postApi from "../../../apis/post";
import usePost from "../../../hooks/usePost";
import { toast } from "react-toastify";
import { IPostItem } from "../../../data-type/post";
import { Avatar, Box, Card, CardContent, TextField, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
    <Card
      sx={{
        width: "80%",
        mx: "auto",
        borderRadius: "10px",
        my: "1rem",
        border: "1px solid #dedede",
        padding: "1rem",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
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
          {isCreator && (
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
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          placeholder="What's on your mind"
          sx={{ mx: "1rem" }}
          disabled={!isEdit}
        />
      </CardContent>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {comments.length > 0 && (
          <Box sx={{ mx: "1rem", borderRadius: "12px" }}>
            <CommentContainer comments={comments} postId={postId} />
          </Box>
        )}
        <Box sx={{ mx: "1rem", borderRadius: "12px" }}>
          <AddComment postId={postId} />
        </Box>
      </CardContent>
    </Card>
  );
}
