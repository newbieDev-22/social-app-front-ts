import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import CommentItem from "./CommentItem";
import { ICommentData } from "../../../data-type/comment";
import { Box, Typography } from "@mui/material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

export default function CommentContainer({
  comments,
  postId,
}: {
  comments: ICommentData[];
  postId: number;
}) {
  const { authUser } = useAuth();
  const [isShow, setIsShow] = useState<boolean>(false);

  if (!authUser) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "evenly",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "0.5rem",
          width: "100%",
          px: "1.2rem",
          py: "1.5rem",
          border: "1px solid #dedede",
          borderRadius: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <Typography sx={{ fontSize: "1.5rem" }}>Comment</Typography>
          <ArrowCircleDownIcon
            onClick={() => setIsShow(!isShow)}
            sx={{ cursor: "pointer" }}
            fontSize="large"
          ></ArrowCircleDownIcon>
        </Box>
        {isShow &&
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              isCommenter={comment.userId === authUser.id}
              postId={postId}
              commentId={comment.id}
              firstName={comment.user.firstName}
              lastName={comment.user.lastName}
              message={comment.message}
            />
          ))}
      </Box>
    </Box>
  );
}
