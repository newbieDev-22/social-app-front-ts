import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const { authUser, logout } = useAuth();
  return (
    <header className="flex justify-between items-center bg-gradient-to-b from-red-500 to-rose-400 shadow px-4 h-16">
      <div className="justify-self-start cursor-pointer">
        <Link to="/">
          <div className="text-xl font-bold text-white">{`Hello, ${authUser?.firstName} ${authUser?.lastName}`}</div>
        </Link>
      </div>
      <button onClick={logout}>
        <h3 className="text-lg font-bold text-white">Log out</h3>
      </button>
    </header>
  );
}
