import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { IAuthProviderValue } from "../data-type/react-type";

export default function useAuth(): IAuthProviderValue {
  return useContext(AuthContext);
}
