import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../../components/Spinner";
import { IReactChildren } from "../../../data-type/react-type";

export default function RedirectIfLogged({ children }: IReactChildren) {
  const { authUser, isAuthUserLoading } = useAuth();

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
