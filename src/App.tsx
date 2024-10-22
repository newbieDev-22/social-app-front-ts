import { Suspense } from "react";
import Spinner from "./components/Spinner";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./contexts/AuthContext";
import PostContextProvider from "./contexts/PostContext";
import Router from "./routes";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <AuthContextProvider>
        <PostContextProvider>
          <CssBaseline />
          <Router />
          <ToastContainer position="bottom-right" autoClose={2000} />
        </PostContextProvider>
      </AuthContextProvider>
    </Suspense>
  );
}

export default App;
