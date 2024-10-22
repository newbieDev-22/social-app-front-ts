import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../../components/Spinner";

export default function RedirectIfLogged({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const authUser = auth?.authUser;
  const isAuthUserLoading = auth?.isAuthUserLoading;

  if (authUser && !isAuthUserLoading) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {isAuthUserLoading && <Spinner />}
      {children}
    </>
  );
}
