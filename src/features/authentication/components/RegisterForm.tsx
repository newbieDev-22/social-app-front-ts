import { useState } from "react";
import validateRegister from "../validator/validate-register";
import authApi from "../../../apis/auth";
import { toast } from "react-toastify";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { IValidateError } from "../../../data-type/validator";
import { IRegisterInput } from "../../../data-type/auth";

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

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      setInputError((prev) => {
        return { ...prev, ...initialInputError };
      });
      e.preventDefault();
      const error = validateRegister(input);
      if (error) {
        setInputError(error);
      } else {
        await authApi.register(input);
        onSuccess();
        toast.success("Registered successfully");
        setInputError({ ...initialInputError });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            placeholder="First name"
            name="firstName"
            value={input.firstName}
            onChange={handleChangeInput}
            error={inputError.firstName}
          />
        </div>
        <div>
          <Input
            placeholder="Last name"
            name="lastName"
            value={input.lastName}
            onChange={handleChangeInput}
            error={inputError.lastName}
          />
        </div>
        <div className="col-span-2">
          <Input
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={handleChangeInput}
            error={inputError.email}
          />
        </div>
        <div className="col-span-2">
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={input.password}
            onChange={handleChangeInput}
            error={inputError.password}
          />
        </div>
        <div className="col-span-2">
          <Input
            placeholder="Confirm password"
            type="password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={handleChangeInput}
            error={inputError.confirmPassword}
          />
        </div>
        <div className="col-span-2 text-center">
          <Button bg="green" width={40}>
            Sign up
          </Button>
        </div>
      </div>
    </form>
  );
}
