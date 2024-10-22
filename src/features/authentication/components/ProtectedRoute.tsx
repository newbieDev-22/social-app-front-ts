import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../../components/Spinner";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const authUser = auth?.authUser;
  const isAuthUserLoading = auth?.isAuthUserLoading;

  if (!authUser && !isAuthUserLoading) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {isAuthUserLoading && <Spinner />}
      {children}
    </>
  );
}
