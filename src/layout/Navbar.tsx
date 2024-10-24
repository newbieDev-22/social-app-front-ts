import useAuth from "../hooks/useAuth";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";

export default function ButtonAppBar() {
  const auth = useAuth();
  const authUser = auth?.authUser;
  const logout = auth?.logout;

  if (!authUser) return null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "rgb(220,32,38)",
          backgroundImage:
            "linear-gradient(180deg, rgba(220,32,38,1) 0%, rgba(240,111,115,1) 100%)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textDecoration: "none" }}
          >
            <Link href="/" underline="none" sx={{ color: "white" }}>
              Hi, {authUser.firstName + " " + authUser.lastName}
            </Link>
          </Typography>
          <Button color="inherit" onClick={logout} sx={{ fontSize: "18px" }}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
