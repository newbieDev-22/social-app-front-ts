import { useContext } from "react";
import { PostContext } from "../contexts/PostContext";
import { IPostProviderValue } from "../data-type/react-type";

export default function usePost(): IPostProviderValue {
  return useContext(PostContext);
}
