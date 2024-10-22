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
          backgroundColor: "pink",
          borderRadius: "10px",
        }}
      >
        <LoginForm />
        <hr className="my-4 border" />
        <RegisterContainer />
      </Box>
    </Box>

    // <div className="mx-auto mt-32">
    //   <h2 className="text-center font-bold text-3xl p-4 text-slate-600">
    //     Welcome to Fakebuck!
    //   </h2>
    //   <div className="bg-white mx-auto p-4 rounded-md max-w-sm  shadow-lg">
    //     <LoginForm />
    //     <hr className="my-4 border" />
    //     <RegisterContainer />
    //   </div>
    // </div>
  );
}
