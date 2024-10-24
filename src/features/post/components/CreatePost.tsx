import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import usePost from "../../../hooks/usePost";
import { toast } from "react-toastify";
import postApi from "../../../apis/post";
import validatePost from "../validator/validate-post";
import { IPostInput } from "../../../data-type/post";
import { IValidateError } from "../../../data-type/validator";
import { Avatar, Button, Card, CardActions, CardContent, TextField } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export default function CreatePost() {
  const [input, setInput] = useState<IPostInput>({ message: "" });
  const [inputError, setInputError] = useState<IValidateError>({ message: "" });
  const { authUser } = useAuth();
  const { handleAddPost } = usePost();

  if (!authUser || !handleAddPost) {
    return null;
  }

  const handleCreatePost = async () => {
    try {
      const error = validatePost(input);
      if (error) {
        return setInputError(error);
      } else {
        const postResult = await postApi.createPost(input);
        handleAddPost(postResult.data.post);
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
          multiline
          rows={3}
          error={inputError.message ? true : false}
          sx={{ mx: "1rem" }}
          helperText={inputError.message}
        ></TextField>
      </CardContent>
      <CardActions sx={{ justifyContent: "end" }}>
        <Button
          onClick={handleCreatePost}
          variant="contained"
          sx={{ backgroundColor: "rgb(34 197 94)" }}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}
