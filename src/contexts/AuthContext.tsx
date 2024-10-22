import { useState, createContext, useEffect } from "react";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "../utils/local-storage";
import authApi from "../apis/auth";
import { IGetDataAuthUser, ILoginInput, IUser } from "../data-type/auth";
import { IAuthProviderValue, IReactChildren } from "../data-type/react-type";

const AuthContext = createContext<IAuthProviderValue | null>(null);

export default function AuthContextProvider({ children }: IReactChildren) {
  const [authUser, setAuthUser] = useState<IUser | null>(null);
  const [isAuthUserLoading, setIsAuthUserLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (getAccessToken()) {
          const res: IGetDataAuthUser = await authApi.getAuthUser();
          const userData: IUser = res.data.user;
          setAuthUser(userData);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsAuthUserLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials: ILoginInput) => {
    const res = await authApi.login(credentials);
    setAccessToken(res.data.accessToken);
    //get user data
    const resGetAuthUser = await authApi.getAuthUser();
    setAuthUser(resGetAuthUser.data.user);
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
  };

  const authProviderValue: IAuthProviderValue = {
    login,
    logout,
    authUser,
    isAuthUserLoading,
  };

  return (
    <AuthContext.Provider value={authProviderValue}>{children}</AuthContext.Provider>
  );
}

export { AuthContext };
