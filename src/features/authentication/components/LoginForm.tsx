import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import validateLogin from "../validator/validate-login";
import useAuth from "../../../hooks/useAuth";
import { ILoginInput } from "../../../data-type/auth";
import { IValidateError } from "../../../data-type/validator";
import { Box, Button, Grid2, TextField } from "@mui/material";

const initialInput: ILoginInput = {
  email: "",
  password: "",
};

const initialInputError: IValidateError = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [input, setInput] = useState<ILoginInput>(initialInput);
  const [inputError, setInputError] = useState<IValidateError>(initialInputError);
  const { login } = useAuth();
  const navigate = useNavigate();

  if (!login) {
    return null;
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const error = validateLogin(input);
      if (error) {
        return setInputError(error);
      } else {
        await login(input);
        navigate("/");
        toast.success("Login successfully!");
        setInputError({ ...initialInputError });
      }
    } catch (err) {
      console.error(err);
      if (err instanceof AxiosError) {
        const message =
          err.response?.status === 400
            ? "Invalid email or password!"
            : "Internal Server Error!";
        return toast.error(message);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmitForm}>
      <Grid2 container spacing={2} direction="column">
        <TextField
          error={inputError.email === "" ? false : true}
          type="text"
          variant="outlined"
          label="Email"
          value={input.email}
          onChange={handleChangeInput}
          helperText={inputError.email}
        />
        <TextField
          error={inputError.email === "" ? false : true}
          type="password"
          variant="outlined"
          label="Password"
          value={input.password}
          onChange={handleChangeInput}
          helperText={inputError.password}
        />
        <Button variant="contained" type="submit" sx={{ width: "100%" }}>
          Log in
        </Button>
      </Grid2>

      {/* <div className="grid gap-4">
        <div>
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={input.password}
            error={inputError.password}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Button width="full">Log in</Button>
        </div>
      </div> */}
    </Box>
  );
}

{
  /* <form onSubmit={handleSubmitForm}>
<div className="grid gap-4">
  <div>
    <Input
      placeholder="Email"
      name="email"
      value={input.email}
      error={inputError.email}
      onChange={handleChangeInput}
    />
  </div>
  <div>
    <Input
      placeholder="Password"
      type="password"
      name="password"
      value={input.password}
      error={inputError.password}
      onChange={handleChangeInput}
    />
  </div>
  <div>
    <Button width="full">Log in</Button>
  </div>
</div>
</form> */
}
