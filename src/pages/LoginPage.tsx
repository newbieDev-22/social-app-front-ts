import { Box, Typography } from "@mui/material";
import LoginForm from "../features/authentication/components/LoginForm";
import RegisterContainer from "../features/authentication/components/RegisterContainer";

export default function LoginPage() {
  return (
    <Box sx={{ mx: "auto", mt: "8rem" }}>
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{
          textAlign: "center",
          p: "1rem",
          mx: "auto",
          color: "rgb(71 85 105)",
        }}
      >
        Welcome to Fakebuck!
      </Typography>
      <Box
        sx={{
          mx: "auto",
          width: "50%",
          p: "1rem",
          boxShadow: 5,
          borderRadius: "10px",
        }}
      >
        <LoginForm />
        <Box sx={{ my: "1rem", borderBottom: "1px solid #dedede" }} />
        <RegisterContainer />
      </Box>
    </Box>
  );
}
