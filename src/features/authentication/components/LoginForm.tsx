import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import validateLogin from "../validator/validate-login";
import useAuth from "../../../hooks/useAuth";
import { ILoginInput } from "../../../data-type/auth";
import Input from "../../../components/Input";
import { IValidateError } from "../../../data-type/validator";

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
  const login = useAuth()?.login;
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
    <form onSubmit={handleSubmitForm}>
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
    </form>
  );
}
