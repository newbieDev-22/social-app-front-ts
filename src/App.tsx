import { Suspense } from "react";
import Spinner from "./components/Spinner";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./contexts/AuthContext";
import Router from "./routes";

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <AuthContextProvider>
        {/* <PostContextProvider> */}
        <Router />
        <ToastContainer position="bottom-right" autoClose={2000} />
        {/* </PostContextProvider> */}
      </AuthContextProvider>
    </Suspense>
  );
}

export default App;
