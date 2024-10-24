import { useState } from "react";
import Button from "../../../components/Button";
import useAuth from "../../../hooks/useAuth";
import usePost from "../../../hooks/usePost";
import { toast } from "react-toastify";
import postApi from "../../../apis/post";
import Avatar from "../../../components/Avatar";
import validatePost from "../validator/validate-post";
import { IPostInput } from "../../../data-type/post";
import { IValidateError } from "../../../data-type/validator";

export default function CreatePost() {
  const [input, setInput] = useState<IPostInput>({ message: "" });
  const [inputError, setInputError] = useState<IValidateError>({ message: "" });
  const { authUser } = useAuth();
  const { handleAddPost } = usePost();

  if (!authUser || !handleAddPost) {
    return null;
  }

  const handleCreatePost = async (): Promise<void> => {
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
    <div className=" shadow-md border border-gray-300 rounded-lg flex justify-evenly items-center h-40 my-4 md:w-3/5 sm: w-4/5 m-auto">
      <div className="flex justify-between items-center h-full w-full gap-4 px-4">
        <Avatar name={authUser?.firstName || ""} />
        <div className="flex flex-col w-5/6 px-4 py-8">
          <textarea
            className="p-2 focus:outline-none border border-gray-300 rounded-lg max-h-24 min-h-24"
            placeholder="What's on your mind"
            value={input.message}
            onChange={(e) => setInput({ message: e.target.value })}
          />
          {inputError.message !== "" && (
            <p className="text-red-500 text-sm py-2">{inputError.message}</p>
          )}
        </div>

        <Button onClick={handleCreatePost} bg="green">
          Submit
        </Button>
      </div>
    </div>
  );
}
