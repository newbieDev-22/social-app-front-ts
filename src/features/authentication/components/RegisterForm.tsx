import { useState } from "react";
import validateRegister from "../validator/validate-register";
import authApi from "../../../apis/auth";
import { toast } from "react-toastify";
// import Input from "../../../components/Input";
// import Button from "../../../components/Button";
import { IValidateError } from "../../../data-type/validator";
import { IRegisterInput } from "../../../data-type/auth";
import { Box, Button, Grid2, TextField } from "@mui/material";
import { AxiosError } from "axios";

export default function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const initialInput: IRegisterInput = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const initialInputError: IValidateError = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [input, setInput] = useState<IRegisterInput>(initialInput);
  const [inputError, setInputError] = useState<IValidateError>(initialInputError);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setInputError((prev) => {
        return { ...prev, ...initialInputError };
      });
      const error = validateRegister(input);
      if (error) {
        setInputError(error);
      } else {
        await authApi.register(input);
        onSuccess();
        toast.success("Registered successfully");
        setInputError((prev) => {
          return { ...prev, ...initialInputError };
        });
      }
    } catch (err) {
      console.error(err);
      if (err instanceof AxiosError) {
        const message =
          err.response?.status === 409
            ? "Email already exists!"
            : "Internal Server Error!";
        return toast.error(message);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmitForm}>
      <Grid2 container spacing={2}>
        <Grid2 size={6}>
          <TextField
            error={inputError.firstName ? true : false}
            type="text"
            variant="outlined"
            label="First Name"
            name="firstName"
            value={input.firstName}
            onChange={handleChangeInput}
            helperText={inputError.firstName}
            sx={{ width: "100%" }}
          />
        </Grid2>
        <Grid2 size={6}>
          <TextField
            error={inputError.lastName ? true : false}
            type="text"
            variant="outlined"
            label="Last Name"
            name="lastName"
            value={input.lastName}
            onChange={handleChangeInput}
            helperText={inputError.lastName}
            sx={{ width: "100%" }}
          />
        </Grid2>
        <TextField
          error={inputError.email ? true : false}
          type="email"
          variant="outlined"
          label="Email"
          name="email"
          value={input.email}
          onChange={handleChangeInput}
          helperText={inputError.email}
          sx={{ width: "100%" }}
        />
        <TextField
          error={inputError.password ? true : false}
          type="password"
          variant="outlined"
          label="Password"
          name="password"
          value={input.password}
          onChange={handleChangeInput}
          helperText={inputError.password}
          sx={{ width: "100%" }}
        />
        <TextField
          error={inputError.confirmPassword ? true : false}
          type="password"
          variant="outlined"
          label="Confirm Password"
          name="confirmPassword"
          value={input.confirmPassword}
          onChange={handleChangeInput}
          helperText={inputError.confirmPassword}
          sx={{ width: "100%" }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ width: "100%", height: "2.5rem", backgroundColor: "rgb(34 197 94)" }}
        >
          Sign in
        </Button>
      </Grid2>
    </Box>
  );
}
