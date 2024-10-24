import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import usePost from "../../../hooks/usePost";
import commentApi from "../../../apis/comment";
import validateComment from "../validator/validate-comment";
import { toast } from "react-toastify";
import { ICommentInput } from "../../../data-type/comment";
import { IValidateError } from "../../../data-type/validator";
import { Avatar, Button, Card, CardActions, CardContent, TextField } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export default function AddComment({ postId }: { postId: number }) {
  const auth = useAuth();
  const authUser = auth?.authUser;
  const { handleAddComment } = usePost();

  const [input, setInput] = useState<ICommentInput>({ message: "" });
  const [inputError, setInputError] = useState<IValidateError>({ message: "" });

  if (!authUser || !handleAddComment) {
    return null;
  }

  const handleCreateComment = async () => {
    try {
      const error = validateComment(input);
      if (error) {
        return setInputError(error);
      } else {
        const commentResult = await commentApi.createComment(postId, input);
        handleAddComment(postId, commentResult.data.comment);
        toast.success("Post created successfully");
        setInput({ message: "" });
        setInputError({ message: "" });
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Card
      sx={{
        mx: "auto",
        borderRadius: "10px",
        my: "1rem",
        border: "1px solid #dedede",
        p: "0.5rem",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar sx={{ bgcolor: deepPurple[500] }}>{authUser?.firstName[0] || ""}</Avatar>
        <TextField
          value={input.message}
          onChange={(e) => setInput({ message: e.target.value })}
          placeholder="What's on your mind"
          fullWidth
          error={inputError.message ? true : false}
          sx={{ mx: "1rem" }}
          helperText={inputError.message}
        ></TextField>
        <CardActions sx={{ justifyContent: "end" }}>
          <Button
            onClick={handleCreateComment}
            variant="contained"
            sx={{ backgroundColor: "rgb(34 197 94)" }}
          >
            Submit
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
